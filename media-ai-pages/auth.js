// 密码验证模块
(function() {
  // 本地访问不需要密码验证（资源可以从 OSS 加载，但不需要密码）
  if (window.ENV_CONFIG && window.ENV_CONFIG.isLocalAccess) {
    return;  // 本地访问，跳过验证
  }

  // 被本地页面的 iframe 嵌入时，也不需要验证
  try {
    if (window.parent !== window) {
      var parentHost = window.parent.location.hostname;
      if (parentHost === '127.0.0.1' || parentHost === 'localhost' || parentHost.includes('github.io')) {
        return;  // 被本地页面嵌入，跳过验证
      }
    }
  } catch (e) {
    // 跨域无法访问 parent.location，说明不是被本地嵌入
  }

  // 默认密码
  const DEFAULT_PASSWORD = '123456';
  // 存储 key
  const STORAGE_KEY = 'media_ai_auth';

  // 检查是否已验证
  function isAuthenticated() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  }

  // 设置验证状态
  function setAuthenticated() {
    localStorage.setItem(STORAGE_KEY, 'true');
  }

  // 清除验证状态（用于退出登录）
  window.clearAuth = function() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  };

  // 显示密码输入框
  function showPasswordForm() {
    // 创建遮罩层（覆盖整个页面）
    const overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.innerHTML = `
      <div class="auth-container">
        <div class="auth-icon">🔒</div>
        <h2>请输入访问密码</h2>
        <p>该页面需要密码才能访问</p>
        <div class="auth-form">
          <input type="password" id="auth-password" placeholder="请输入密码" autofocus>
          <button id="auth-submit">确认</button>
        </div>
        <p class="auth-error" id="auth-error"></p>
      </div>
    `;

    // 添加样式
    const style = document.createElement('style');
    style.id = 'auth-style';
    style.textContent = `
      #auth-overlay {
        position: fixed;
        inset: 0;
        background: linear-gradient(135deg, #0a3660 0%, #1a6bb5 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
      }
      .auth-container {
        background: white;
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        max-width: 360px;
        width: 90%;
        animation: authFadeIn 0.3s ease;
      }
      @keyframes authFadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .auth-icon {
        font-size: 3rem;
        margin-bottom: 16px;
      }
      .auth-container h2 {
        font-size: 1.3rem;
        color: #0a3660;
        margin: 0 0 8px 0;
      }
      .auth-container > p {
        font-size: 0.9rem;
        color: #5a6a7e;
        margin: 0 0 24px 0;
      }
      .auth-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .auth-form input {
        padding: 14px 16px;
        border: 2px solid #dfe5ed;
        border-radius: 10px;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.2s;
      }
      .auth-form input:focus {
        border-color: #0f4c81;
      }
      .auth-form button {
        padding: 14px;
        background: linear-gradient(135deg, #0f4c81, #1a6bb5);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .auth-form button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(15, 76, 129, 0.3);
      }
      .auth-error {
        color: #e02424;
        font-size: 0.85rem;
        min-height: 20px;
        margin: 8px 0 0 0;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    // 绑定提交按钮
    document.getElementById('auth-submit').addEventListener('click', checkPassword);

    // 绑定回车键
    document.getElementById('auth-password').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        checkPassword();
      }
    });
  }

  // 验证密码
  function checkPassword() {
    const input = document.getElementById('auth-password');
    const error = document.getElementById('auth-error');
    const password = input.value;

    if (password === DEFAULT_PASSWORD) {
      setAuthenticated();
      // 验证成功后刷新页面
      location.reload();
    } else {
      error.textContent = '密码错误，请重试';
      input.value = '';
      input.focus();
      // 添加抖动效果
      const container = document.querySelector('.auth-container');
      container.style.animation = 'none';
      setTimeout(() => {
        container.style.animation = 'authShake 0.5s ease';
      }, 10);
    }
  }

  // 添加抖动动画
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes authShake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // 页面加载时检查
  function init() {
    if (!isAuthenticated()) {
      showPasswordForm();
    }
  }

  // 等待 DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
