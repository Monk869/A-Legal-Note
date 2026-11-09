const categories = ["All", ...new Set(articles.map(article => article.category))];
let activeCategory = "All";
let searchTerm = "";

const articleGrid = document.getElementById("articleGrid");
const filters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const overlay = document.getElementById("readerOverlay");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function renderFilters() {
  filters.innerHTML = categories.map(category => `
    <button class="filter-button ${category === activeCategory ? "selected" : ""}" data-category="${escapeHTML(category)}" aria-pressed="${category === activeCategory}">
      ${escapeHTML(category)}
    </button>`).join("");
  filters.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderArticles();
    });
  });
}

function articleCard(article) {
  return `
    <article class="article-card">
      <div class="card-top"><span class="tag">${escapeHTML(article.category)}</span><span class="read-time">${escapeHTML(article.readTime)}</span></div>
      <h3>${escapeHTML(article.title)}</h3>
      <p>${escapeHTML(article.excerpt)}</p>
      <div class="card-footer"><span class="card-date">${escapeHTML(article.date)}</span><button class="read-button" data-read="${article.id}">Read article <span>→</span></button></div>
    </article>`;
}

function renderArticles() {
  const visible = articles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const haystack = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase();
    return matchesCategory && haystack.includes(searchTerm.toLowerCase());
  });
  articleGrid.innerHTML = visible.map(articleCard).join("");
  emptyState.hidden = visible.length !== 0;
  articleGrid.querySelectorAll("[data-read]").forEach(button => {
    button.addEventListener("click", () => openArticle(Number(button.dataset.read)));
  });
}

function openArticle(id) {
  const article = articles.find(item => item.id === id);
  if (!article) return;
  document.getElementById("readerMeta").textContent = `${article.category}  ·  ${article.date}  ·  ${article.readTime}`;
  document.getElementById("readerTitle").textContent = article.title;
  document.getElementById("readerExcerpt").textContent = article.excerpt;
  document.getElementById("readerBody").innerHTML = article.body.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join("");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("readerClose").focus();
}

function closeArticle() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderFeatured() {
  const featured = articles.find(article => article.featured) || articles[0];
  if (!featured) return;
  document.getElementById("featuredArticle").innerHTML = `
    <div><div class="article-meta">${escapeHTML(featured.category)} &nbsp; / &nbsp; ${escapeHTML(featured.date)} &nbsp; / &nbsp; ${escapeHTML(featured.readTime)}</div>
    <h2>${escapeHTML(featured.title)}</h2><p>${escapeHTML(featured.excerpt)}</p>
    <button class="read-button" id="featuredRead">Read the article <span>→</span></button></div>
    <aside class="feature-aside"><strong>WHY THIS MATTERS</strong>A starting point for thoughtful conversations about law, institutions and everyday life.</aside>`;
  document.getElementById("featuredRead").addEventListener("click", () => openArticle(featured.id));
}

function renderTopics() {
  const topics = categories.filter(category => category !== "All");
  document.getElementById("topicList").innerHTML = topics.map(topic => {
    const count = articles.filter(article => article.category === topic).length;
    return `<a class="topic-link" href="#articles" data-topic="${escapeHTML(topic)}">${escapeHTML(topic)} <span>${String(count).padStart(2, "0")} ↗</span></a>`;
  }).join("");
  document.querySelectorAll("[data-topic]").forEach(link => link.addEventListener("click", () => {
    activeCategory = link.dataset.topic;
    renderFilters();
    renderArticles();
  }));
}

searchInput.addEventListener("input", event => {
  searchTerm = event.target.value.trim();
  renderArticles();
});
document.getElementById("readerClose").addEventListener("click", closeArticle);
overlay.addEventListener("click", event => { if (event.target === overlay) closeArticle(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeArticle(); });

document.getElementById("year").textContent = new Date().getFullYear();
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

renderFilters();
renderArticles();
renderFeatured();
renderTopics();
