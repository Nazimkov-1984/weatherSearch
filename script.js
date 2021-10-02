const button = document.querySelector('.button_search');
const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
const nameFolder = 'img';
const flagCountry = document.querySelector('.flag');
flagCountry.style.display = "none";  

const randomNumberBackground = randomInteger(1,7);
document.body.style.backgroundImage = `url("${nameFolder}/${randomNumberBackground}.jpg")`;
button.addEventListener('click', ()=>{

    const input = document.querySelector('.input');
    const city_name = input.value ? input.value: "" ;
    const API_key = '0e3f4c3098c7d2107ce581907ae44eb7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const codeCountry = data.sys.country;
        flagCountry.style.display = "block";
        flagCountry.src = `https://www.countryflags.io/${codeCountry}/flat/64.png`;
       console.log(data);

       const dataForLi = [];
        dataForLi[0]= `Облачность: ${data.clouds.all} %`;
        dataForLi[1]= `Температура: ${data.main.temp} C${String.fromCharCode(176)}`;
        dataForLi[2]= `Ощушаеться как: ${data.main.feels_like} C${String.fromCharCode(176)}`;
        dataForLi[3]= `Влажность: ${data.main.humidity} %`;
        dataForLi[4]= `Давление: ${data.main.pressure} мм.рт.ст.`;
        dataForLi[5]= `Максимальная температура: ${data.main.temp_max} C${String.fromCharCode(176)}`;
        dataForLi[6]= `Минимальная температура: ${data.main.temp_min} C${String.fromCharCode(176)}`;
        dataForLi[7]= `Направление ветра: ${data.wind.deg} ${String.fromCharCode(176)}`;
        dataForLi[8]= `Скорость ветра: ${data.wind.speed} м/с.`;
const itemList = document.querySelectorAll('.result__list__item');

itemList.forEach((item,index) => {
    item.textContent = dataForLi[index];
})


    });
})




