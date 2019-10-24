---
layout:     post
title:      "推荐学习基于 PHP 的 Web 框架"
subtitle:   " \"Recommended to learn PHP-based web framework\""
date:       2019-10-02 9:30:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Web框架    
---
 
## 关于CodeIgniter

优点：Code Igniter推崇“简单就是美”这一原则。没有花哨的设计模式、没有华丽的对象结构，一切都是那么简单。几行代码就能开始运行，再加几行代码就可以进行输出。可谓是“大道至简”的典范。  

一个有趣的插件CI插件
https://segmentfault.com/a/1190000018374399

## 关于Yii2 
Yii2 的优点在于容易理解，由于 Symfony、Lavavel 的代码用了很多中间件、事件驱动的概念，你会发现从入口 index.php 进去很难知道最终如何调用到了某个 Controller 的 Action，因为找到 Action 并且调用是 Web 框架最核心的功能，这一点如果很难看懂的话，就很难真正掌握框架本身，而 Yii2 的优点正体现于此。

理解 Yii2 的执行过程很简单。你从 index.php 进入后，首先会看到读取配置文件，通过配置文件初始化 Application 并调用 run 方法。

在 run 方法中，可以清晰地看到 Request 的获取和处理过程。处理过程中，先解析 Request 获取 route，再根据 route 找到 Controller 的 Action 并且执行的过程也非常清晰。

Yii2 的另一个特点是大量使用了类继承。首先其定义了 \yii\base\Object 类，定义构造器和魔术方法等。基于 \yii\base\Object 扩展成 \yii\base\Component 类，加入了事件和用来扩展类能力的 Behavior 特性。基于 \yii\base\Component 扩展成 \yii\base\Model 类，加入了属性验证功能，用来接收和验证外部输入。

基于 \yii\base\Model 扩展成 \yii\db\ActiveRecord，用来加入数据持久化和关联数据获取的功能。这样的层层递进的基于集成的扩展，可以把每一层的功能定义清楚，方便使用者理解，让用户有选择地扩展自己的类，有点类似典型的 java 应用。

但是，这样做也有明显的缺点。因为基于 Yii2 的开发或多或少需要继承 \yii\base\Object 类，所以这些开发的产出，包括扩展、模块很难兼容其它框架。

因为这个原因，导致 Yii2 社区中创造的东西的影响，无法传播到其它框架的使用者，导致其流行度没有 Symfony，以及基于 Symfony 的 Laravel 高。如果大家感兴趣，我后面可以介绍如果借用 Symfony 和 Laravel 在 Yii2 中写出更好的代码。

Yii2 被称为 A web framework out of the box，一站式的 Web 框架，也是有其道理的。一方面其框架本身包含了构建网站所需的各种功能，不需要到处选合适的组件来创造自己的应用。

另一方面，一旦选用了这个框架，就依赖了这个整个框架，比较难只用框架中的一小部分，或将已有工作其迁移到其它框架。

Yii2 和 Symfony、Laravel 的意识形态比较我们这辈子会遇到不少人，听过不少观点，有过不少讨论。渐渐地，我发现，人和人的区别，真的在于价值观、世界观、人生观。一个人之所以是现在这样，是因为先有了一些经历，基于这些经历总结了一些规律，基于规律提出了一些假设，之后就会不断去验证和印证提出的假设。

这些假设，虽然并不是真理，但决定了大多数人的行为方式。同一个集体中的人相互影响，一种假设就成为了意识形态。为什么这一段这么开头，下面的比较结束后你就能有所理解。虽然还没有介绍 Symfony 和 Laravel，我想在这里就先拿几个框架和社会制度做个类比，好帮助大家产生基本的理解。

Yii2 社区就像一个集权主义的社会，大事情老大哥都帮你包办好了，社区的工作紧紧围绕在以老大哥为中心的周围，老大哥会负责地做好版本迭代的兼容工作，社区也做好各自需要的扩展，但你专门为老大哥做的扩展，其它社区是很难容易地使用的，影响力很难扩展开来。当然事情也不是一成不变，核心团队和社区也意识到了这个问题，Yii3 正在尝试把框架分成单独的部分，遵循 PSR 等一定的标准，把框架朝着可以独立使用的组件式的框架转变。

而 Laravel 和 Symfony 就像分权主义社会，你可以把我看做一个框架，但是这个框架的概念其实是若干个可以单独使用的小部件一起组成起来才产生的，其中一个组件把其它组件组织了起来，成为了一个框架。你虽然可以不使用整个框架，但是可以用框架的一部分部件。小部件功能可能不全，里面的小部件你也有可能不喜欢，但可以允许你找自己喜欢的小部件替代。至于你自己找的那个好不好用，那你自己看着办。

至于我版本迭代的兼容，我也不保证。那为啥这几个框架会有这样的区别呢？因为这几个框架是由出自不同背景的人做出来的，不同背景中的人的意识形态有所差别。Yii 的创建者 Qiang Xue 是华人，目前 Yii 有一个全职开发人员，Alexander Makarov，是俄罗斯人。我们知道，华人和俄罗斯人社区在全球所有活跃开发者社区中是受集体主义思想最多的，也不难理解 Yii2 也体现了集体主义意识形态。Laravel 的创建者 Taylor Otwell 是美国阿肯色州人，目前的主要维护人 Dries Vints 是比利时人。

相对来说，这是最讲自由和分权的国家，同样也不难理解，Laravel 处处体现分权主义的意识形态。插播广告：开源项目的持续发展纯靠社区比较困难，特别是考虑到 Yii3 进度不如预期，所以在 OpenCollective 发起了筹款，支持有人全职保障 Yii 的发展。我也希望能在这里呼吁我们这样的 Yii 使用者受益人，能捐一些款，支持 Yii 社区越来越好。


## 关于THinkPHP
在国内是最受欢迎的国产php开源框架

## 关于TLaravel
这是一个年轻的框架，但是拥有优雅的语法，可简单快速开发你的应用。它拥有大多数常见的功能，如：路由，身份验证，会话，队列和缓存。

## 关于CakePHP
轻量级、简单、反应迅速并且编写简单。它的模板简单易用。CakePHP基于“CRUD”，这是在数据库交互最方便以及最流行的功能方式。CakePHP还有用像：安全验证、邮件、会话、cookie和请求处理这些功能。CakePHP最大的缺点就是没有支持面向对象。

## Symfony2
Symfony一直是PHP开发者稳定使用的框架之一。它非常灵活并且功能强大。Symfony有很多可以复用的部分比如：安全、模板、转义、验证、表单配置等。


- 基于  TP 的 
    - [ThinkAdmin](https://github.com/zoujingli/ThinkAdmin)
    - [🚀thinkphp5.1 + layui ](https://github.com/nick-bai/snake)
    - [ThinkPHP5+AdminLTE](https://github.com/yupoxiong/BearAdmin)
    - [originThink](https://github.com/wuxiumu/originThink)
- 基于 Yii2 的 
    - [CraftCMSCraft ](https://craftcms.com/)
    - [fecshop](https://github.com/fecshop/yii2_fecshop)
    - [yii2cms](https://github.com/changchang700/yii2cms)
    - [sns 开放社区](https://github.com/shi-yang/iisns)
- 基于  Symfony 的 
    - [Drupal](https://www.drupal.org)
    - [phpbb](https://github.com/phpbb/phpbb)
    - [crm-application](https://github.com/oroinc/crm-application)
    - [Vespolina](https://github.com/vespolina/vespolina-sandbox)
- 基于 Laravel 的 
    - [FlarumFlarum - Forums Made](https://flarum.org)
    - [octobercms](https://github.com/octobercms/october)
    - [laravel-shop](https://github.com/summerblue/laravel-shop)
    - [Laravel-Administrator](https://github.com/FrozenNode/Laravel-Administrator)
- 基于  CI 的 
    - [luthier-ci](https://github.com/ingeniasoftware/luthier-ci)   
    - [基于CI的markdown博客 ](https://github.com/jockchou/gitblog)
    - [CI-AdminLTE](https://github.com/domProjects/CI-AdminLTE)
    - [vue-questionnaire](https://github.com/52admln/vue-questionnaire)
 
  