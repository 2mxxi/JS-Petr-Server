import {getResource} from '../services/services';
function cards(){
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
  
}

export default cards;