import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button');
const input = document.querySelector('#datetime-picker');
let intervalId = null;
// оголошуємо змінну в якій зберігається вибрана в календарі дата
// Об`єкт налаштувань flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // перевіряємо змінну на валідність
    if (selectedDates[0] < Date.now()) {
      iziToast.show({
        title: 'Alert',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        color: 'red',
      });
      startBtn.setAttribute('disabled', 'disabled');
    } else {
      startBtn.removeAttribute('disabled');
      // записуємо обрану дату в змінну
      // userSelectedDate = selectedDates[0];
    }
  },
};

const userSelectedDate = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  let diffBetweenDate =
    userSelectedDate.selectedDates[0].getTime() - Date.now();

  countdown(diffBetweenDate);

  startBtn.setAttribute('disabled', 'disabled');
  input.setAttribute('disabled', 'disabled');
});

// Функція відліку та виводу часу
function countdown(diffBetweenDate) {
  intervalId = setInterval(() => {
    // Змінна для зберігання різниці часу між обраною датою і поточною
    const timeLeft = convertMs(diffBetweenDate);

    // Зупиняємо функцію якщо таймер скінчився
    if (diffBetweenDate <= 0) {
      input.removeAttribute('disabled');
      clearInterval(intervalId);
      diffBetweenDate = 0;

      return;
    }
    const days = document.querySelector('.value[data-days]');
    const hours = document.querySelector('.value[data-hours]');
    const minutes = document.querySelector('.value[data-minutes]');
    const seconds = document.querySelector('.value[data-seconds]');
    // Виводимо дані у відповідні поля на сторінці
    days.innerHTML = addZero(timeLeft.days);
    hours.innerHTML = addZero(timeLeft.hours);
    minutes.innerHTML = addZero(timeLeft.minutes);
    seconds.innerHTML = addZero(timeLeft.seconds);
    // Віднімаємо від різниці у часі, для реалізації в таймері зменншення часу, відлік
    diffBetweenDate -= 1000;
  }, 1000);
}

// Функція перетворення різниці в часу між обраною датою і поточною з мілісекунд в дні,години,хвилини та секунди
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// Функція додавання 0 у відображенні на сторінці
function addZero(str) {
  return String(str).padStart(2, '0');
}