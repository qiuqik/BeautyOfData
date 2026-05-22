const gallery = document.querySelector("#gallery");
const typeList = document.querySelector("#typeList");
const tagList = document.querySelector("#tagList");
const queryInput = document.querySelector("#query");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");

let works = [];
let activeType = "全部";
let activeTag = "全部";

const fallbackWorks = [
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    title: "城市呼吸：共享单车流动图谱",
    type: "图片",
    tags: ["城市", "可视化", "流动"],
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    title: "消费的季节性：校园咖啡账单观察",
    type: "图片",
    tags: ["商业", "时间序列", "信息设计"],
  },
  {
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    title: "短视频热度的传播路径",
    type: "视频",
    tags: ["社交媒体", "网络", "传播"],
  },
  {
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    title: "公园与城市温度：热岛现象的可视化",
    type: "图片",
    tags: ["环境", "地图", "城市"],
  },
  {
    url: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80",
    title: "AI 关键词的十年变迁",
    type: "图片",
    tags: ["AI", "文本分析", "趋势"],
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "一首歌的情绪曲线",
    type: "视频",
    tags: ["音乐", "叙事", "情绪"],
  },
  {
    url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80",
    title: "新闻标题里的城市想象",
    type: "图片",
    tags: ["文本分析", "媒体", "叙事"],
  },
  {
    url: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1400&q=80",
    title: "代码提交记录中的协作节奏",
    type: "图片",
    tags: ["协作", "时间序列", "网络"],
  },
  {
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
    title: "机器人影像中的人机关系",
    type: "图片",
    tags: ["AI", "图像", "叙事"],
  },
];

async function loadWorks() {
  try {
    const response = await fetch("works.json");
    if (!response.ok) throw new Error("Cannot load works.json");
    works = await response.json();
  } catch {
    works = fallbackWorks;
  }

  renderFilters();
  renderGallery();
}

function normalizeWork(work) {
  return {
    ...work,
    type: work.type || (isVideoUrl(work.url) ? "视频" : "图片"),
  };
}

function getAllTypes() {
  const types = works.map((work) => normalizeWork(work).type);
  return ["全部", ...Array.from(new Set(types))];
}

function getAllTags() {
  const tags = works.flatMap((work) => work.tags || []);
  return ["全部", ...Array.from(new Set(tags))];
}

function renderFilters() {
  typeList.innerHTML = getAllTypes()
    .map((type) => createFilterButton(type, activeType, "type"))
    .join("");
  tagList.innerHTML = getAllTags()
    .map((tag) => createFilterButton(tag, activeTag, "tag"))
    .join("");
}

function createFilterButton(value, activeValue, group) {
  return `
    <button class="tag-button ${value === activeValue ? "is-active" : ""}" type="button" data-${group}="${value}">
      ${value}
    </button>
  `;
}

function renderGallery() {
  const query = queryInput.value.trim().toLowerCase();
  const normalizedWorks = works.map(normalizeWork);
  const filtered = normalizedWorks.filter((work) => {
    const tags = work.tags || [];
    const matchesType = activeType === "全部" || work.type === activeType;
    const matchesTag = activeTag === "全部" || tags.includes(activeTag);
    const searchable = `${work.title} ${work.type} ${tags.join(" ")}`.toLowerCase();
    return matchesType && matchesTag && searchable.includes(query);
  });

  gallery.innerHTML = filtered.map(createCard).join("");
  resultCount.textContent = `${filtered.length} / ${works.length} 件作品`;
  emptyState.hidden = filtered.length > 0;
}

function createCard(work) {
  const tags = (work.tags || []).map((tag) => `<span>${tag}</span>`).join("");
  const thumbnail = getThumbnail(work.url);

  return `
    <a class="work-card" href="${work.url}" target="_blank" rel="noopener noreferrer">
      <div class="work-card__media">
        <img src="${thumbnail}" alt="${work.title}" loading="lazy" />
        <span class="type-badge">${work.type}</span>
      </div>
      <article class="work-card__body">
        <h3>${work.title}</h3>
        <div class="work-card__tags">${tags}</div>
        <span class="work-card__link">打开作品</span>
      </article>
    </a>
  `;
}

function isVideoUrl(url) {
  return /youtube\.com|youtu\.be|vimeo\.com|bilibili\.com|\.mp4($|\?)/i.test(url);
}

function getThumbnail(url) {
  const youtubeId = getYoutubeId(url);
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  if (/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url)) return url;
  return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";
}

function getYoutubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

tagList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tag]");
  if (!button) return;
  activeTag = button.dataset.tag;
  renderFilters();
  renderGallery();
});

typeList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-type]");
  if (!button) return;
  activeType = button.dataset.type;
  renderFilters();
  renderGallery();
});

queryInput.addEventListener("input", renderGallery);

loadWorks();
