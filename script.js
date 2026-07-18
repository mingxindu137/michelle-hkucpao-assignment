const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const loader = $('#travelLoader');
const loadNumber = $('#loadNumber');
const loadProgress = $('#loadProgress');
let isTravelling = false;

function showScene(id) {
  $$('.scene').forEach(scene => scene.classList.toggle('active-scene', scene.id === id));
  history.replaceState(null, '', `#${id}`);
}

function travelTo(id) {
  if (isTravelling || !document.getElementById(id)) return;
  isTravelling = true;
  let progress = 0;
  loadNumber.textContent = '0%';
  loadProgress.style.width = '0%';
  loader.classList.add('active');
  const timer = window.setInterval(() => {
    progress = Math.min(progress + 5, 100);
    loadNumber.textContent = `${progress}%`;
    loadProgress.style.width = `${progress}%`;
    if (progress === 100) {
      window.clearInterval(timer);
      window.setTimeout(() => {
        showScene(id);
        loader.classList.remove('active');
        isTravelling = false;
      }, 180);
    }
  }, 52);
}

$('#startMission').addEventListener('click', () => travelTo('growth'));
$$('[data-go]').forEach(button => button.addEventListener('click', () => travelTo(button.dataset.go)));
$('#missionLogo').addEventListener('click', event => { event.preventDefault(); travelTo('home'); });

$('#dayNightToggle').addEventListener('click', () => {
  const scene = $('#growth');
  scene.classList.toggle('night');
  $('#dayNightToggle').innerHTML = scene.classList.contains('night') ? 'Back to Growth Path <span>☀</span>' : 'Enter Night Portfolio <span>✦</span>';
});

$('#careerSign').addEventListener('click', () => $('#careerModal').showModal());
$('#educationButton').addEventListener('click', () => {
  $('#detailContent').innerHTML = `<p class="eyebrow">LEARNING PEAKS</p><h3>Education</h3><article><b>Master of Journalism · The University of Hong Kong</b><p>Sep 2024 – Jun 2025. Student delegate at the 2024/25 Hong Kong Policy Address.</p></article><article><b>Bachelor of Announcing and Anchoring · Soochow University</b><p>Sep 2020 – Jun 2024. First Honours; Triple-A Scholar and multiple academic awards.</p></article><article><b>International learning</b><p>University of Cambridge International Summer Programme and NUS Media Communication &amp; PR Programme.</p></article>`;
  $('#detailModal').showModal();
});

const whispers = {
  creative: ['I like turning ideas into visuals.', 'I enjoy making videos that tell a clear story.', 'Creative details make a message memorable.'],
  help: ['I like helping people find the right answer.', 'Clear replies can make someone’s day easier.', 'I enjoy making information easy to understand.'],
  event: ['I enjoy helping events feel well prepared.', 'I like bringing people and details together.', 'A smooth event starts with thoughtful preparation.']
};
$$('.flower').forEach((flower, index) => { flower.dataset.whisper = whispers[flower.dataset.kind][index % 3]; });

const nightLines = ['“Which story shall we see next?”', '“That star looks bright!”', '“Let’s make the grass dance.”'];
let nightLine = 0;
window.setInterval(() => { nightLine = (nightLine + 1) % nightLines.length; $('#nightChat').textContent = nightLines[nightLine]; }, 3100);

$$('[data-modal]').forEach(button => button.addEventListener('click', () => {
  const dialog = $(`#${button.dataset.modal}`);
  dialog.showModal();
  if (dialog.id === 'interestsModal') dialog.classList.add('page-turn');
}));
$$('.close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));

const clarityText = {
  routine: 'For routine tasks, I work best when the goal, expected result and a simple SOP are clear. For a new challenge, I enjoy testing ideas and helping to build that process.',
  numbers: 'When numbers are very messy, I first organise the information, use a clear guide or checklist, and confirm the expected output before I continue.'
};
$$('[data-cloud]').forEach(cloud => cloud.addEventListener('click', () => {
  cloud.classList.add('revealed');
}));
$('#dryerButton').addEventListener('click', () => {
  const clarity = $('#clarity');
  if (clarity.classList.contains('cleared')) return;
  clarity.classList.add('cleared');
  $('#dryerButton').innerHTML = 'Clear skies ahead ✦';
  $('#clarityMessage').innerHTML = `<article><b>Clear steps</b><p>${clarityText.routine}</p></article><article><b>Clear information</b><p>${clarityText.numbers}</p></article>`;
});

const hash = location.hash.slice(1);
if (hash && document.getElementById(hash)) showScene(hash);
