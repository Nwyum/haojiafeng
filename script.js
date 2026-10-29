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
  },
  {
    name: "《朱子家训》",
    author: "明末清初 · 朱柏庐",
    quote: "一粥一饭，当思来处不易；半丝半缕，恒念物力维艰。宜未雨而绸缪，毋临渴而掘井。",
    intro:
      "全文仅五百余字，却字字珠玑，从饮食起居讲到读书做人，是中国流传最广的家训之一。'黎明即起，洒扫庭除'至今仍是许多家庭的第一课。",
  },
  {
    name: "《曾国藩家书》",
    author: "清 · 曾国藩",
    quote: "家俭则兴，人勤则健；能勤能俭，永不贫贱。",
    intro:
      "曾国藩一生写下千余封家书，教育兄弟子侄'勤、俭、孝、友'。他位极人臣却要求子女自食其力，曾氏家族绵延十代无一'败家子'，两百多年间出两百多位人才。",
  },
  {
    name: "《钱氏家训》",
    author: "五代 · 钱镠 立训",
    quote: "利在一身勿谋也，利在天下者必谋之。",
    intro:
      "一部传承千年的家族精神宪法。钱氏家族近代走出钱学森、钱三强、钱伟长、钱钟书、钱穆等大批杰出人物，被世人称为'千年名门望族、两浙第一世家'。",
  },
  {
    name: "《傅雷家书》",
    author: "现代 · 傅雷",
    quote: "先为人，次为艺术家，再为音乐家，终为钢琴家。",
    intro:
      "傅雷与儿子傅聪的百余家书，谈艺术、谈人生、谈祖国。他告诫儿子：做艺术之前先学会做人。这本书感动了几代中国家庭，成为现代家教的典范。",
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
  { text: "黎明即起，洒扫庭除，要内外整洁。", from: "——《朱子家训》" },
  { text: "静以修身，俭以养德。", from: "—— 诸葛亮《诫子书》" },
  { text: "由俭入奢易，由奢入俭难。", from: "—— 司马光《训俭示康》" },
  { text: "孝悌也者，其为仁之本与！", from: "——《论语·学而》" },
  { text: "积善之家，必有余庆。", from: "——《周易·坤卦》" },
  { text: "利在一身勿谋也，利在天下者必谋之。", from: "——《钱氏家训》" },
  { text: "与善人居，如入芝兰之室，久而自芳也。", from: "——《颜氏家训》" },
  { text: "勿以恶小而为之，勿以善小而不为。", from: "—— 刘备《敕后主辞》" },
  { text: "子孙若如我，留钱做什么？贤而多财，则损其志。", from: "—— 林则徐家训" },
  { text: "家俭则兴，人勤则健；能勤能俭，永不贫贱。", from: "——《曾国藩家书》" },
  { text: "言必信，行必果。", from: "——《论语·子路》" },
  { text: "少壮不努力，老大徒伤悲。", from: "——《长歌行》" },
  { text: "一念之非即遏之，一动之妄即改之。", from: "—— 明 · 王阳明家训" },
  { text: "勿营华屋，勿谋良田。居身务期质朴，教子要有义方。", from: "——《朱子家训》" },
  { text: "读书志在圣贤，非徒科第；为官心存君国，岂计身家。", from: "——《朱子家训》" },
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
  dailyFrom.textContent = precepts[idx].from;

  // 重新触发翻牌动画
  dailyCard.classList.remove("flip");
  void dailyCard.offsetWidth;
  dailyCard.classList.add("flip");
});

/* ---------- 4. 滚动进场动画 ---------- */
const revealTargets = document.querySelectorAll(
  ".intro-card, .motto-card, .story-card, .daily-box, .tabs, .ending-inner, .section-title, .section-sub"
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

/* ---------- 5. 回到顶部 ---------- */
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
