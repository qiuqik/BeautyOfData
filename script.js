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
    "title": "大脑神经元可视化",
    "category": "神奇的网络",
    "type": "图片",
    "url": "http://nxxcxx.github.io/Neural-Network/",
    "screenshot": "assets/cases/neural-network.png",
    "tags": [
      "网络"
    ]
  },
  {
    "title": "全球海底光缆可视化",
    "category": "神奇的网络",
    "type": "图片",
    "url": "https://he.net/3d-map/",
    "screenshot": "assets/cases/submarine-cable-map.png",
    "tags": [
      "网络"
    ]
  },
  {
    "title": "王者荣耀角色关系可视化",
    "category": "神奇的网络",
    "type": "图片",
    "url": "https://pvp.qq.com/act/a20160510story/relavance.html",
    "screenshot": "assets/cases/honor-of-kings-relations.png",
    "tags": [
      "网络"
    ]
  },
  {
    "title": "权利的游戏可视化",
    "category": "神奇的网络",
    "type": "图片",
    "url": "http://chenhui.li/courses/old/beadata2023/thronesviz",
    "screenshot": "assets/cases/game-of-thrones-viz.png",
    "tags": [
      "网络"
    ]
  },
  {
    "title": "欧洲皇室关系图",
    "category": "神奇的网络",
    "type": "图片",
    "url": "https://royalconstellations.visualcinnamon.com/",
    "screenshot": "assets/cases/royal-constellations.png",
    "tags": [
      "网络"
    ]
  },
  {
    "title": "宋词可视化",
    "category": "文本的故事",
    "type": "图片",
    "url": "http://fms.news.cn/swf/2018_sjxw/quansongci/#/",
    "screenshot": "assets/cases/songci-visualization.png",
    "tags": [
      "文本"
    ]
  },
  {
    "title": "书籍聚类可视化",
    "category": "文本的故事",
    "type": "图片",
    "url": "https://galaxy.opensyllabus.org/",
    "screenshot": "assets/cases/open-syllabus-galaxy.png",
    "tags": [
      "文本"
    ]
  },
  {
    "title": "解构藏文",
    "category": "文本的故事",
    "type": "图片",
    "url": "http://www.shu-iids.com/ich-data-lab/project_story_decode_tibetan.html",
    "screenshot": "assets/cases/decode-tibetan.png",
    "tags": [
      "文本"
    ]
  },
  {
    "title": "汉字星图",
    "category": "文本的故事",
    "type": "图片",
    "url": "https://hanziuniverse.com/",
    "screenshot": "assets/cases/hanzi-universe.png",
    "tags": [
      "文本"
    ]
  },
  {
    "title": "视频指纹",
    "category": "多媒体汇聚",
    "type": "视频",
    "url": "https://cinemetrics.site/#/info",
    "screenshot": "assets/cases/cinemetrics.png",
    "tags": [
      "多媒体"
    ]
  },
  {
    "title": "春晚重构",
    "category": "多媒体汇聚",
    "type": "视频",
    "url": "https://www.zeelab.xyz/CCTV-Gala-3-Opening-Redux",
    "screenshot": "assets/cases/cctv-gala-redux.png",
    "tags": [
      "多媒体"
    ]
  },
  {
    "title": "风、气象、海洋可视化系统",
    "category": "时空之旅",
    "type": "图片",
    "url": "https://earth.nullschool.net/",
    "screenshot": "assets/cases/earth-nullschool.png",
    "tags": [
      "时空"
    ]
  },
  {
    "title": "Nature科学研究论文可视化",
    "category": "科学探秘",
    "type": "图片",
    "url": "https://www.nature.com/immersive/d41586-019-03165-4/index.html",
    "screenshot": "assets/cases/nature-immersive-paper.png",
    "tags": [
      "科学"
    ]
  },
  {
    "title": "人类疾病网络",
    "category": "科学探秘",
    "type": "图片",
    "url": "https://public.tableau.com/app/profile/anjushreebv/viz/HumanDiseaseNetwork/HumanDiseaseNetwork",
    "screenshot": "assets/cases/human-disease-network.png",
    "tags": [
      "科学"
    ]
  },
  {
    "title": "科学可视化（体绘制）",
    "category": "科学探秘",
    "type": "图片",
    "url": "http://chenhui.li/courses/datavis2022/06-WebGL-RayCasting/#Boston%20Teapot/",
    "screenshot": "assets/cases/webgl-raycasting.png",
    "tags": [
      "科学"
    ]
  },
  {
    "title": "常见算法可视化 1",
    "category": "AI",
    "type": "图片",
    "url": "https://visualgo.net/en",
    "screenshot": "assets/cases/visualgo.png",
    "tags": [
      "AI"
    ]
  },
  {
    "title": "常见算法可视化 2",
    "category": "AI",
    "type": "图片",
    "url": "https://bost.ocks.org/mike/algorithms/",
    "screenshot": "assets/cases/bostock-algorithms.png",
    "tags": [
      "AI"
    ]
  },
  {
    "title": "神经网络可视化",
    "category": "AI",
    "type": "图片",
    "url": "https://playground.tensorflow.org/",
    "screenshot": "assets/cases/tensorflow-playground.png",
    "tags": [
      "AI"
    ]
  },
  {
    "title": "CNN可视化示例1",
    "category": "AI",
    "type": "图片",
    "url": "https://poloclub.github.io/cnn-explainer",
    "screenshot": "assets/cases/cnn-explainer.png",
    "tags": [
      "AI"
    ]
  },
  {
    "title": "CNN可视化示例2",
    "category": "AI",
    "type": "图片",
    "url": "https://convnetplayground.fastforwardlabs.com/#/models",
    "screenshot": "assets/cases/convnet-playground.png",
    "tags": [
      "AI"
    ]
  },
  {
    "title": "GAN Visualization",
    "category": "AI",
    "type": "图片",
    "url": "https://poloclub.github.io/ganlab/",
    "screenshot": "assets/cases/ganlab.png",
    "tags": [
      "AI"
    ]
  }
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
  resultCount.textContent = `${filtered.length} / ${works.length} 个案例`;
  emptyState.hidden = filtered.length > 0;
}

function createCard(work) {
  const tags = (work.tags || []).map((tag) => `<span>${tag}</span>`).join("");
  const thumbnail = getThumbnail(work.url);

  return `
    <a class="work-card" href="${work.url}" target="_blank" rel="noopener noreferrer">
      <div class="work-card__media">
        <img src="${thumbnail}" alt="${work.title}" loading="lazy" />
      </div>
      <article class="work-card__body">
        <p class="work-card__category">${work.category || "案例"}</p>
        <h3>${work.title}</h3>
        <div class="work-card__tags">${tags}</div>
      </article>
    </a>
  `;
}

function isVideoUrl(url) {
  return /youtube\.com|youtu\.be|vimeo\.com|bilibili\.com|\.mp4($|\?)/i.test(url);
}

function getThumbnail(url) {
  const work = works.find((item) => item.url === url);
  if (work?.screenshot) return work.screenshot;
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
