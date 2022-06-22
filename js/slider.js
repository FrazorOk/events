let btnMainSliderLeft = document.querySelector(`.programs__list_btn_left`),
  btnMainSliderRight = document.querySelector(`.programs__list_btn_right`);
let index = 0;

let activeClass = () => {
  let allBtnsPrograms = document.querySelectorAll(`.programs-all-btns span`);
  let allActiveClass = document.querySelector(`.programs__active`);
  if (allActiveClass) {
    allActiveClass.classList.remove(`programs__active`);
  }
  allBtnsPrograms[index].classList.add(`programs__active`);
};
activeClass();

// create new slider
let createNewSlider = (position) => {
  let sliderContainer = document.querySelector(`.programs__slider_container`);
  let newMainSlider = document.createElement(`div`);
  newMainSlider.classList.add(`programs__slider_main_list`);
  newMainSlider.style.left = `${position}%`;

  let header = programsArray[index].name;
  let text = programsArray[index].text;
  let arrayImgsSmollSlider = programsArray[index].img;

  newMainSlider.innerHTML = `
   <div class="programs__slider">
      <div class="programs__slider_img">
         <div class="programs__slider_mini">
            <button class="programs__slider_mini_left"></button>
            <div class="programs__slider_mini_container"></div>
            <button class="programs__slider_mini_right"></button>
         </div>
      </div>
   </div>
   <div class="programs__text_programs">
      <h3  class="animation_title">${header}</h3>
      <p>${text}</p>
   </div>
   `;
  let mainImg = newMainSlider.querySelector(`.programs__slider_img`);
  mainImg.style.backgroundImage = `url(${arrayImgsSmollSlider[0]})`;
  sliderContainer.appendChild(newMainSlider);

  // opasity efect for mainImg
  let opasityEfectForMainImg = (indexImg) => {
    let opasityAfterImageSlider = document.createElement(`div`);
    opasityAfterImageSlider.classList.add(`programs-opacity`);
    opasityAfterImageSlider.style.opacity = `0`;
    mainImg.appendChild(opasityAfterImageSlider);
    setTimeout(() => {
      opasityAfterImageSlider.style.opacity = `1`;
    }, 0);
    setTimeout(() => {
      mainImg.style.backgroundImage = `url(${arrayImgsSmollSlider[indexImg]})`;
      opasityAfterImageSlider.style.opacity = `0`;
    }, 100);
  };

  // active img
  let cativeImgSmallSlider = (stepImg) => {
    let allImgSmallSlider = newMainSlider.querySelectorAll(
      `.programs__slider_mini_img`
    );
    let activeImgSmallSlider = newMainSlider.querySelector(
      `.programs__slider_mini_img_active`
    );
    if (activeImgSmallSlider) {
      activeImgSmallSlider.classList.remove(`programs__slider_mini_img_active`);
    }
    allImgSmallSlider[stepImg].classList.add(
      `programs__slider_mini_img_active`
    );
    allImgSmallSlider[allImgSmallSlider.length - 1].style.marginRight = `0px`;
  };

  // pagination in small slider
  let pagination = () => {
    let containerPagination = newMainSlider.querySelector(
      `.programs__slider_mini_container`
    );
    let indexStepInRow = 0;
    let indexImg = 0;
    let indexRow = 1;
    let maxImgs = 3;

    // create new img list
    let createImg = (array) => {
      let newImgSmallSlider = document.createElement(`div`);
      newImgSmallSlider.innerHTML = ``;
      newImgSmallSlider.classList.add(`programs__slider_mini_img`);
      newImgSmallSlider.style.backgroundImage = `url(${array})`;
      containerPagination.appendChild(newImgSmallSlider);

      // event for imgs
      newImgSmallSlider.addEventListener(`click`, (e) => {
        e.stopPropagation();
        let allImgsSmallSlider = document.querySelectorAll(
          `.programs__slider_mini_img`
        );
        for (i = 0; i < allImgsSmallSlider.length; i++) {
          if (e.target == allImgsSmallSlider[i]) {
            let newIndex = indexStepInRow;
            if (indexStepInRow < i) {
              let sumIndex = i - newIndex;
              indexStepInRow = i;
              indexImg += sumIndex;
              opasityEfectForMainImg(indexImg);
              cativeImgSmallSlider(indexStepInRow);
            } else if (indexStepInRow > i) {
              let sumIndex = newIndex - i;
              indexStepInRow = i;
              indexImg += -sumIndex;
              opasityEfectForMainImg(indexImg);
              cativeImgSmallSlider(indexStepInRow);
            }
          }
        }
      });
    };

    // first img slider
    let firstArraySmallSlider = arrayImgsSmollSlider.slice(0, maxImgs);
    for (i = 0; i < firstArraySmallSlider.length; i++) {
      let usedImg = firstArraySmallSlider[i];
      createImg(usedImg);
    }
    cativeImgSmallSlider(0);

    // event for btns small slider
    programsSliderMiniLeft = newMainSlider.querySelector(
      `.programs__slider_mini_left`
    );
    programsSliderMiniRight = newMainSlider.querySelector(
      `.programs__slider_mini_right`
    );

    programsSliderMiniLeft.addEventListener('click', (event) => {
      event.stopPropagation();
      if (indexImg > 0) {
        indexImg--;
        indexStepInRow--;
        if (indexStepInRow === -1) {
          opasityEfectForMainImg(indexImg);
          indexRow--;
          indexStepInRow = maxImgs - 1;

          let lastNum = indexRow * maxImgs;
          let firstNum = lastNum - maxImgs;
          let arrayNewSmallSlider = arrayImgsSmollSlider.slice(
            firstNum,
            lastNum
          );

          containerPagination.innerHTML = ``;
          for (i = 0; i < arrayNewSmallSlider.length; i++) {
            let usedNewImg = arrayNewSmallSlider[i];
            createImg(usedNewImg);
          }
          cativeImgSmallSlider(indexStepInRow);
        } else {
          opasityEfectForMainImg(indexImg);
          cativeImgSmallSlider(indexStepInRow);
        }
      } else {
        indexImg = arrayImgsSmollSlider.length - 1;
        if (maxImgs < arrayImgsSmollSlider.length) {
          indexRow = Math.ceil(arrayImgsSmollSlider.length / maxImgs);
          indexImg = arrayImgsSmollSlider.length - 1;

          let lastNum = indexRow * maxImgs;
          let firstNum = lastNum - maxImgs;
          let arrayNewSmallSlider = arrayImgsSmollSlider.slice(
            firstNum,
            lastNum
          );

          indexStepInRow = arrayNewSmallSlider.length - 1;
          containerPagination.innerHTML = ``;
          for (i = 0; i < arrayNewSmallSlider.length; i++) {
            let usedNewImg = arrayNewSmallSlider[i];
            createImg(usedNewImg);
          }
          opasityEfectForMainImg(indexImg);
          cativeImgSmallSlider(indexStepInRow);
        } else {
          indexStepInRow = indexImg;
          opasityEfectForMainImg(indexImg);
          cativeImgSmallSlider(indexStepInRow);
        }
      }
    });

    programsSliderMiniRight.addEventListener('click', stepRight);

    function stepRight(event) {
      event.stopPropagation();
      if (indexImg < arrayImgsSmollSlider.length - 1) {
        indexImg++;
        indexStepInRow++;
        if (indexStepInRow === 3) {
          opasityEfectForMainImg(indexImg);
          indexRow++;
          indexStepInRow = 0;

          let lastNum = indexRow * maxImgs;
          let firstNum = lastNum - maxImgs;
          let arrayNewSmallSlider = arrayImgsSmollSlider.slice(
            firstNum,
            lastNum
          );

          containerPagination.innerHTML = ``;
          for (i = 0; i < arrayNewSmallSlider.length; i++) {
            let usedNewImg = arrayNewSmallSlider[i];
            createImg(usedNewImg);
          }
          cativeImgSmallSlider(indexStepInRow);
        } else {
          opasityEfectForMainImg(indexImg);
          cativeImgSmallSlider(indexStepInRow);
        }
      } else {
        indexStepInRow = 0;
        indexImg = 0;

        if (indexRow > 1) {
          indexRow = 1;
          opasityEfectForMainImg(indexImg);
          let arrayNewSmallSlider = arrayImgsSmollSlider.slice(0, maxImgs);

          containerPagination.innerHTML = ``;
          for (i = 0; i < arrayNewSmallSlider.length; i++) {
            let usedNewImg = arrayNewSmallSlider[i];
            createImg(usedNewImg);
          }
          cativeImgSmallSlider(indexStepInRow);
        } else {
          opasityEfectForMainImg(indexImg);
          cativeImgSmallSlider(indexStepInRow);
        }
      }
    }

    // event for main img
    let bestImg = newMainSlider.querySelector(`.programs__slider_img`);
    bestImg.addEventListener(`click`, stepRight);

    let programSliderMini = newMainSlider.querySelector(
      `.programs__slider_mini`
    );
    programSliderMini.addEventListener(`click`, (event) => {
      event.stopPropagation();
    });
  };
  pagination();
};
createNewSlider(0);

// event for btn left
btnMainSliderLeft.addEventListener('click', () => {
  btnMainSliderRight.disabled = true;
  btnMainSliderLeft.disabled = true;

  if (index === 0) {
    index = programsArray.length - 1;
  } else {
    index--;
  }
  createNewSlider(-100);
  moveLeft();
});

// move left
let moveLeft = () => {
  deleteListener();
  let allMainSliders = document.querySelectorAll(`.programs__slider_main_list`);
  setTimeout(() => {
    allMainSliders[0].style.left = `100%`;
    allMainSliders[1].style.left = `0%`;
  }, 100);
  setTimeout(() => {
    allMainSliders[0].remove();
    btnMainSliderRight.disabled = false;
    btnMainSliderLeft.disabled = false;

    let allBtnsPrograms = document.querySelectorAll(`.programs-all-btns span`);
    allBtnsPrograms.forEach((btn, indexBtn) => {
      btn.addEventListener(`click`, eventFunction);
    });
  }, 900);
};

// event for btn right
btnMainSliderRight.addEventListener('click', () => {
  btnMainSliderRight.disabled = true;
  btnMainSliderLeft.disabled = true;
  if (index == programsArray.length - 1) {
    index = 0;
  } else {
    index++;
  }
  createNewSlider(100);
  activeClass();
  moveRight();
});

// move right
let moveRight = () => {
  deleteListener();
  let allMainSliders = document.querySelectorAll(`.programs__slider_main_list`);
  setTimeout(() => {
    allMainSliders[0].style.left = `-100%`;
    allMainSliders[1].style.left = `0%`;
  }, 100);
  setTimeout(() => {
    allMainSliders[0].remove();
    btnMainSliderRight.disabled = false;
    btnMainSliderLeft.disabled = false;

    let allBtnsPrograms = document.querySelectorAll(`.programs-all-btns span`);
    allBtnsPrograms.forEach((btn, indexBtn) => {
      btn.addEventListener(`click`, eventFunction);
    });
  }, 900);
};

let eventFunction = (e) => {
  for (i = 0; i < allBtnsPrograms.length; i++) {
    if (e.target === allBtnsPrograms[i]) {
      let num = index;
      index = i;
      activeClass();
      if (num < index) {
        createNewSlider(100);
        moveRight();
      }
      if (num > index) {
        createNewSlider(-100);
        moveLeft();
      }
    }
  }
};

let deleteListener = () => {
  let allBtnsPrograms1 = document.querySelectorAll(`.programs-all-btns span`);
  allBtnsPrograms1.forEach((item) => {
    item.removeEventListener(`click`, eventFunction);
  });
};

// event for programs btns

let allBtnsPrograms = document.querySelectorAll(`.programs-all-btns span`);
allBtnsPrograms.forEach((btn, indexBtn) => {
  btn.addEventListener(`click`, eventFunction);
});
