// navigation bar fixed
addEventListener(`scroll`, () => {
   let navigation = document.querySelector(`.navigation`);
   let windwPosition = window.pageYOffset;
   if (windwPosition === 0) {
      navigation.classList.remove(`navigation__fixed`);
   }
   if (windwPosition > 40) {
      navigation.classList.add(`navigation__fixed`);
   }
});

// navigation scroll

let scrollTo = (element) => {
   window.scroll({
      left: 0,
      top: element.offsetTop,
      behavior: `smooth`,
   })
}

// all containers
let aboutMeContainer1 = document.querySelector('.about_me');
let programsContainer1 = document.querySelector('.programs');
let pinataContainer1 = document.querySelector('.pinata');
let reviewsContainer1 = document.querySelector('.reviews');
let footerContainer1 = document.querySelector('.footer');

let aboutMeBtn = document.querySelector('.header__btn_about_me');
aboutMeBtn.addEventListener('click', () => {
   scrollTo(aboutMeContainer1);
})

let allNavigationLi = document.querySelectorAll('.navigation li');
allNavigationLi.forEach((item, index) => {
   item.addEventListener('click', () => {
      if (index === 0) {
         scrollTo(aboutMeContainer1);
      } else if (index === 1) {
         scrollTo(programsContainer1);
      } else if (index === 2) {
         scrollTo(pinataContainer1);
      } else if (index === 3) {
         scrollTo(reviewsContainer1);
      } else {
         scrollTo(footerContainer1);
      }
   })
});

let allFooterLi = document.querySelectorAll('.footer__navigation li');
allFooterLi.forEach((item, index) => {
   item.addEventListener('click', () => {
      if (index === 0) {
         scrollTo(aboutMeContainer1);
      } else if (index === 1) {
         scrollTo(programsContainer1);
      } else if (index === 2) {
         scrollTo(pinataContainer1);
      } else if (index === 3) {
         scrollTo(reviewsContainer1);
      } else {
         scrollTo(footerContainer1);
      }
   })
})

// parallax
let rellax = new Rellax('.rellax');


for (i = 1; i <= 24; i++) {
   let parallaxInstance = new Parallax(document.getElementById(`scene${i}`));
}
