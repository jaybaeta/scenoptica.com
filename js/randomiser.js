const imageArray = [
  'images/jumbotron/borobudur-relief.jpg',
  'images/jumbotron/plants.jpg',
  'images/jumbotron/venice-gull.jpg',
  'images/jumbotron/wave.jpg',
  'images/jumbotron/mirror.jpg',
  'images/jumbotron/colosseum.jpg',
  'images/jumbotron/forest.jpg',
  'images/jumbotron/mountain.jpg',
  'images/jumbotron/supri-walk.jpg',
  'images/jumbotron/swimming-with-whale-shark.jpg',
  'images/jumbotron/wave-crash.jpg',
  'images/jumbotron/wave-crash-closeup.jpg'
];

const fontClasses = [
  'font-atlas-regular',
  'font-deliria-nouveau',
  'font-genzsch-et-heyse-regular',
  'font-hazelnut-pro-black',
  'font-isidora-light',
  'font-le-Havre-layers-primary',
  'font-macaronisans-regular',
  'font-mazzard-soft-m-light',
  'font-sangu',
  'font-vendura-semibold'
];

const randPath = imageArray[Math.floor(Math.random() * imageArray.length)];
const randFont = fontClasses[Math.floor(Math.random() * fontClasses.length)];

document.addEventListener('DOMContentLoaded', function () {
  const jumbotron = document.getElementById('jumbotron');
  if (jumbotron) {
      jumbotron.style.background = `url(${randPath}) center center fixed no-repeat`;
      jumbotron.style.backgroundSize = 'cover';
  }

  const footer = document.getElementById('img-footer');
  if (footer) {
      footer.style.background = `url(${randPath}) center center no-repeat`;
  }

  document.querySelectorAll('.jumbotron h1, .navbar-brand').forEach(el => {
    el.classList.add(randFont);
  });
});