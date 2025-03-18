import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let intervalId;
const dataPicker = document.querySelector("#datetime-picker");
const btn = document.querySelector("button[data-start]");
btn.disabled = true;
const dataDays = document.querySelector("[data-days");
const dataHours = document.querySelector("[data-hours");
const dataMinutes = document.querySelector("[data-minutes");
const dataSecondss = document.querySelector("[data-seconds");

btn.addEventListener("click", startTimer);

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
        backgroundColor: "#EF4040",
        titleColor: "#FFFFFF",
        messageColor: "#FFFFFF",
        iconUrl: "../img/octagon.svg",
        iconColor: "#FFFFFF",
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
      userSelectedDate = selectedDates[0].getTime();
    }
  },
});

function startTimer() {
  btn.disabled = true;
  dataPicker.disabled = true;

  intervalId = setInterval(() => {
    const timeLeft = userSelectedDate - Date.now();

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      dataPicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    dataDays.textContent = String(days).padStart(2, "0");
    dataHours.textContent = String(hours).padStart(2, "0");
    dataMinutes.textContent = String(minutes).padStart(2, "0");
    dataSecondss.textContent = String(seconds).padStart(2, "0");
  }, 1000);
}

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
