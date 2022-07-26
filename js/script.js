"use strict";

window.addEventListener("DOMContentLoaded", function(){

  // Tabs

  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((el) => {
      el.classList.add('hide');
      el.classList.remove('show', 'fade');
    });

    tabs.forEach((el) => {
      el.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(ind = 0) {
    tabsContent[ind].classList.add('show', 'fade');
    tabsContent[ind].classList.remove('hide');
    tabs[ind].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i)=>{
        if(target == item){
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })

  // Timer

  const deadline = '2022-07-10';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),         //От дедлайна отнимаем текущую дату и вр. получаем к-во времени в миллисек.
          days = Math.floor( t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(( t / (1000 * 60 * 60) % 24)),           //Общее к-во часов делим на 24 и получаем остаток от деления(остаток, которого не хватает до полных суток) - т.к. к-во часов может быть больше 24, -> нужно считать уже за 1 день.
          minutes = Math.floor(( t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);
    return {                                                         //Возвращаем объект
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function getZero(num) {                                            //Проверка значений в таймере и подстановка "0" спереди, если число меньше 10.
    if (num >= 0 && num <10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {                         //selector - будем передавать форму таймера со страницы
    const timer = document.querySelector(selector),              //создаем переменные, в которые будем помещать элементы со страницы
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updatedClock, 1000);         //Обновление функции updatedClock() каждую секунду

    updatedClock();                                               //Запускаем функцию updatedClock(), чтобы не ждать первую секунду до обновления

    function updatedClock() {
      const t = getTimeRemaining(endtime);                       //Расчет времени на текущую секунду

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if(t.total <= 0) {                                         //Если количество оставшихся миллисекунд до акции 0 или меньше 0, остановить обновление ф-ии и сбросит значения по 0
        clearInterval(timeInterval);
        days.innerHTML = 0;
        hours.innerHTML = 0;
        minutes.innerHTML = 0;
        seconds.innerHTML = 0;
      }
    };

  };

  setClock('.timer', deadline);

  //Modal

  // const trigger = document.getElementsByClassName('open'),
  //       // close = document.querySelector('.modal__close'),
  //       modal = document.querySelector('.modal');

  // function openModal(){
  //   modal.style.display = 'block';
  //   modal.classList.add('fade');
  //   document.body.style.overflow = 'hidden';
  //   clearInterval(modalTimerId);
  // }

  // [...trigger].forEach(el => {
  //   el.addEventListener('click', openModal);
  // })

  // function closeModal(){
  //   modal.style.display = 'none';
  //   document.body.style.overflow = '';
  // }

  // modal.addEventListener('click', (event)=>{                 //Если клик по затемненноый области, закрыть окно
  //   if(event.target === modal || event.target.getAttribute('data-close') == ''){
  //     closeModal();
  //   }
  // })

  // document.addEventListener('keydown', (event)=>{                        //Закрытие по нажати Esc 
  //   if(event.code === 'Escape' && modal.style.display === 'block'){     //Проверяем, нажат ли esc и откыто ли сейчас окно
  //     closeModal()
  //   }
  // })

  // const modalTimerId = setTimeout(openModal, 5000)

  // // window.pageYOffset + document.documentElement.clientHeight    //Высота прокрученной части и высота клиента(окна)
  // // document.documentElement.scrollHeight    //Полная высота

  // function shiwModalByScroll(){
  //   if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
  //     openModal();
  //     window.removeEventListener('scroll', shiwModalByScroll);
  //    }
  // }


  // window.addEventListener('scroll', shiwModalByScroll);

  // Классы для карточек

  const menuWrapper = document.querySelector('.menu__field');
  const menuContainer = menuWrapper.querySelector('.container')


  class Card {
    constructor(img, heading, text, alttext, price, parentSelector, ...classes){
      this.img = img;
      this.heading = heading;
      this.text = text;
      this.price = price;
      this.alttext = alttext;
      this.usdRurcourse = 60;
      this.currencyConvert();
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
    }
    // addCard(){
    // menuContainer.insertAdjacentHTML('afterbegin', `<div class="menu__item ${this.classes}"><img src="${this.img}" alt="${this.alttext}"><h3 class="menu__item-subtitle">${this.heading}</h3><div class="menu__item-descr">${this.text}</div><div class="menu__item-divider"></div><div class="menu__item-price"><div class="menu__item-cost">Цена:</div><div class="menu__item-total"><span>${this.price}</span> руб./день</div></div></div>`);
    // }
    // или
    addCard(){
      const element = document.createElement('div');
      if(this.classes.length === 0){
        this.element = `menu__item`;
        element.classList.add(this.element);
      } else {
        this.classes.forEach(newClass => element.classList.add(newClass))
      }

      element.innerHTML = `<img src="${this.img}" alt="${this.alttext}"><h3 class="menu__item-subtitle">${this.heading}</h3><div class="menu__item-descr">${this.text}</div><div class="menu__item-divider"></div><div class="menu__item-price"><div class="menu__item-cost">Цена:</div><div class="menu__item-total"><span>${this.price}</span> руб./день</div></div>`
      this.parent.append(element)
    }
    currencyConvert(){
      this.price = this.price * this.usdRurcourse;
    }
  }


  // const cardMeatless = new Card('img/tabs/post.jpg', 'Меню Постное', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 'Меню Постное', 8)
  // cardMeatless.addCard()
  // const cardPremium = new Card('img/tabs/elite.jpg', 'Меню “Премиум“', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 'Меню Премиум', 10)
  // cardPremium.addCard()
  // const cardFitness = new Card('img/tabs/vegy.jpg', 'Меню “Фитнес“', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!','Меню Фитнес', 6)
  // cardFitness.addCard()

  // или

  const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok){
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  // 1 вариант с шаблонизацией
  // getResource('http://localhost:3000/menu')
  //   .then(data => {
      // data.forEach(({img, altimg, title, descr, price}) => {
      //   new Card(img, title, descr, altimg, price, '.menu .container').addCard();
      // })
  //   })

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => {
        new Card(img, title, descr, altimg, price, '.menu .container').addCard();
      })
    })

  // 2 вариант (если нужно построить элементы на странице 1 раз)
  // getResource('http://localhost:3000/menu')
  //   .then(data => createCard(data));

  // function createCard(data) {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     const element = document.createElement('div');

  //     element.classList.add('menu__item');

  //     element.innerHTML = `<img src="${img}" alt="${altimg}"><h3 class="menu__item-subtitle">${title}</h3><div class="menu__item-descr">${descr}</div><div class="menu__item-divider"></div><div class="menu__item-price"><div class="menu__item-cost">Цена:</div><div class="menu__item-total"><span>${price}</span> руб./день</div></div>`;
  //     document.querySelector('.menu .container').append(element);
  //   })
  // }

  // new Card('img/tabs/post.jpg', 'Меню Постное', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 'Меню Постное', 8, '.menu .container', 'menu__item').addCard()
  // new Card('img/tabs/elite.jpg', 'Меню “Премиум“', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 'Меню Премиум', 10,'.menu .container', 'menu__item').addCard()
  // new Card('img/tabs/vegy.jpg', 'Меню “Фитнес“', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!','Меню Фитнес', 6, '.menu .container', 'menu__item').addCard()

  //Forms

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы свяжемся с вами в ближайшее время',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: data
    });

    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener('submit', (event)=>{
      event.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `display: block; margin: 0 auto`
      form.insertAdjacentElement('afterend', statusMessage);

      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then(data => {
          console.log(data);
          showThaksModal(message.success);
          statusMessage.remove();
      }).catch(() => {
        showThaksModal(message.failure);
      }).finally(() => {
        form.reset();
      })

      // request.addEventListener('load', ()=>{
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThaksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThaksModal(message.failure);
      //   }
      // })
    })
  }

  function showThaksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `<div class="modal__content"><div class="modal__close" data-close>×</div><div class="modal__title">${message}</div></div>`;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(()=>{
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000)
  }

  // fetch('https://jsonplaceholder.typicode.com/posts', {
  //   method: "POST",
  //   body: JSON.stringify({name:'Alex'}),
  //   headers: {
  //     'Content-type': 'application/json'
  //   }
  // })
  // .then(response => response.json())
  // .then(json => console.log(json));

  // Пример

  // fetch('server.php', {                     //Куда отправляем запрос?
  //   method: "POST",                         //Каким образом и что делаем в запросе?
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  //   body: formData                          //Что именно отправляем? 
  // }).then(data => {                            //Что делать с данными(data), которые вернул сервер, в случае успешного исхода нашего запроса
  // }).catch(()=>{                               //Что делать в случае ошибки
  // }).finally(()=>{                             //Действия, которые выполняются всегда, вне зависимости от результатов выполнения запроса.
  // })

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

const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
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
    if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2)
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1
    } else {
      slideIndex ++;
    }

    statusSlide()
  });

  prev.addEventListener('click', () => {
    if(offset == 0){
      offset = +width.slice(0, width.length - 2) * (slides.length - 1)
    } else {
      offset -= +width.slice(0, width.length - 2)
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length
    } else {
      slideIndex --;
    }

    statusSlide()
  }); 

});
