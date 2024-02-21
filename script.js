const skills = document.querySelectorAll('.skill');
const skillProjectsWindow = document.getElementById('skillProjects');
const projectsList = document.querySelector('.projects-list');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
// Get a reference to the header element
const header = document.querySelector('.header');





document.addEventListener("DOMContentLoaded", function () {
    const burgerIcon = document.querySelector(".burger-icon");
    const navbarList = document.querySelector(".navbar-list");
    var sections = document.querySelectorAll('.box');

    function checkPosition() {
      sections.forEach(function (section, index) {
        var position = section.getBoundingClientRect();
  
        // If the top of the section is within the viewport
        if (position.top < window.innerHeight) {
          // Add the appropriate class based on the section's index
          if (index % 2 === 0) {
            section.classList.add('left');
          } else {
            section.classList.add('right');
          }
        }
      });
    }
  
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);
  
    // Initial check
    checkPosition();
    burgerIcon.addEventListener("click", function () {
      navbarList.classList.toggle("active");
    });
});
themeToggle.addEventListener('click', () => {
    if (root.classList.contains('light-theme')) {
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
    }
});
skills.forEach(skill => {
  skill.addEventListener('mouseenter', () => {
    const matchingProjects = getMatchingProjects(skill.dataset.skill);
    populateProjectsList(matchingProjects);
    skillProjectsWindow.style.display = 'flex';
  });

  skill.addEventListener('mouseleave', () => {
    skillProjectsWindow.style.display = 'none';
    projectsList.innerHTML = '';
  });
});

function getMatchingProjects(skill) {
    const matchingProjects = [];
  
    // Get all project skill elements
    const projectSkills = document.querySelectorAll('.project-skills');
  
    // Loop through each project skill element
    projectSkills.forEach(projectSkill => {
      const projectSkillText = projectSkill.textContent;
  
      // Check if the project skill contains the desired skill
      if (projectSkillText.includes(skill)) {
        const project = {
          title: projectSkill.closest('.project').querySelector('.project-title').textContent,
        };
        matchingProjects.push(project);
      }
    });
  
    return matchingProjects;
  }

function populateProjectsList(projects) {
  projectsList.innerHTML = '';
  projects.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.classList.add('projects-list-item');
    projectItem.textContent = `${project.title} `;
    projectsList.appendChild(projectItem);
  });
}