// 项目数据 - 通过AJAX加载
const projectsUrl = '/js/portfollodata.js';
let projectsData = [];
let currentFilter = 'all'; // 当前分类筛选，默认为'all'
let currentSkills = []; // 当前技能筛选，支持多选
let currentKeywords = ''; // 当前关键词搜索

function fetchProjectsData() {
  fetch(projectsUrl)
    .then(response => response.json())
    .then(data => {
      projectsData = data;
      renderCategoryFilters();  // ★ 自动生成分类按钮
      renderSkillFilters();     // ★ 渲染技能标签（热度排序）
      renderProjects();         // ★ 渲染项目卡片
      initElements();           // ★ 重新获取DOM
      initEventListeners();     // ★ 绑定事件
      initSkillEvents();        // ★ 初始化技能多选事件
      initFilterEvents();       // ★ 初始化分类筛选事件
      initSearchEvent();        // ★ 初始化关键词搜索事件
    })
    .catch(err => {
      projectsGrid.innerHTML = '<div class="text-gray-500 p-8 text-center">加载项目失败</div>';
      console.error('项目数据加载失败:', err);
    });
}
// DOM元素
let navbar, menuBtn, mobileMenu, navLinks, projectsGrid, projectFilters, loadMoreBtn, projectModal, modalContent, closeModal, modalOverlay, skillBar, filterBar, searchInput;
// 初始化DOM元素
function initElements() {
  navbar = document.getElementById('navbar');
  menuBtn = document.getElementById('menuBtn');
  mobileMenu = document.getElementById('mobileMenu');
  navLinks = document.querySelectorAll('.nav-link');
  projectsGrid = document.getElementById('projectsGrid');
  skillBar = document.getElementById('skillBar');
  filterBar = document.getElementById('filterBar');
  projectFilters = document.querySelectorAll('.project-filter');
  loadMoreBtn = document.getElementById('loadMore');
  projectModal = document.getElementById('projectModal');
  modalContent = document.getElementById('modalContent');
  closeModal = document.getElementById('closeModal');
  modalOverlay = document.getElementById('modalOverlay');
  searchInput = document.getElementById('searchInput');
}

// 初始化事件监听器
function initEventListeners() {

  // 关闭模态框事件
  closeModal.addEventListener('click', () => {
    projectModal.classList.add('hidden');
  });

  modalOverlay.addEventListener('click', () => {
    projectModal.classList.add('hidden');
  });
}

// 初始化分类筛选事件
function initFilterEvents() {
  document.querySelectorAll('.project-filter').forEach(btn => {
    btn.onclick = function() {
      document.querySelectorAll('.project-filter').forEach(b => b.classList.remove('active','bg-primary','text-white','bg-gray-100','hover:bg-gray-200'));
      btn.classList.add('active','bg-primary','text-white');
      currentFilter = btn.dataset.filter;
      renderProjects();
    }
  });
}

// 初始化技能多选事件
function initSkillEvents() {
  document.querySelectorAll('.skill-filter').forEach(btn => {
    btn.onclick = function() {
      const skill = btn.dataset.skill;
      if(skill === '') {
        // "全部技能"按钮，重置所有技能筛选
        currentSkills = [];
      } else {
        const index = currentSkills.indexOf(skill);
        if(index === -1) {
          currentSkills.push(skill);
        } else {
          currentSkills.splice(index, 1);
        }
      }
      renderSkillFilters();
      renderProjects();
    }
  });
}

// 初始化关键词搜索事件
function initSearchEvent() {
  if (!searchInput) return;
  searchInput.value = currentKeywords;
  searchInput.addEventListener('input', () => {
    currentKeywords = searchInput.value.trim().toLowerCase();
    renderProjects();
  });
}

// 渲染项目列表
function renderProjects() {
  projectsGrid.innerHTML = '';

  // 过滤项目：分类 + 技能多选 + 关键词搜索
  const filteredProjects = projectsData.filter(project => {
    // 分类过滤
    if(currentFilter !== 'all' && project.category !== currentFilter) {
      return false;
    }
    // 技能多选过滤（项目必须包含所有选中技能）
    if(currentSkills.length > 0) {
      if(!project.technologies || !currentSkills.every(skill => project.technologies.includes(skill))) {
        return false;
      }
    }
    // 关键词搜索过滤，匹配 title/description/details/technologies
    if(currentKeywords) {
      const kw = currentKeywords;
      const inTitle = project.title && project.title.toLowerCase().includes(kw);
      const inDescription = project.description && project.description.toLowerCase().includes(kw);
      const inDetails = project.details && project.details.toLowerCase().includes(kw);
      const inTech = project.technologies && project.technologies.some(t => t.toLowerCase().includes(kw));
      if(!(inTitle || inDescription || inDetails || inTech)) {
        return false;
      }
    }
    return true;
  });

  // 渲染项目卡片
  filteredProjects.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = `project-card bg-white rounded-xl overflow-hidden card-shadow animate-fadeInUp delay-${index * 100}`;
    projectCard.dataset.id = project.id;

    let imageContent = '';
    if (!project.image) {
      imageContent = `<div class="w-full aspect-[3/2] flex items-center justify-center bg-gray-200 text-gray-400 text-lg">暂无图片</div>`;
    } else {
      imageContent = `<img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" onerror="this.onerror=null;this.style.display='none';const placeholder=document.createElement('div');placeholder.className='w-full aspect-[3/2] flex items-center justify-center bg-gray-200 text-gray-400 text-lg';placeholder.textContent='暂无图片';this.parentNode.appendChild(placeholder);">`;
    }

    projectCard.innerHTML = `
      <div class="relative overflow-hidden">
        ${imageContent}
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-6 w-full">
          <span class="inline-block px-3 py-1 bg-primary/90 text-white text-base rounded-full mb-3">${project.categoryName}</span>
          <h3 class="text-xl font-bold text-white mb-2">${project.title}</h3>
          <p class="text-white/80">${project.description}</p>
        </div>
      </div>
      <div class="p-6">
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.technologies.map(tech => `
            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-base rounded-full">${tech}</span>
          `).join('')}
        </div>
        <a href="#" class="view-project inline-block text-primary font-medium flex items-center hover:underline">
          查看详情 <i class="fa fa-arrow-right ml-2"></i>
        </a>
      </div>
    `;

    projectsGrid.appendChild(projectCard);
  });

  // 添加项目点击事件
  document.querySelectorAll('.view-project').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = parseInt(btn.closest('.project-card').dataset.id);
      openProjectModal(projectId);
    });
  });
}

// 渲染技能筛选标签，按热度排序，支持多选高亮，默认最多显示8个，支持展开全部
function renderSkillFilters() {
  // skillBarWrap 结构: 外层包裹 skillBar 和 toggleSkillsBtn
  let skillBarWrap = document.getElementById('skillBarWrap');
  if (!skillBarWrap) {
    // 若未存在，则插入结构
    skillBarWrap = document.createElement('div');
    skillBarWrap.id = 'skillBarWrap';
    skillBarWrap.className = 'mb-4';
    if (skillBar && skillBar.parentNode) {
      skillBar.parentNode.insertBefore(skillBarWrap, skillBar);
      skillBarWrap.appendChild(skillBar);
    }
  }
  // toggleSkillsBtn
  let toggleSkillsBtn = document.getElementById('toggleSkillsBtn');
  if (!toggleSkillsBtn) {
    toggleSkillsBtn = document.createElement('button');
    toggleSkillsBtn.id = 'toggleSkillsBtn';
    toggleSkillsBtn.type = 'button';
    toggleSkillsBtn.className = 'ml-2 px-2 py-1 text-base rounded border border-blue-100 text-blue-600 bg-white hover:bg-blue-50 transition-colors align-middle';
    toggleSkillsBtn.style.verticalAlign = 'middle';
    skillBarWrap.appendChild(toggleSkillsBtn);
  }

  // 统计技能热度
  const skillCountMap = new Map();
  projectsData.forEach(p => {
    if(p.technologies && p.technologies.length) {
      p.technologies.forEach(t => {
        skillCountMap.set(t, (skillCountMap.get(t) || 0) + 1);
      });
    }
  });
  const allSkills = [...skillCountMap.entries()]
    .sort((a,b) => b[1] - a[1])
    .map(entry => entry[0]);
  if(allSkills.length === 0) return;

  // 技能展开收起逻辑
  if (typeof renderSkillFilters.expanded === 'undefined') renderSkillFilters.expanded = false;
  const expanded = renderSkillFilters.expanded;
  // 展示前8个或全部
  const showCount = 8;
  const showSkills = expanded ? allSkills : allSkills.slice(0, showCount);

  // “全部技能”按钮
  skillBar.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = `skill-filter px-3 py-1 rounded-full mr-1 mb-2 border border-blue-100 text-blue-600 bg-white text-base transition-colors`;
  allBtn.textContent = '全部技能';
  allBtn.dataset.skill = '';
  if(currentSkills.length === 0) {
    allBtn.classList.add('active','bg-blue-50','border-blue-400','text-blue-700','font-bold');
  } else {
    allBtn.classList.add('hover:bg-blue-50');
  }
  skillBar.appendChild(allBtn);

  // 其它技能
  showSkills.forEach(skill => {
    const btn = document.createElement('button');
    btn.className = `skill-filter px-3 py-1 rounded-full mr-1 mb-2 border border-gray-100 text-gray-500 bg-white text-base transition-colors`;
    btn.textContent = skill;
    btn.dataset.skill = skill;
    if(currentSkills.includes(skill)) {
      btn.classList.add('active','bg-blue-500','text-white','border-blue-600','font-bold');
    } else {
      btn.classList.add('hover:bg-blue-50');
    }
    skillBar.appendChild(btn);
  });

  // 展开/收起按钮逻辑
  if (allSkills.length > showCount) {
    toggleSkillsBtn.style.display = '';
    toggleSkillsBtn.textContent = expanded ? '收起' : '+ 展开更多技能';
    toggleSkillsBtn.onclick = () => {
      renderSkillFilters.expanded = !renderSkillFilters.expanded;
      renderSkillFilters();
    };
  } else {
    toggleSkillsBtn.style.display = 'none';
  }
  initSkillEvents();
}

// 渲染分类筛选按钮，主次分明，按钮圆润、描边
function renderCategoryFilters() {
  if(!filterBar) return;
  filterBar.innerHTML = '';

  // “全部项目”按钮
  const allBtn = document.createElement('button');
  allBtn.className = "project-filter px-5 py-1.5 rounded-full border border-blue-100 text-blue-600 bg-white mr-2 text-base transition-colors";
  allBtn.dataset.filter = "all";
  allBtn.textContent = "全部项目";
  if(currentFilter === 'all') {
    allBtn.classList.add('active','bg-blue-50','border-blue-400','text-blue-700','font-bold');
  } else {
    allBtn.classList.add('hover:bg-blue-50');
  }
  filterBar.appendChild(allBtn);

  // 自动收集所有去重分类
  const cats = [];
  const seen = new Set();
  projectsData.forEach(p => {
    if (p.category && p.categoryName && !seen.has(p.category)) {
      cats.push({category: p.category, categoryName: p.categoryName});
      seen.add(p.category);
    }
  });
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = "project-filter px-5 py-1.5 rounded-full border mr-2 text-base transition-colors";
    btn.dataset.filter = cat.category;
    btn.textContent = cat.categoryName;
    if(currentFilter === cat.category) {
      btn.classList.add('active','bg-blue-600','border-blue-600','text-white','font-bold');
    } else {
      btn.classList.add('border-blue-100','text-gray-500','bg-white','hover:bg-blue-50');
    }
    filterBar.appendChild(btn);
  });
  initFilterEvents();
}

// 打开项目详情模态框
function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);

  if (project) {
    let previewButtonHTML = '';
    if (project.url && project.url.trim() !== '') {
      previewButtonHTML = `
        <a href="${project.url}" target="_blank" rel="noopener" class="preview-btn inline-flex items-center justify-center bg-blue-600 text-white text-lg font-semibold px-5 py-3 rounded-md mb-6 hover:bg-blue-700 transition-colors">
          项目预览 <i class="fa fa-external-link-alt ml-2"></i>
        </a>
      `;
    }

    modalContent.innerHTML = `
      <style>
        .preview-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #2563eb;
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          padding: 0.75rem 1.25rem;
          border-radius: 0.375rem;
          margin-bottom: 1.5rem;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }
        .preview-btn:hover {
          background-color: #1e40af;
          color: white;
        }
        .preview-btn i {
          margin-left: 0.5rem;
          font-size: 1rem;
        }
      </style>
      <div class="text-left">
        <div class="mb-8">
          <img src="${project.image}" alt="${project.title}" class="w-full h-auto rounded-xl">
        </div>
        ${previewButtonHTML}
        <div class="mb-6">
          <span class="inline-block px-3 py-1 bg-primary/90 text-white text-base rounded-full mb-3">${project.categoryName}</span>
          <h2 class="text-2xl md:text-3xl font-bold mb-2">${project.title}</h2>
          <p class="text-gray-600">${project.description}</p>
        </div>
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">使用技术</h3>
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(tech => `
              <span class="px-3 py-1 bg-gray-100 text-gray-700 text-base rounded-full">${tech}</span>
            `).join('')}
          </div>
        </div>
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">项目详情</h3>
          <p class="text-gray-700 leading-relaxed">${project.details}</p>
        </div>
      </div>
    `;

    projectModal.classList.remove('hidden');
  }
}

// 页面加载时初始化
window.addEventListener('load', () => {
  // 在 projectsGrid 上方插入关键词搜索框，独占一行，上方留白
  if(projectsGrid) {
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'w-full flex justify-center mb-8 mt-2';
    const searchBox = document.createElement('input');
    searchBox.id = 'searchInput';
    searchBox.type = 'text';
    searchBox.placeholder = '搜索项目关键词/技能...';
    searchBox.className = 'w-full max-w-md px-4 py-2 border rounded shadow-sm';
    searchWrapper.appendChild(searchBox);
    projectsGrid.parentNode.insertBefore(searchWrapper, projectsGrid);
  }
  fetchProjectsData();
  initElements();
  initEventListeners();
});