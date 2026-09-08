const WORK_GROUPS = [
  { key: "work", label: "仕事" },
  { key: "hobby", label: "趣味" },
];

function workCardHtml(w, i) {
  const meta = w.category === "hobby" ? "" : `<p class="work-meta">${w.role} / ${w.period}</p>`;
  return `
    <article class="work-card" data-index="${i}" tabindex="0" role="button" aria-label="${w.title}を開く">
      <div class="work-thumb">
        ${w.youtubeId ? `<img class="work-thumb-img" src="https://img.youtube.com/vi/${w.youtubeId}/hqdefault.jpg" alt="${w.title}">` : ""}
        ${w.thumbUrl ? `<img class="work-thumb-img" src="${w.thumbUrl}" alt="${w.title}" loading="lazy">` : ""}
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
    const open = () => openModal(WORKS[card.dataset.index]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
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

// Link IDs follow media identity, not array order; cache queries do not affect links.
function workId(work) {
  return work.id || (work.youtubeId ? `youtube-${work.youtubeId}` : new URL(work.videoUrl, location.href).pathname.split("/").pop().replace(/\.[^.]+$/, ""));
}
function videoLink(id) {
  const url = new URL(location.href);
  url.searchParams.set("video", id);
  url.hash = "";
  return url;
}
function setVideoUrl(id, replace = false) {
  const url = new URL(location.href);
  if (id) { url.searchParams.set("video", id); url.hash = ""; }
  else url.searchParams.delete("video");
  if (url.href !== location.href) history[replace ? "replaceState" : "pushState"](id && id !== "showreel" && !replace ? { portfolioModal: true } : null, "", url);
}
let activeWork = null;
let returnFocus = null;
let returningToPage = false;
function openModal(work, updateUrl = true) {
  if (!activeWork) returnFocus = document.activeElement;
  clearModal();
  document.getElementById("showreel-video").pause();
  activeWork = work;
  const video = document.getElementById("modal-video");
  const yt = document.getElementById("modal-youtube");
  document.getElementById("modal-title").textContent = work.title;
  document.getElementById("modal-status").textContent = "";
  video.classList.toggle("hidden", !!work.youtubeId);
  yt.classList.toggle("hidden", !work.youtubeId);
  if (work.youtubeId) yt.src = `https://www.youtube.com/embed/${work.youtubeId}?autoplay=0`;
  else { video.poster = work.thumbUrl || ""; video.src = work.videoUrl; }
  document.getElementById("video-modal").classList.add("open");
  if (updateUrl) setVideoUrl(workId(work));
  document.getElementById("modal-close").focus();
}
function clearModal() {
  const video = document.getElementById("modal-video");
  video.pause();
  video.removeAttribute("src");
  video.load();
  const yt = document.getElementById("modal-youtube");
  const freshFrame = yt.cloneNode(false);
  freshFrame.removeAttribute("src");
  yt.replaceWith(freshFrame);
  document.getElementById("video-modal").querySelectorAll("[data-share-fallback]").forEach(input => input.remove());
  document.getElementById("video-modal").classList.remove("open");
  activeWork = null;
}
function closeModal() {
  if (!activeWork) return;
  clearModal();
  if (history.state?.portfolioModal) { returningToPage = true; history.back(); }
  else setVideoUrl(null, true);
  returnFocus?.focus();
}
function restoreVideoFromUrl() {
  const restorePage = returningToPage;
  returningToPage = false;
  const id = new URL(location.href).searchParams.get("video");
  const wasOpen = !!activeWork;
  clearModal();
  if (wasOpen) returnFocus?.focus();
  const reel = document.getElementById("showreel-video");
  reel.pause();
  if (id === "showreel" && SHOWREEL_URL) {
    if (restorePage) return;
    reel.scrollIntoView({ block: "center" });
    reel.focus();
    return;
  }
  const work = WORKS.find(w => (w.videoUrl || w.youtubeId) && workId(w) === id);
  if (work) openModal(work, false);
  else if (id) setVideoUrl(null, true);
}
async function copyVideoLink(id, statusId) {
  const link = videoLink(id).href;
  const status = document.getElementById(statusId);
  status.parentElement.querySelector(`[data-share-fallback="${statusId}"]`)?.remove();
  status.textContent = "";
  try {
    await navigator.clipboard.writeText(link);
    status.textContent = "リンクをコピーしました";
  } catch {
    status.textContent = "コピーできない場合は、下のURLを選択してコピーしてください。";
    const input = document.createElement("input");
    input.type = "text"; input.readOnly = true; input.value = link;
    input.setAttribute("aria-label", "動画の共有URL");
    input.style.cssText = "display:block;width:100%;font-size:16px;margin-top:8px";
    input.dataset.shareFallback = statusId;
    status.insertAdjacentElement("afterend", input); input.focus(); input.select();
  }
}
document.getElementById("modal-copy").addEventListener("click", () => {
  if (activeWork) copyVideoLink(workId(activeWork), "modal-status");
});
document.getElementById("showreel-copy").addEventListener("click", () => {
  setVideoUrl("showreel", true);
  copyVideoLink("showreel", "showreel-status");
});
document.getElementById("showreel-video").addEventListener("play", () => setVideoUrl("showreel", true));
window.addEventListener("popstate", restoreVideoFromUrl);
document.getElementById("video-modal").addEventListener("keydown", e => {
  if (e.key !== "Tab") return;
  const controls = [...e.currentTarget.querySelectorAll("button, video, iframe, input")].filter(el => !el.classList.contains("hidden"));
  const first = controls[0], last = controls[controls.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

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

restoreVideoFromUrl();
