import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  form: document.querySelector(".form"),
  inputDelay: document.querySelector("input[name='delay']"),
  radioFulfilled: document.querySelector("input[value='fulfilled']"),
  radioRejected: document.querySelector("input[value='rejected']"),
};

refs.form.addEventListener("submit", createNotification);

function createNotification(event) {
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    const delayTime = Number(refs.inputDelay.value);
    const isChecked = refs.radioFulfilled.checked ?? refs.radioRejected.checked;

    setTimeout(() => {
      if (isChecked) {
        resolve(delayTime);
      } else {
        reject(delayTime);
      }
    }, delayTime);
  });

  promise
    .then(time => {
      iziToast.show({
        title: "OK",
        titleColor: "#FFFFFF",
        message: `Fulfilled promise in ${time}ms`,
        messageColor: "#FFFFFF",
        backgroundColor: "#59A10D",
        position: "topRight",
        iconUrl: "../img/check.svg",
      });
    })
    .catch(time => {
      iziToast.show({
        title: "Error",
        titleColor: "#FFFFFF",
        message: `Rejected promise in ${time}ms`,
        messageColor: "#FFFFFF",
        backgroundColor: "#EF4040",
        position: "topRight",
        iconUrl: "../img/octagon.svg",
      });
    });
}
