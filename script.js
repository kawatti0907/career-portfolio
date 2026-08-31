const WORK_GROUPS = [
  { key: "work", label: "仕事" },
  { key: "hobby", label: "趣味" },
];

function workCardHtml(w, i) {
  const meta = w.category === "hobby" ? "" : `<p class="work-meta">${w.role} / ${w.period}</p>`;
  return `
    <article class="work-card" data-index="${i}">
      <div class="work-thumb">
        ${w.youtubeId ? `<img class="work-thumb-img" src="https://img.youtube.com/vi/${w.youtubeId}/hqdefault.jpg" alt="${w.title}">` : ""}
        <span class="play-icon">&#9658;</span>
      </div>
      <div class="work-body">
        <h3>${w.title}</h3>
        ${meta}
        <p>${w.description}</p>
        <div class="work-tools">${w.tools.map(t => `<span class="tool-tag">${t}</span>`).join("")}</div>
      </div>
    </article>
  `;
}

function renderWorks() {
  const grid = document.getElementById("work-grid");
  const entries = WORKS
    .map((w, i) => ({ w, i }))
    .filter(({ w }) => w.videoUrl || w.youtubeId);

  grid.innerHTML = WORK_GROUPS.map(({ key, label }) => {
    const groupEntries = entries.filter(({ w }) => (w.category || "work") === key);
    if (!groupEntries.length) return "";
    return `
      <div class="work-group">
        <h3 class="work-group-label">${label}</h3>
        <div class="work-subgrid">
          ${groupEntries.map(({ w, i }) => workCardHtml(w, i)).join("")}
        </div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".work-card").forEach(card => {
    card.addEventListener("click", () => openModal(WORKS[card.dataset.index]));
  });
}

function renderShowreel() {
  if (!SHOWREEL_URL) return;
  const video = document.getElementById("showreel-video");
  video.src = SHOWREEL_URL;
}

function renderSkills() {
  const container = document.getElementById("skill-groups");
  container.innerHTML = SKILLS.map(s => `
    <div class="skill-group">
      <h3>${s.group}</h3>
      <ul>${s.items.map(item => `<li>${item}</li>`).join("")}</ul>
    </div>
  `).join("");
}

function openModal(work) {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("modal-video");
  const yt = document.getElementById("modal-youtube");

  if (work.youtubeId) {
    video.classList.add("hidden");
    yt.classList.remove("hidden");
    yt.src = `https://www.youtube.com/embed/${work.youtubeId}?autoplay=1`;
  } else {
    yt.classList.add("hidden");
    video.classList.remove("hidden");
    video.src = work.videoUrl;
    video.play().catch(() => {});
  }
  modal.classList.add("open");
}

function closeModal() {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("modal-video");
  const yt = document.getElementById("modal-youtube");
  video.pause();
  video.src = "";
  yt.src = "";
  modal.classList.remove("open");
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("video-modal").addEventListener("click", e => {
  if (e.target.id === "video-modal") closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

renderShowreel();
renderWorks();
renderSkills();
