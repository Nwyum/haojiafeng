/* =====================================================
   好家风好家训 · 主题展示网站 交互脚本
   功能：移动端菜单 / 名人家训标签页 / 每日家训抽签 /
        滚动进场动画 / 回到顶部
   ===================================================== */

/* ---------- 1. 移动端导航 ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ---------- 2. 名人家训数据与标签页 ---------- */
const classics = [
  {
    name: "《颜氏家训》",
    author: "北齐 · 颜之推",
    quote: "与善人居，如入芝兰之室，久而自芳也；与恶人居，如入鲍鱼之肆，久而自臭也。",
    intro:
      "《颜氏家训》被誉为'古今家训之祖'，共七卷二十篇。颜之推以自身经历告诫子孙：修身、治家、处世、为学，无所不包。颜氏家族此后人才辈出，千年不衰，足见其家训之力。",
    link: "https://baike.baidu.com/item/%E9%A2%9C%E6%B0%8F%E5%AE%B6%E8%AE%AD",
  },
  {
    name: "《朱子家训》",
    author: "明末清初 · 朱柏庐",
    quote: "一粥一饭，当思来处不易；半丝半缕，恒念物力维艰。宜未雨而绸缪，毋临渴而掘井。",
    intro:
      "全文仅五百余字，却字字珠玑，从饮食起居讲到读书做人，是中国流传最广的家训之一。'黎明即起，洒扫庭除'至今仍是许多家庭的第一课。",
    link: "https://baike.baidu.com/item/%E6%9C%B1%E5%AD%90%E5%AE%B6%E8%AE%AD/2423407",
  },
  {
    name: "《曾国藩家书》",
    author: "清 · 曾国藩",
    quote: "家俭则兴，人勤则健；能勤能俭，永不贫贱。",
    intro:
      "曾国藩一生写下千余封家书，教育兄弟子侄'勤、俭、孝、友'。他位极人臣却要求子女自食其力，曾氏家族绵延十代无一'败家子'，两百多年间出两百多位人才。",
    link: "https://baike.baidu.com/item/%E6%9B%BE%E5%9B%BD%E8%97%A9%E5%AE%B6%E4%B9%A6",
  },
  {
    name: "《钱氏家训》",
    author: "五代 · 钱镠 立训",
    quote: "利在一身勿谋也，利在天下者必谋之。",
    intro:
      "一部传承千年的家族精神宪法。钱氏家族近代走出钱学森、钱三强、钱伟长、钱钟书、钱穆等大批杰出人物，被世人称为'千年名门望族、两浙第一世家'。",
    link: "https://baike.baidu.com/item/%E9%92%B1%E6%B0%8F%E5%AE%B6%E8%AE%AD",
  },
  {
    name: "《傅雷家书》",
    author: "现代 · 傅雷",
    quote: "先为人，次为艺术家，再为音乐家，终为钢琴家。",
    intro:
      "傅雷与儿子傅聪的百余家书，谈艺术、谈人生、谈祖国。他告诫儿子：做艺术之前先学会做人。这本书感动了几代中国家庭，成为现代家教的典范。",
    link: "https://baike.baidu.com/item/%E5%82%85%E9%9B%B7%E5%AE%B6%E4%B9%A6",
  },
];

const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.getElementById("tabPanels");

// 动态生成所有面板
classics.forEach((c, i) => {
  const panel = document.createElement("div");
  panel.className = "tab-panel" + (i === 0 ? " active" : "");
  panel.innerHTML = `
    <h3>${c.name}</h3>
    <p class="tab-author">${c.author}</p>
    <blockquote>${c.quote}</blockquote>
    <p>${c.intro}</p>
    <p><a class="baike-link tab-link" href="${c.link}" target="_blank" rel="noopener">查看百度百科 ↗</a></p>
  `;
  tabPanels.appendChild(panel);
});

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    tabPanels.children[Number(btn.dataset.tab)].classList.add("active");
  });
});

/* ---------- 3. 每日家训抽签 ---------- */
const precepts = [
  { text: "黎明即起，洒扫庭除，要内外整洁。", from: "《朱子家训》", link: "https://baike.baidu.com/item/%E6%9C%B1%E5%AD%90%E5%AE%B6%E8%AE%AD/2423407" },
  { text: "静以修身，俭以养德。", from: "诸葛亮《诫子书》", link: "https://baike.baidu.com/item/%E8%AF%94%E5%AD%90%E4%B9%A6" },
  { text: "由俭入奢易，由奢入俭难。", from: "司马光《训俭示康》", link: "https://baike.baidu.com/item/%E8%AE%AD%E4%BF%AD%E7%A4%BA%E5%BA%B7" },
  { text: "孝悌也者，其为仁之本与！", from: "《论语·学而》", link: "https://baike.baidu.com/item/%E8%AE%BA%E8%AF%AD" },
  { text: "积善之家，必有余庆。", from: "《周易·坤卦》", link: "https://baike.baidu.com/item/%E5%91%A8%E6%98%93" },
  { text: "利在一身勿谋也，利在天下者必谋之。", from: "《钱氏家训》", link: "https://baike.baidu.com/item/%E9%92%B1%E6%B0%8F%E5%AE%B6%E8%AE%AD" },
  { text: "与善人居，如入芝兰之室，久而自芳也。", from: "《颜氏家训》", link: "https://baike.baidu.com/item/%E9%A2%9C%E6%B0%8F%E5%AE%B6%E8%AE%AD" },
  { text: "勿以恶小而为之，勿以善小而不为。", from: "刘备《敕后主辞》", link: "https://baike.baidu.com/item/%E5%88%98%E5%A4%87" },
  { text: "子孙若如我，留钱做什么？贤而多财，则损其志。", from: "林则徐家训", link: "https://baike.baidu.com/item/%E6%9E%97%E5%88%99%E5%BE%90" },
  { text: "家俭则兴，人勤则健；能勤能俭，永不贫贱。", from: "《曾国藩家书》", link: "https://baike.baidu.com/item/%E6%9B%BE%E5%9B%BD%E8%97%A9%E5%AE%B6%E4%B9%A6" },
  { text: "言必信，行必果。", from: "《论语·子路》", link: "https://baike.baidu.com/item/%E8%AE%BA%E8%AF%AD" },
  { text: "少壮不努力，老大徒伤悲。", from: "《长歌行》", link: "https://baike.baidu.com/item/%E9%95%BF%E6%AD%8C%E8%A1%8C" },
  { text: "一念之非即遏之，一动之妄即改之。", from: "明 · 王阳明家训", link: "https://baike.baidu.com/item/%E7%8E%8B%E9%98%B3%E6%98%8E" },
  { text: "勿营华屋，勿谋良田。居身务期质朴，教子要有义方。", from: "《朱子家训》", link: "https://baike.baidu.com/item/%E6%9C%B1%E5%AD%90%E5%AE%B6%E8%AE%AD/2423407" },
  { text: "读书志在圣贤，非徒科第；为官心存君国，岂计身家。", from: "《朱子家训》", link: "https://baike.baidu.com/item/%E6%9C%B1%E5%AD%90%E5%AE%B6%E8%AE%AD/2423407" },
];

const drawBtn = document.getElementById("drawBtn");
const dailyCard = document.getElementById("dailyCard");
const dailyText = document.getElementById("dailyText");
const dailyFrom = document.getElementById("dailyFrom");
let lastIndex = -1;

drawBtn.addEventListener("click", () => {
  let idx;
  do {
    idx = Math.floor(Math.random() * precepts.length);
  } while (idx === lastIndex && precepts.length > 1);

  lastIndex = idx;
  dailyText.textContent = precepts[idx].text;
  dailyFrom.innerHTML = `—— <a class="baike-link" href="${precepts[idx].link}" target="_blank" rel="noopener">${precepts[idx].from} ↗</a>`;

  // 重新触发翻牌动画
  dailyCard.classList.remove("flip");
  void dailyCard.offsetWidth;
  dailyCard.classList.add("flip");
});

/* ---------- 4. 滚动进场动画 ---------- */
const revealTargets = document.querySelectorAll(
  ".intro-card, .motto-card, .story-card, .player-main, .video-item, .daily-box, .tabs, .ending-inner, .section-title, .section-sub"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => io.observe(el));

/* ---------- 5. 家风影像：主播放器 + 待播列表 ---------- */
// 换视频 / 加视频：直接改这个数组（BV 号在B站「分享 → 嵌入代码」里可以找到）
const videos = [
  {
    bvid: "BV1qW411V7rC",
    title: "央视纪录片《家风》全 2 集",
    desc: "国内第一部系统阐述家风的纪录片，从《颜氏家训》《朱子家训》讲到钱氏家族。",
  },
  {
    bvid: "BV1QYS8YiExh",
    title: "微电影《家训八十》",
    desc: "全国高校大学生微电影参赛作品，大学生探寻家训传承的故事。",
  },
  {
    bvid: "BV1Gx411D7AB",
    title: "央视纪录片《齐鲁家风》",
    desc: "央视《探索发现》六集超清纪录片，讲述孔孟之乡传承千年的家风故事。",
  },
  {
    bvid: "BV1rhpu6pE37",
    title: "央视纪录片《守望家风》",
    desc: "五集文献纪录片之「善·仁」，以真实人物故事诠释家风内涵。",
  },
];

const mainPlayer = document.getElementById("mainPlayer");
const playerCaption = document.getElementById("playerCaption");
const videoList = document.getElementById("videoList");

function playerUrl(bvid, autoplay) {
  return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=${autoplay}`;
}

// 生成待播列表
videos.forEach((v, i) => {
  const item = document.createElement("div");
  item.className = "video-item" + (i === 0 ? " active" : "");
  item.innerHTML = `
    <span class="video-num">${i + 1}</span>
    <div class="video-text">
      <h3>${v.title}</h3>
      <p>${v.desc}</p>
    </div>
    <span class="video-badge" ${i === 0 ? "" : "hidden"}>播放中</span>
  `;
  item.addEventListener("click", () => selectVideo(i));
  videoList.appendChild(item);
});

function selectVideo(index) {
  // 只有一个主播放器：切换视频 = 替换主播放器地址，上一个自然停止
  mainPlayer.src = playerUrl(videos[index].bvid, 1); // autoplay=1 装入即播
  playerCaption.textContent = `正在播放：${videos[index].title}`;

  document.querySelectorAll(".video-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
    item.querySelector(".video-badge").hidden = i !== index;
  });

  // 手机上选片后自动滚到主播放器
  if (window.innerWidth < 768) {
    document.getElementById("playerMain").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ---------- 6. 飘落花瓣背景动画 ---------- */
const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");

let petals = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 根据屏幕大小决定花瓣数量
const PETAL_COUNT = window.innerWidth < 768 ? 18 : 34;

function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    size: 4 + Math.random() * 6,              // 花瓣大小
    speedY: 0.5 + Math.random() * 1.2,        // 下落速度
    speedX: 0.3 + Math.random() * 0.8,        // 水平漂移
    sway: Math.random() * Math.PI * 2,        // 左右摇摆相位
    swaySpeed: 0.01 + Math.random() * 0.02,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
    opacity: 0.25 + Math.random() * 0.35,
    // 花瓣颜色在金 / 红之间随机
    color:
      Math.random() > 0.5
        ? `rgba(201, 160, 99, ${0.25 + Math.random() * 0.3})`
        : `rgba(185, 58, 50, ${0.18 + Math.random() * 0.25})`,
  };
}

for (let i = 0; i < PETAL_COUNT; i++) {
  petals.push(createPetal());
}

function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  // 用两个贝塞尔曲线画出花瓣形状
  ctx.beginPath();
  ctx.moveTo(0, -p.size);
  ctx.bezierCurveTo(p.size, -p.size, p.size, p.size * 0.6, 0, p.size);
  ctx.bezierCurveTo(-p.size, p.size * 0.6, -p.size, -p.size, 0, -p.size);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach((p, i) => {
    p.y += p.speedY;
    p.sway += p.swaySpeed;
    p.x += p.speedX + Math.sin(p.sway) * 0.6;
    p.rot += p.rotSpeed;

    // 飘出屏幕后重置到顶部
    if (p.y > canvas.height + 20 || p.x > canvas.width + 30 || p.x < -30) {
      petals[i] = createPetal();
      petals[i].y = -20;
    }

    drawPetal(p);
  });

  requestAnimationFrame(animatePetals);
}

// 尊重系统"减少动态效果"设置
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animatePetals();
}

/* ---------- 7. 数字滚动统计 ---------- */
const statNums = document.querySelectorAll(".stat-num");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1800;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic：先快后慢
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      statsObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

statNums.forEach((el) => statsObserver.observe(el));

/* ---------- 8. 家风长廊无缝滚动（复制一份内容） ---------- */
const marqueeTrack = document.getElementById("marqueeTrack");
if (marqueeTrack) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

/* ---------- 9. 首屏标语打字机效果 ---------- */
const sloganSpans = document.querySelectorAll(".hero-slogan span");
const cursorBar = document.querySelector(".hero-slogan i");

function typeText(el, text, done) {
  el.textContent = "";
  let i = 0;
  const t = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(t);
      done && done();
    }
  }, 180);
}

if (sloganSpans.length === 2 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const t1 = sloganSpans[0].textContent;
  const t2 = sloganSpans[1].textContent;
  sloganSpans[1].textContent = "";
  if (cursorBar) cursorBar.style.opacity = "0";

  setTimeout(() => {
    typeText(sloganSpans[0], t1, () => {
      setTimeout(() => {
        typeText(sloganSpans[1], t2, () => {
          if (cursorBar) cursorBar.style.opacity = "";
        });
      }, 500);
    });
  }, 800);
}

/* ---------- 10. 回到顶部 ---------- */
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
