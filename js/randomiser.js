const imageArray = [
  'images/jumbotron/borobudur-relief.avif',
  'images/jumbotron/plants.avif',
  'images/jumbotron/venice-gull.avif',
  'images/jumbotron/wave.avif',
  'images/jumbotron/colosseum.avif',
  'images/jumbotron/forest.avif',
  'images/jumbotron/mountain.avif',
  'images/jumbotron/supri-walk.avif',
  'images/jumbotron/swimming-with-whale-shark.avif',
  'images/jumbotron/wave-crash.avif',
  'images/jumbotron/wave-crash-closeup.avif'
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
  document.querySelectorAll('.jumbotron h1, .navbar-brand').forEach(el => {
    el.classList.add(randFont);
  });

  const img = new Image();

  img.onload = function () {
    const jumbotron = document.getElementById('jumbotron');
    if (jumbotron) {
      jumbotron.style.background = `url(${randPath}) center center fixed no-repeat`;
      jumbotron.style.backgroundSize = 'cover';
    }
    const footer = document.getElementById('img-footer');
    if (footer) {
      footer.style.background = `url(${randPath}) center center no-repeat`;
    }
  };

  img.src = randPath;

});