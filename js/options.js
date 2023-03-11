// Change fonts; this is janky is only works by commenting out body > font-family in bootstrap.css, a very bad solution

var htmlElem = document.querySelector('html');

var fontForm = document.getElementById('font');

if(!localStorage.getItem('font')) {
  populateStorage();
} else {
  setStyles();
}

function populateStorage() {
  localStorage.setItem('font', document.getElementById('font').value);

  setStyles();
}

function setStyles() {
  var currentFont = localStorage.getItem('font');

  document.getElementById('font').value = currentFont;

  htmlElem.style.fontFamily = currentFont;
}

fontForm.onchange = populateStorage;

// Change themes; I don't know how to combine this and fonts so here we are

const setTheme = (theme) => {
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
  }

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  theme && setTheme(theme);
  }

  getTheme();