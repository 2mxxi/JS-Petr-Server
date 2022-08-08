function timer(id, deadline){
  // Timer

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

  setClock(id, deadline);
 
}

export default timer;