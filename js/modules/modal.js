function openModal(modalSelector, modalTimerId){
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'block';
  modal.classList.add('fade');
  document.body.style.overflow = 'hidden';

  console.log(modalTimerId)
  if(modalTimerId){
    clearInterval(modalTimerId);
  }
  
}

function closeModal(modalSelector){
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId){
  //Modal

  const trigger = document.getElementsByClassName(triggerSelector),
        // close = document.querySelector('.modal__close'),
        modal = document.querySelector(modalSelector);

  [...trigger].forEach(el => {
    el.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  })

  modal.addEventListener('click', (event)=>{                 //Если клик по затемненноый области, закрыть окно
    if(event.target === modal || event.target.getAttribute('data-close') == ''){
      closeModal(modalSelector);
    }
  })

  document.addEventListener('keydown', (event)=>{                        //Закрытие по нажати Esc 
    if(event.code === 'Escape' && modal.style.display === 'block'){     //Проверяем, нажат ли esc и откыто ли сейчас окно
      closeModal(modalSelector)
    }
  })
 
  // window.pageYOffset + document.documentElement.clientHeight    //Высота прокрученной части и высота клиента(окна)
  // document.documentElement.scrollHeight    //Полная высота

  function shiwModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', shiwModalByScroll);
     }
  }


  window.addEventListener('scroll', shiwModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};
