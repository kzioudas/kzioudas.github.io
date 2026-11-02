const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const preferredTheme = window.matchMedia('(prefers-color-scheme: light)');
let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be disabled. */ }
function setTheme(light) {
  root.classList.toggle('light-theme', light);
  if (themeToggle) {
    themeToggle.textContent = light ? 'Dark theme' : 'Light theme';
    themeToggle.setAttribute('aria-pressed', String(light));
  }
}
setTheme(savedTheme ? savedTheme === 'light' : preferredTheme.matches);
themeToggle?.addEventListener('click', () => {
  const light = !root.classList.contains('light-theme');
  setTheme(light);
  savedTheme = light ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', savedTheme); } catch { /* Keep the session preference. */ }
});
preferredTheme.addEventListener('change', event => { if (!savedTheme) setTheme(event.matches); });

const menuButton = document.querySelector('.burger-icon');
const navigation = document.getElementById('navigation');
if (menuButton && navigation) {
const mobile = window.matchMedia('(max-width: 900px)');
function setMenu(open) {
  navigation.hidden = mobile.matches && !open;
  menuButton.setAttribute('aria-expanded', String(open));
}
setMenu(false);
mobile.addEventListener('change', () => setMenu(false));
menuButton.addEventListener('click', () => setMenu(navigation.hidden));
navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && !navigation.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});

}

const dialog = document.getElementById('skillProjects');
if (dialog) {
const projectsList = dialog.querySelector('.projects-list');
const projects = [...document.querySelectorAll('.project')];
projects.forEach((project, index) => { project.id = `project-${index + 1}`; });
const normalize = text => text.trim().toLowerCase().replace(/\s*\([^)]*\)/g, '');
document.querySelectorAll('.skill').forEach(skill => {
  const matches = projects.filter(project => {
    const text = project.querySelector('.project-skills')?.textContent || '';
    return text.replace(/^\s*Skills:\s*/, '').split('·').some(item => normalize(item) === normalize(skill.dataset.skill));
  });
  if (!matches.length) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'skill';
  button.textContent = skill.textContent;
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-label', `${skill.textContent}: view matching projects`);
  skill.replaceWith(button);
  button.addEventListener('click', () => {
    projectsList.replaceChildren();
    dialog.querySelector('h2').textContent = `${button.textContent} — matching projects`;
    matches.forEach(project => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${project.id}`;
      link.textContent = project.querySelector('h3').textContent;
      link.addEventListener('click', () => {
        dialog.close();
        project.tabIndex = -1;
        project.focus();
      });
      item.append(link);
      projectsList.append(item);
    });
    dialog.showModal();
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});

}
