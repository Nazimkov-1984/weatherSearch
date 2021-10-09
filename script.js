const button = document.querySelector(".button_search");
const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
const nameFolder = "img";
const flagCountry = document.querySelector(".flag");
flagCountry.style.visibility = "hidden";
const result = document.querySelector('.result');
result.style.visibility = "hidden";

const itemList = document.querySelectorAll(".result__list__item");

const randomNumberBackground = randomInteger(1, 7);
document.body.style.backgroundImage = `url("${nameFolder}/${randomNumberBackground}.jpg")`;
const input = document.querySelector(".input");

input.addEventListener('focus', ()=> {
  input.value ='';
  itemList.forEach(item => {
    item.textContent = "";
    result.style.visibility = "hidden";
  })

})

button.addEventListener("click", () => {
  const city_name = input.value ? input.value : "";
  const API_key = "0e3f4c3098c7d2107ce581907ae44eb7";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data, data.cod);
      if (data.cod === 200) {
        const codeCountry = data.sys.country;
        flagCountry.style.visibility = "visible";
        flagCountry.src = `https://www.countryflags.io/${codeCountry}/flat/64.png`;
  
        const dataForLi = [];
        dataForLi[0] = `Облачность: ${data.clouds.all} %`;
        dataForLi[1] = `Температура: ${data.main.temp} C${String.fromCharCode(176)}`;
        dataForLi[2] = `Ощушаеться как: ${data.main.feels_like} C${String.fromCharCode(176)}`;
        dataForLi[3] = `Влажность: ${data.main.humidity} %`;
        dataForLi[4] = `Давление: ${data.main.pressure} мм.рт.ст.`;
        dataForLi[5] = `Максимальная температура: ${
          data.main.temp_max
        } C${String.fromCharCode(176)}`;
        dataForLi[6] = `Минимальная температура: ${data.main.temp_min} C${String.fromCharCode(176)}`;
        dataForLi[7] = `Направление ветра: ${data.wind.deg} ${String.fromCharCode(176)}`;
        dataForLi[8] = `Скорость ветра: ${data.wind.speed} м/с.`;
  
        const itemList = document.querySelectorAll(".result__list__item");
  
        itemList.forEach((item, index) => {
          item.textContent = dataForLi[index];
        });
        result.style.visibility = "visible";
      } else {
        itemList[0].textContent = data.message;
      }

    });
});
