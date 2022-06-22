let animItems = document.querySelectorAll(`._anim-items`);

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
         let animItem = animItems[index];
         let animItemHeight = animItem.offsetHeight;
         let animItemOffset = offset(animItem).top;
         let animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active');
         } else {
            if (!animItem.classList.contains('_anim-no-hide')) {
               animItem.classList.remove('_active');
            }
         }
      }
   }
}
let offset = (el) => {
   let rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

animOnScroll()