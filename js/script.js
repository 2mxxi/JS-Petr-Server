"use strict";

import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calculator from './modules/calculator';
import {openModal} from './modules/modal';

window.addEventListener("DOMContentLoaded", function(){

  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000)

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2022-10-14');
  slider({
    slide:'.offer__slide',
    nextArrow:'.offer__slider-next',
    prewArrow:'.offer__slider-prev',
    totalCounter:'#total',
    currentCounter:'#current',
    wrapper:'.offer__slider-wrapper',
    field:'.offer__slider-inner'
  });
  modal('open', '.modal', modalTimerId);
  forms('form', modalTimerId, );
  cards();
  calculator();

});

