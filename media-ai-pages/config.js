// 环境配置
// OSS_BASE_URL 有值 → 资源走 OSS
// 密码验证由实际访问域名决定

(function() {
  // ====== 配置区域 ======
  const OSS_BASE_URL = 'https://vbank8-test.oss-cn-beijing.aliyuncs.com/wuxiumu.github.io/media-ai-pages';
  // ====== 配置结束 ======

  // 判断是否为本地访问（用于密码验证）
  var hostname = window.location.hostname;
  var isLocalAccess = hostname === '127.0.0.1' ||
                      hostname === 'localhost' ||
                      hostname.includes('github.io');

  // 判断是否为主页面（不需要密码验证）
  var isMainPage = window.location.pathname.endsWith('/index.html') ||
                   window.location.pathname.endsWith('/media-ai-pages/') ||
                   window.location.pathname === '/media-ai-pages';

  // 没有配置 OSS，纯本地模式
  if (!OSS_BASE_URL) {
    window.ENV_CONFIG = { isOSS: false, isLocalAccess: true, baseUrl: '.' };
    return;
  }

  // 已处理的元素集合
  var processed = new WeakSet();

  // 改写单个元素
  function rewriteElement(el) {
    if (processed.has(el)) return;
    processed.add(el);

    // 改写 link[rel=stylesheet]
    if (el.tagName === 'LINK' && el.rel === 'stylesheet') {
      var href = el.getAttribute('href');
      if (href && !href.startsWith('http')) {
        el.href = OSS_BASE_URL + '/' + href.replace(/^\.?\//, '');
      }
    }

    // 改写 iframe[src]
    if (el.tagName === 'IFRAME') {
      var src = el.getAttribute('src');
      if (src && !src.startsWith('http')) {
        el.src = OSS_BASE_URL + '/' + src.replace(/^\.?\//, '');
      }
    }

    // 改写 script[src]（排除 config.js）
    if (el.tagName === 'SCRIPT' && el.src) {
      var scriptSrc = el.getAttribute('src');
      if (scriptSrc && !scriptSrc.startsWith('http') && !scriptSrc.includes('config.js')) {
        el.src = OSS_BASE_URL + '/' + scriptSrc.replace(/^\.?\//, '');
      }
    }
  }

  // 扫描并改写所有元素
  function scanAll() {
    document.querySelectorAll('link[rel="stylesheet"], iframe, script[src]').forEach(rewriteElement);
  }

  // 动态加载 JS
  function loadJS(name) {
    var script = document.createElement('script');
    script.src = OSS_BASE_URL + '/' + name;
    document.head.appendChild(script);
  }

  // 暴露全局配置
  window.ENV_CONFIG = {
    isOSS: true,              // 资源从 OSS 加载
    isLocalAccess: isLocalAccess,  // 是否为本地访问（用于密码验证）
    baseUrl: OSS_BASE_URL,
    getUrl: function(path) {
      return OSS_BASE_URL + '/' + path.replace(/^\.?\//, '');
    }
  };

  // 立即扫描一次
  scanAll();

  // 使用 MutationObserver 监听后续添加的元素
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) {
          rewriteElement(node);
          node.querySelectorAll('link[rel="stylesheet"], iframe, script[src]').forEach(rewriteElement);
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // 动态加载 clarity.js
  loadJS('clarity.js');

  // 只有子页面才加载 auth.js（主页面不需要密码验证）
  if (!isMainPage) {
    loadJS('auth.js');
  }

  // 停止观察（避免性能问题）
  setTimeout(function() {
    observer.disconnect();
  }, 3000);
})();
