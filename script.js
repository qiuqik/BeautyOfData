const gallery = document.querySelector("#gallery");
const tagList = document.querySelector("#tagList");
const queryInput = document.querySelector("#query");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");

let works = [];
let activeTag = "全部";

const fallbackWorks = [
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    title: "城市呼吸：共享单车流动图谱",
    tags: ["城市", "可视化", "流动"],
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    title: "消费的季节性：校园咖啡账单观察",
    tags: ["商业", "时间序列", "信息设计"],
  },
  {
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    title: "短视频热度的传播路径",
    tags: ["视频", "社交媒体", "网络"],
  },
  {
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    title: "公园与城市温度：热岛现象的可视化",
    tags: ["环境", "地图", "城市"],
  },
  {
    url: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80",
    title: "AI 关键词的十年变迁",
    tags: ["AI", "文本分析", "趋势"],
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "一首歌的情绪曲线",
    tags: ["视频", "音乐", "叙事"],
  },
  {
    url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80",
    title: "新闻标题里的城市想象",
    tags: ["文本分析", "媒体", "叙事"],
  },
  {
    url: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1400&q=80",
    title: "代码提交记录中的协作节奏",
    tags: ["协作", "时间序列", "网络"],
  },
  {
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
    title: "机器人影像中的人机关系",
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

  renderTags();
  renderGallery();
}

function getAllTags() {
  const tags = works.flatMap((work) => work.tags || []);
  return ["全部", ...Array.from(new Set(tags))];
}

function renderTags() {
  tagList.innerHTML = getAllTags()
    .map(
      (tag) => `
        <button class="tag-button ${tag === activeTag ? "is-active" : ""}" type="button" data-tag="${tag}">
          ${tag}
        </button>
      `,
    )
    .join("");
}

function renderGallery() {
  const query = queryInput.value.trim().toLowerCase();
  const filtered = works.filter((work) => {
    const tags = work.tags || [];
    const matchesTag = activeTag === "全部" || tags.includes(activeTag);
    const searchable = `${work.title} ${tags.join(" ")}`.toLowerCase();
    return matchesTag && searchable.includes(query);
  });

  gallery.innerHTML = filtered.map(createCard).join("");
  resultCount.textContent = `${filtered.length} / ${works.length} 件作品`;
  emptyState.hidden = filtered.length > 0;
}

function createCard(work) {
  const tags = (work.tags || []).map((tag) => `<span>${tag}</span>`).join("");
  const thumbnail = getThumbnail(work.url);
  const type = isVideoUrl(work.url) ? "Video" : "Image";

  return `
    <a class="work-card" href="${work.url}" target="_blank" rel="noopener noreferrer">
      <div class="work-card__media">
        <img src="${thumbnail}" alt="${work.title}" loading="lazy" />
        <span class="type-badge">${type}</span>
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
  renderTags();
  renderGallery();
});

queryInput.addEventListener("input", renderGallery);

loadWorks();
