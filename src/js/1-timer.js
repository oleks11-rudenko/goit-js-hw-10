import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");
startButton.disabled = true;
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

startButton.addEventListener("click", startTimer);

function startTimer() {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  const intervalId = setInterval(() => {
    const timeLeft = userSelectedDate - Date.now();
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      datetimePicker.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    dataDays.textContent = String(days).padStart(2, "0");
    dataHours.textContent = String(hours).padStart(2, "0");
    dataMinutes.textContent = String(minutes).padStart(2, "0");
    dataSeconds.textContent = String(seconds).padStart(2, "0");
  }, 1000);
}

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.error({
        title: "Error",
        titleColor: "#FFFFFF",
        message: "Please choose a date in the future",
        messageColor: "#FFFFFF",
        backgroundColor: "#EF4040",
        iconUrl: "../img/octagon.svg",
        position: "topRight",
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
