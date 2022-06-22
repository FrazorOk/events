let pinataContainer = document.querySelector('.pinata__slider_container');
let pinataTextContainer = document.querySelector('.pinata__text_container');
let pinataTextFicha = document.querySelector('.pinata-text');
let allButtons = document.querySelectorAll('.pinata button');
let pinataButtonLeft = document.querySelector('.pinata__slider button');
let pinataButtonRight = document.querySelector('.pinata__text_container button');
let indexPinataImg = 0;

// move text block if hover
let stepTextEventListener = (nameElement) => {
   let step = (events, much, padding) => {
      nameElement.addEventListener(`${events}`, () => {
         let pinataText = document.querySelector('.pinata__text');
         pinataText.style.paddingRight = `${padding}px`
         pinataTextContainer.style.left = `${much}%`;
      });
   };
   step(`mouseenter`, `50`, `200`);
   step(`mouseleave`, `40`, `50`);
};
allButtons.forEach(btn => {
   stepTextEventListener(btn);
});
stepTextEventListener(pinataContainer);
stepTextEventListener(pinataTextFicha);

// create new img slider
let createNewImgSlider = (styleLeft) => {
   let newSliderImg = document.createElement(`div`);
   newSliderImg.classList.add(`pinata__slider_img`);
   newSliderImg.style.left = `${styleLeft}%`;
   newSliderImg.style.backgroundImage = `url(${arrayPinata[indexPinataImg]})`;
   newSliderImg.innerHTML = ``;
   pinataContainer.appendChild(newSliderImg);
}

// create first img
createNewImgSlider(0);

// blocked buttons
let blockedButtons = (truFalse) => {
   allButtons.forEach(btn => {
      btn.disabled = truFalse;
   })
}

// step imgs
let stepPinata = (leftMove) => {
   setTimeout(() => {
      let allImgsPinata = document.querySelectorAll(`.pinata__slider_img`);
      allImgsPinata[0].style.left = `${leftMove}%`;
      allImgsPinata[1].style.left = '0%';
   }, 0);
   setTimeout(() => {
      let allImgsPinata = document.querySelectorAll(`.pinata__slider_img`);
      allImgsPinata[0].remove();
      blockedButtons(false);
   }, 600);
}

// event for buttons
pinataButtonLeft.addEventListener(`click`, () => {
   blockedButtons(true);
   if (indexPinataImg > 0) {
      indexPinataImg--;
   } else {
      indexPinataImg = arrayPinata.length - 1;
   };
   createNewImgSlider(-100);
   stepPinata(100);
})

pinataButtonRight.addEventListener(`click`, () => {
   blockedButtons(true)
   if (indexPinataImg < arrayPinata.length - 1) {
      indexPinataImg++;
   } else {
      indexPinataImg = 0;
   };
   createNewImgSlider(100);
   stepPinata(-100);
});