function renderWorks() {
  const grid = document.getElementById("work-grid");
  grid.innerHTML = WORKS.map((w, i) => `
    <article class="work-card" data-index="${i}">
      <div class="work-thumb">
        <span class="play-icon">&#9658;</span>
      </div>
      <div class="work-body">
        <h3>${w.title}</h3>
        <p class="work-meta">${w.role} / ${w.period}</p>
        <p>${w.description}</p>
        <div class="work-tools">${w.tools.map(t => `<span class="tool-tag">${t}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".work-card").forEach(card => {
    card.addEventListener("click", () => openModal(WORKS[card.dataset.index].videoUrl));
  });
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

function openModal(videoUrl) {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("modal-video");
  video.src = videoUrl;
  modal.classList.add("open");
  video.play().catch(() => {});
}

function closeModal() {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("modal-video");
  video.pause();
  video.src = "";
  modal.classList.remove("open");
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("video-modal").addEventListener("click", e => {
  if (e.target.id === "video-modal") closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

renderWorks();
renderSkills();
