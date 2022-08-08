function slider({slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}){
  // Slider

  // const sliderWrapper = document.querySelector('.offer__slider'),
  //       navPrev = sliderWrapper.querySelector('.offer__slider-prev'),
  //       navNext = sliderWrapper.querySelector('.offer__slider-next'),
  //       totalSlideNum = sliderWrapper.querySelector('#total'),
  //       slide = sliderWrapper.getElementsByClassName('offer__slide');
  //   let curSlideNum = sliderWrapper.querySelector('#current');

  // function totalSlide(){
  //   if(slide.length <= 9){
  //     totalSlideNum.innerHTML = `0${slide.length}`;
  //   } else {
  //     totalSlideNum.innerHTML = `${slide.length}`;
  //   }
  // }
  // totalSlide()

  // function hideSlides(){
  //   [...slide].forEach(el => {
  //     el.style.cssText = 'display: none';
  //   });
  // }
  // hideSlides()

  // let ind = 0;

  // function showSlide(ind){
  //   slide[ind].style.cssText = 'display: block';
  //   slide[ind].classList.add('fade')
  // }
  // showSlide(ind)

  // navNext.addEventListener('click', () => {
  //   hideSlides()
  //   if(ind < (slide.length - 1)){
  //     showSlide(ind += 1)
  //   } else {
  //     showSlide(ind = 0)
  //   }
  //   currentNumber(ind)
  //   console.log(ind)
  // })
  
  // navPrev.addEventListener('click', () => {
  //   hideSlides()
  //   if(ind > 0){
  //     showSlide(ind -= 1)
  //   } else {
  //     showSlide(ind = (slide.length-1))
  //   }
  //   currentNumber(ind)
  //   console.log(ind)
  // })

  // function currentNumber(ind){
  //   if(ind <=9){
  //     curSlideNum.innerHTML = `0${ind+1}`;
  //   } else {
  //     curSlideNum.innerHTML = `${ind+1}`;
  //   }
  // }
  // currentNumber(ind);


// PRO Slider (предварительно в html создается еще 1 wrapper'.offer__slider-inner' для слайдера)

const slides = document.querySelectorAll(slide),
      prev = document.querySelector(prewArrow),
      next = document.querySelector(nextArrow),
      total = document.querySelector(totalCounter),
      current = document.querySelector(currentCounter),
      slidesWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
      width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
      offset = 0;

  function statusSlide(){
    if(slides.length <= 9){
      total.innerHTML = `0${slides.length}`;
      current.innerHTML = `0${slideIndex}`;
    } else {
      total.innerHTML = `${slides.length}`;
      current.innerHTML = `${slideIndex}`;
    }
  }
    statusSlide()

  slidesWrapper.style.overflow = 'hidden';
  slidesField.style.width = 100 * slides.length + '%'; // ширина n раз по 100%, чтобы уместить все слайды в строку
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slides.forEach(slide=>{
    slide.style.width = width
  })
  

  next.addEventListener('click', () => {
    if(offset == +width.replace(/\D/g,'') * (slides.length - 1)){
      offset = 0;
    } else {
      offset += +width.replace(/\D/g,'')
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1
    } else {
      slideIndex ++;
    }

    statusSlide();
    removeActive();
    dotList[slideIndex-1].classList.add('dot__active')
  });

  prev.addEventListener('click', () => {
    if(offset == 0){
      offset = +width.replace(/\D/g,'') * (slides.length - 1)
    } else {
      offset -= +width.replace(/\D/g,'')
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length
    } else {
      slideIndex --;
    }

    statusSlide();
    removeActive();
    dotList[slideIndex-1].classList.add('dot__active')
  });


  // Slider-navigation

  const sliderContainer = document.querySelector('.offer__slider'),
        navContainer = document.createElement('div'),
        dotList = document.getElementsByClassName('dot');
  
  sliderContainer.style.position = 'relative';

  navContainer.classList.add('nav-container');

  sliderContainer.appendChild(navContainer);

  navContainer.style.cssText = 'height: 30px; width: 180px; display: flex; justify-content: center; align-items: center; margin: 0 auto';
  
  let n = 1;
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot', `${n}`);
    navContainer.append(dot);
    n++;
  }

  function removeActive(){
    [...dotList].forEach(el => {
      el.classList.remove('dot__active')
    });
  }

  navContainer.addEventListener('click', ()=>{
    const target = event.target;
    if(target && target.classList.contains('dot')){
      slidesField.style.transform = `translateX(-${+width.replace(/\D/g,'') * (target.classList[1]-1)}px)`;
      current.innerHTML = `0${target.classList[1]}`;
      removeActive();
      target.classList.add('dot__active')
    }
  })

  dotList[slideIndex-1].classList.add('dot__active')

}

export default slider;