---
layout:     post
title:      "现代PHP框架都具备什么"
subtitle:   " \"What does the modern PHP framework have?\""
date:       2019-10-04 9:30:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - php
    - Web框架
---

>本文将从零开始搭建一个现代化的PHP框架，该框架会拥有现代框架的一切特征，如单入口，路由，依赖注入，composer类自动加载机制等等，如同时下最流行的Laravel框架一样。


项目地址 ： https://github.com/wuxiumu/php-framework

## 一、开发环境搭建
### 1、开发环境搭建
- window10
- phpstudy ：https://www.xp.cn/
    - apache2.4
    - php7.3
    - msyql5.7
    - redis3.0
### 2、开发工具
- visualstudio ： https://code.visualstudio.com/
- Navicat Premium 
    ```
    链接：https://pan.baidu.com/s/1a1o4vrA_y35azMqBkAQK6g 
    提取码：kaz0     
    ```

## 二、第一版-实现最基本的功能
现在，我们先创建一个简单的框架，实现MySQLPDO的连接，查询，创建引导文件，创建项目的配置文件（包括连接数据库的用户名和密码等）

### 目录
 
- [core/]
    - [database/]
        - Connection.php
        - QueryBuilder.php
    - bootstrap.php
    - functions.php
- [models/]
    - Task.php
- [views/]
    - index.view.php
- config.php
- index.php
 
### 文件
Connection.php
```
<?php
class Connection
{
    public static function make($config)
    {
        try {
            // return new PDO('mysql:host=127.0.0.1;dbname=php-framework', 'root', '123456');
            return new PDO(
                $config['connection'] .';dbname=' . $config['name'],
                $config['username'],
                $config['password'],
                $config['options']);
        } catch (PDOException $e)
        {
            die($e->getMessage());
        }
    }
}
```
QueryBuilder.php
```
<?php
class QueryBuilder
{
    protected $pdo;
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function selectAll($table, $className)
    {
        $statement = $this->pdo->prepare("select * from {$table}");
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_CLASS, $className);
    }
}
```
bootstrap.php
```
<?php
require 'database/Connection.php';
require 'database/QueryBuilder.php';
require 'functions.php';
// 获取配置
$config = require 'config.php';
return  new QueryBuilder(
    Connection::make($config['database'])
);
```
functions.php
```
<?php
function dump($data)
{
    echo '<pre>';
    var_export($data);
    echo '</pre>';
}
```
Task.php
```
<?php
class Task
{
    protected $description;
    protected $completed = false;
    public function __construct($desc)
    {
        $this->description = $desc;
    }
    public  function isComplete()
    {
        return $this->completed;
    }
    public function complete()
    {
        $this->completed = true;
    }
}
```
index.view.php
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>将PHP代码嵌入到HTML中</title>
    <style>
        header {
            background-color: #f5f8fc;
            padding: 2em;
            text-align: center;
        }
    </style>
</head>
<body>
<header>
    <ul>
        <?php foreach ($names as $name) : ?>
            <li>Hello, <?= $name ?></li>
        <?php endforeach; ?>
    </ul>
</header>
</body>
</html>
```
config.php
```
<?php
return [
    'database' => [
        'name'          => 'php-framework',
        'username'      => 'root',
        'password'      => '123456',
        'connection'    => 'mysql:host=127.0.0.1',
        'options'       => [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION] // 这个一会再说它的作用
    ]
];
```
index.php
```
<?php
require './models/Task.php';
$query = require './core/bootstrap.php';
$tasks = $query->selectAll('tasks', 'Task');
dump($tasks);
```
## 三、第二版本-单一入口和mvc架构
我们对目录进行重构，按照MVC功能划分：
```
├── index.php
├── config.php
├── controllers
├── core
│   ├── bootstrap.php
│   └── database
│       ├── Connection.php
│       └── QueryBuilder.php
├── models
│   └── Task.php
└── views
```

现在我们再来添加两张页面about.php和contact.php， 按照之前我们说的逻辑层和视图层分离的原则，我们还需要建立`about.view.php`和`contact.view.php`， 并在`about.php`和`contact.php`中引入它们的视图文件。然后我们可以通过`http://framework.app/about.php` 或 `http://framework.app/contact.php` 之类的 uri 来访问这些页面, 像这种方式我们称为多入口方式，这种方式对于小型项目还能管理，项目过大了，管理起来就会比较麻烦了。

现在的框架基本都是采用单一入口的模式，什么是单一入口，其实就是整个站点只有 `index.php` 这一个入口，我们访问的任何 uri 都是先经过 `index.php` 页面，然后在`index.php`中根据输入的 uri 找到对应的文件或者代码运行，然后返回数据。

### 单一入口思路：
1. 访问http://framework.app/about.php这条路径时，先进入到 index.php 中
2. 然后在 index.php 中会通过一些方法去找到与这条路由对应需要执行的文件，一般我们会把这些文件放到控制器中。
3. 执行控制器文件中的逻辑代码，最终将数据通过对应的视图层显示出来。

事实上，我们访问 http://framework.app/about.php 这个路由时，它真正的路由是 http://framework.app/index.ph...然后通过Apache或者是Nginx做路由跳转，就可以实现成类式 http://framework.app/about.php 这样的路由了。

### 编写路由类 Router
Router.php
```
<?php
class Router
{
    protected $routes = [
        'GET'   => [],
        'POST'  => []
    ];
    public function get($uri, $controller)
    {
        $this->routes['GET'][$uri] = $controller;
    }
    // 当定义POST路由时候，把对应的$uri和$controller以健值对的形式保存在$this->routes['POST']数组中
    public function post($uri, $controller)
    {
        $this->routes['POST'][$uri] = $controller;
    }
    /**
     * 赋值路由关联数组
     * @param $routes
     */
    public function define($routes)
    {
        $this->routes = $routes;
    }
    /**
     * 分配控制器路径
     * 通过用户输入的 uri 返回对应的控制器类的路径
     * @param $uri
     * 这里的 $requestType 是请求方式，GET 或者是 POST
     * 通过请求方式和 $uri 查询对应请求方式的数组中是否定义了路由
     * 如果定义了，则返回对应的值，没有定义则抛出异常。
     * @return mixed
     * @throws \Exception
     */
    public function direct($uri, $requestType)
    {
        if(array_key_exists($uri, $this->routes[$requestType]))
        {
            return $this->routes[$requestType][$uri];
        }
       // 不存在，抛出异常，以后关于异常的可以自己定义一些，比如404异常，可以使用NotFoundException
        throw new Exception('No route defined for this URI');
    }
    public static function load($file)
    {
        $router = new static;
        // 调用 $router->define([]);
        require ROOT . DS . $file;
        // 注意这里，静态方法中没有 $this 变量，不能 return $this;
        return $router;
    }
}
```
routes.php 路由文件
```
<?php
$router->get('', 'controllers/index.php');
$router->get('about', 'controllers/about.php');
$router->get('contact', 'controllers/contact.php');
$router->post('tasks', 'controllers/add-task.php');
```
index.php 入口文件
```
<?php
// 定义分隔符常量
define('DS', DIRECTORY_SEPARATOR);
// 定义根目录常量  // D:\xampps\htdocs\web\Frame
define('ROOT', dirname(__FILE__));
$query = require ROOT . DS . 'core/bootstrap.php';
// 创建路由对象
require Router::load('routes.php')
    ->direct(Request::uri(), Request::method());
```
我们来看一下入口文件index.php,先加载路由文件routes.php，该文件是不是和我们Laravel的一样呢，根据请求类型进行控制器分配，先把所有请求的路径根据类型划分到不同的请求类型属性（GET，POST）中，然后，再根据请求的路径来加载对应的控制器。

#### 加载过程详解：

`http://framework.app/about`通过GET请求访问页面：

>1: Router::load('routes.php')，加载所有路由

routes.php
```
$router->get('', 'controllers/index.php');
$router->get('about', 'controllers/about.php');
$router->get('contact', 'controllers/contact.php');
$router->post('tasks', 'controllers/add-task.php');
````
路由类Router.php
```
public static function load($file)
{
    $router = new static;

    // 调用 $router->define([]);
    require ROOT . DS . $file;

    // 注意这里，静态方法中没有 $this 变量，不能 return $this;
    return $router;
}
```    
此方法等价于：
```
public static function load($file)
{
    $router = new static;

    // 调用 $router->define([]);
    // require ROOT . DS . $file;
    
    // 这里调用get，post方法进行$routes属性赋值
    $router->get('', 'controllers/index.php');
    $router->get('about', 'controllers/about.php');
    $router->get('contact', 'controllers/contact.php');
    $router->post('tasks', 'controllers/add-task.php');

    // 注意这里，静态方法中没有 $this 变量，不能 return $this;
    return $router;
}
```
加载路由文件routes.php之后Router.php的$routes属性结果为：
```
protected $routes = [
        'GET'   => [
          ''        => 'controllers/index.php',
          'about'   => 'controllers/about.php',
          'contact' => 'controllers/contact.php',
        ],
        'POST'  => ['tasks' => 'controllers/add-task.php']
    ];
```    
然后再根据 `direct($uri, $requestType)`方法获取对应路径的控制器路径，然后 `require controllers/about.php`.

## 四、使用composer进行类自动加载
我们现在的项目中使用了一堆的require语句, 这样的方式对项目管理并不是很好，现在有人为 php 开发了一个叫做 composer 的依赖包管理工具，非常好用，我们将其集成进来，composer 官方地址 https://getcomposer.org/ 按照提示进行全局安装即可。

我们先将 bootstrap.php 中的下面4句类引入代码注销
```
// require 'core/Router.php';
// require 'core/Request.php';
// require 'core/database/Connection.php';
// require 'core/database/QueryBuilder.php';
```
然后在根目录下建立 coomposer.json 的配置文件,输入以下内容:
```
{
    "autoload": {
        "classmap": [
            "./"
        ]
    }
}
```
上面的意思是将根目录下的所有的类文件都加载进来， 在命令行执行 `composer install `后，在根目录会生成出一个vendor的文件夹，我们以后通过 composer 安装的任何第三方代码都会被生成在这里。

下面在`bootstrap.php`添加`require 'vendor/autoload.php';` 即可。

我们可以在`vendor/composer/autoload_classmap.php`文件中查看生成的文件对应关系。

```
<?php

// autoload_classmap.php @generated by Composer

$vendorDir = dirname(dirname(__FILE__));
$baseDir = dirname($vendorDir);

return array(
    'Connection' => $baseDir . '/core/database/Connection.php',
    'QueryBuilder' => $baseDir . '/core/database/QueryBuilder.php',
    'Request' => $baseDir . '/core/Request.php',
    'Router' => $baseDir . '/core/Router.php',
    'Task' => $baseDir . '/models/Task.php',
);
```

这里的核心思想是使用了一个 `spl_autoload_register()` 函数，进行类按需加载，懒加载，即创建对象，然后再加载对象所需要的类文件，而不是之前那种将所有的类文件全部引入，具体请看 详解spl_autoload_register()函数 https://segmentfault.com/a/1190000009742195

如果新添加了类文件，我们需要运行下面命令进行类自动重新加载：
```
composer dump-autoload
```
注意：以上方法只能将类文件自动加载，其他文件不会进行引入的，如 `function.php`不会被引入，如果需要，则仍需要使用手动 require 引入。

## 五、实现依赖注入容器 DI Container
什么是依赖注入容器 `DI Container`? 一个听上去非常高大上的东西，先不要去纠结字面的意思，你可以这么想，把我们的 APP 想象成一个很大的盒子，把我们所写的一些功能，比如说配置，数据库操作等都扔到这个盒子里，在扔进去的时候你要给它们贴一个标签，以后可以通过这个标签把它们取出来用。大体就是这个意思。

我们来看`bootstrap.php `中的代码， 其实 `$app` 这个数组就可以看成是一个容器，我们把配置文件扔到数组中，贴上`config`的标签（也就是健），把`QueryBuilder`也扔进去了，贴上标签`database`。之后我们可以通过`$app['config']`这样拿出我们需要的值。

我们为何不把`$app`数组做成一个对象呢！ 这样我们以后可以为其添加很多的属性和方法，会方便很多，需要对象就必须要有类，我们马上就可以在`core`文件夹内建立一个 `App.php` 的文件，当中包含`App`类。

下面看看我们需要哪些方法，先看 `$app['config'] = require 'config.php';` 这一句是把`config.php`放进到`App`的容器中，现在常用的说法是 注册`config `到`App`, 或者是绑定`config` 到`App`, 那我们需要的方法可能是这样的。
```
$app->bind('config', require 'config.php');
// 或者
$app->register('config', require 'config.php');
// 或者
App::bind(config', require 'config.php');
// 或者
App::register('config', require 'config.php');
```
在我们写类的时候，可能不知道怎么动手，可以先尝试着调用假定存在的方法，再回头去完善类，之前我们也都是这么做的，这样相对会容易些，上面的几种方法个人感觉`App::bind(config', require 'config.php');`更好些，然后要取出`config`可以使用 `App::get('config')` 方法，下面去实现这两个方法。在`core/App.php` 中
```
class App
{
   protected static $registries = [];
   public static function bind($key, $value)
   {
       static::$registries[$key] = $value;
   }
   public static function get($key)
   {
       if (! array_key_exists($key, static::$registries)) {
           throw new Exception("No {$key} is bound in the container.");
       }
       return static::$registries[$key];
   }
}
```
bootstrap.php 中目前代码如下：
```
require 'vendor/autoload.php';
App::bind('config', require 'config.php');
App::bind('database', new QueryBuilder(
    Connection::make(App::get('config')['database'])
));
```
将所有使用到`$app['config']`和$`app['database']`的地方全部用`App::get('config')`和`App::get('database')`替换过来，毫无疑问的会提示“找不到APP的错误”，原因是在我们的`autoload_classmap.php`文件中并没有导入`App.php`文件，我们需要在命令行执行` composer dump-autoload `来重新生成`autoload_classmap.php`文件。

## 六、重构控制器
1. 新建控制器类

    现在我们的控制器中的代码还都是一些面条式的代码, 并没有使用面向对象的方式去开发，我们来重构下，我们需要编写控制器类，然后让路由指向到对应的控制器的方法，这样在我们以后的工作流中就会方便很多。

    我们在controllers文件夹下建立 PagesController.php 的文件, 编写以下的代码，将之前控制器中的文件中的代码都以方法的形式写在这个类中
    ```
    class PagesController
    {
        public function home()
        {
            $tasks = App::get('database')->selectAll('tasks', 'Task');
            require 'views/index.view.php';
        }
        public function about()
        {
            require 'views/about.view.php';
        }
        public function contact()
        {
            require 'views/contact.view.php';
        }
    }
    ```
    现在可以将controllers文件夹下的index.php, about.php, contact.php都删除了，将路由文件中的代码改成下面这样：

2. 更改路由文件

    ```
    $router->get('', 'PagesController@home');
    $router->get('about', 'PagesController@about');
    $router->get('contact', 'PagesController@contact');
    ```
3. 初次修改 direct() 方法

    现在我的意图是这样的，以about路由举例，当我们访问about, 就会调用PagesController类的about方法, 在about方法中直接运行逻辑代码。所以我们需要修改Router.php中的direct()方法。

    目前direct()是根据相对路径返回对应控制器类的路径，然后在入口页面将其引入进来执行，现在我们只需要通过实例化控制器类，然后调用对应的方法即可。 那direct()的核心代码应该是类式这样的：`(new PagesController)->about()`; 我们暂且把这个功能命名为 `callAction() `方法，先将定已经有了这个方法, 我们先去 `direct()`方法中调用它， 如下：
    ```
    public function direct($uri, $requestType)
    {
        if (array_key_exists($uri, $this->routes[$requestType])) {
            return $this->callAction('这里应该有参数');
        }
        throw new Exception('No route defined for this URI');
    }
    ```
4. 实现私有方法 `callAction()`

    下面考虑下 Router 类中的 callAction() 方法该怎么实现，刚才说了这个方法的核心是 `(new Controller)->action();` 不多考虑，我们给这个方法两个参数，$controller 和 $action, 代码如下：
    ```
    private function callAction($controller, $action)
    {
        $controllerObj = new $controller;
        if (! method_exists($controllerObj, $action)) {
            throw new Exception(
                "{$controller} does not respond to the {$action} action."
            );
        }
        return $controllerObj->$action();
    }
    ```

5. `... `运算符和 explode() 函数用法

    上面的 `method_exists($obj, $action) `方法是判断一个对象中是否某个方法，那在 `direct() `中调用`callAction()`的参数我们该如何获取呢？ 我们现在的 `$this->routes$requestType`的值是类式于 `PagesController@about` 这样的字符串，我们只需将该值拆分为 `['PagesController', 'about']` 这样的数组，然后使用 php5.6 之后出现的 ...运算符，将其作为参数传递，关于拆分字符串为数组，php 也给我们提供了一个这样的函数，叫做 `explode()`, 我们先看下这个函数的用法，
    打开终端，输入 `php --interactive `进入命令行交互模式

    好了，现在就可以修改下direct() 这个方法了，如下：
    ```
    public function direct($uri, $requestType)
    {
        if (array_key_exists($uri, $this->routes[$requestType])) {
            return $this->callAction(
                ...explode('@', $this->routes[$requestType][$uri])
            );
        }
        throw new Exception('No route defined for this URI');
    }
    ```

    关于`...explode('@', $this->routes$requestType)` 这里的 ... 操作符， 它会把一维数组中的第一个元素作为参数1， 第二个元素作为参数2，以此类推，这是 php5.6 后新出的语法，可以自己查阅文档。

6. 修改入口页面的代码

    ok, 现在将入口页面的这句代码`require Router::load('routes.php')->direct(Request::uri(), Request::method());`的 `require` 去掉吧。再测试之前不要忘记了在命令行运行 `composer dump-autoload` 来重新加载文件。

## 七、全局函数 view()
下面更改下 `PagesController` 的 `require 'views/about.view.php'; `这句代码，我们改成 `return view('about'); `这样，可读性会好很多。同时在 `psr标准中` 也有这样的规定，在声明一个类的文件中是不能存在 `require` 代码的。

我们在`core`下创建一个`functions.php`的文件，把所有的全局函数都放在这里，准确来说帮助函数的文件不应该放在这里，它并不属于核心文件，但是为了我们这里写的帮助函数基本都是给我们的框架使用的，不设计业务开发，所以暂时还是先放这里。`view()`函数很简单，如下：
```
function view($name)
{
    $name = trim($name, '/');
    
    return require "views/{$name}.view.php";
}
```
在 `PagesController` 的 `home` 方法当中有$tasks对象集合， 我们怎么传递它到 `view()` 函数中呢？ 我们需要给 `view()` 设置第二个数组形式的参数，调用 `view()` 的时候，将数据以数组的形式传递给 `view()` 即可，如下：
```
return view('index', ['tasks' => $tasks]);
```
现在在 `view()` 函数中会出现问题了，我们传入的数据是一个数组，而在`index.view.php`中使用的是 `$tasks` 这样的变量，怎么转化？使用PHP提供的 `extract()` 函数可以做到这点，它可以将数组中的元素以变量的形式导入到当前的符号表，这句话不好懂，我们来演示下就明白了，还是进入 php 的命令行交互模式， 如下：

使用了`extract()`函数就会自动帮我们定义好与数组 `key` 同名的变量，并将 `key` 对应的 `value` 赋值给了该变量，好了，下面我们把`view()`方法完善下，如下：
```
function view($name, $data =[])
{
    extract($data);
    return require "views/{$name}.view.php";
}
```
## 八、通过 composer 加载不是类的文件
下面自己把控制器中与view()相关的代码都更改过来，然后运行composer dump-autoload,它还是会提示找不到view()函数，原因在于我们的composer.json中的配置,我们需要将配置改成下面这样：
```
{
    "autoload": {
        "classmap": [
            "./"
        ],
        "files": [
            "core/functions.php"
        ]
    }
}
```
上面的classmap只会加载类文件，要加载普通的文件需要使用 "files": []，好了，最后别忘记了composer dump-autoload.

## 九、控制器和路由的一些命名规范及命名空间
控制器和路由我们可以按照Laravel的风格：
```
// tasks 的列表页
$router->get('tasks', 'TasksController@index');

// TasksController.php
class TasksController
{
    public function index()
    {
        $tasks = App::get('database')->selectAll('tasks', 'Task');
        return view('index', compact('tasks'));
    }
    public function store()
    {
        App::get('database')->create('tasks', [
            'description' => $_POST['description'],
            'completed'   => 0
        ]);
        return redirect('/');
    }
}
```

从 PHP5.3 开始就支持命名空间了，关于命名空间的介绍看官方文档： https://www.php.net/manual/zh/language.namespaces.php

其实也很简单，你把命名空间想象层文件夹就行