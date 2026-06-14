// 环境配置
// OSS_BASE_URL 有值 → 走 OSS
// OSS_BASE_URL 为空 → 走本地

(function() {
  // ====== 配置区域 ======
  const OSS_BASE_URL = 'https://vbank8-test.oss-cn-beijing.aliyuncs.com/wuxiumu.github.io/media-ai-pages';
  // ====== 配置结束 ======

  // 本地环境不做任何处理
  if (!OSS_BASE_URL) {
    window.ENV_CONFIG = { isOSS: false, baseUrl: '.' };
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
    isOSS: true,
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

  // 动态加载 clarity.js 和 auth.js
  loadJS('clarity.js');
  loadJS('auth.js');

  // 停止观察（避免性能问题）
  setTimeout(function() {
    observer.disconnect();
  }, 3000);
})();
