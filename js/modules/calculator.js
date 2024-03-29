function calculator(){
  // Calculator
  const result = document.querySelector('.calculating__result span');

  let gender, height = 170, weight = 90, age = 30, ratio;

    if(localStorage.getItem('gender')) {
      gender = localStorage.getItem('gender');
    } else {
      gender = `female`;
      localStorage.setItem('gender', 'female')
    }

    if(localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio')
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375)
    }

  function initLocalSettings(selector, activeClass){
    const elements = document.querySelectorAll(selector);
    elements.forEach(el=>{
      el.classList.remove(activeClass);
      if(el.getAttribute('data-ratio') == localStorage.getItem('ratio')){
        el.classList.add(activeClass);
      }
      if(el.getAttribute('id') === localStorage.getItem('gender')){
        el.classList.add(activeClass);
      }
    })
  }
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal(){
    if(!gender || !height || !weight || !age || !ratio) {
      result.innerHTML = (`____`);
      return;
    }
    
    if(gender === 'female'){
      result.innerHTML = Math.floor((444.6 + 9.2*weight + 3.1*height - 4.3*age) * ratio);
    } else {
      result.innerHTML = Math.floor((88.36 + 13.4*weight + 4.8*height - 5.7*age) * ratio);
    }
  }
  calcTotal()

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector}`);

    elements.forEach(el =>{
      el.addEventListener('click', (event)=>{
        if (event.target.getAttribute('data-ratio')) {
          ratio = +event.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
        } else {
          gender = event.target.getAttribute('id');
          localStorage.setItem('gender', event.target.getAttribute('id'))
        }
  
        console.log(ratio, gender)
  
        elements.forEach(el => {
          el.classList.remove(activeClass);
        });
        event.target.classList.add(activeClass);
        calcTotal();

      })
    })
  }
  getStaticInformation('#gender div', 'calculating__choose-item_active')
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')

  function getDynamicInformation(selector){
    const input = document.querySelector(selector);
    input.addEventListener('input', ()=> {

      if(input.value.match(/\D/g)){
        input.style.border = '2px solid red'
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
            height = +input.value;
            break;
        case 'weight':
            weight = +input.value;
            break;
        case 'age':
            age = +input.value;
            break;
      }
      calcTotal()
    })
  }
  getDynamicInformation('#height')
  getDynamicInformation('#weight')
  getDynamicInformation('#age')
}

export default calculator;