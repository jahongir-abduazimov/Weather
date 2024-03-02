"use strict";

let date = $('#date');
let week = $('#week');
let weatherToday = $('#weather-today');
let weeklyWeather = $('#weekly-weather');
let hourlyWeather = $('#hourly-weather');

let d = new Date()

let time = d.getHours()
let minut = d.getMinutes()

if (minut < 10) {
    minut = `0${minut}`
}

if (time < 10) {
    time = `0${time}`
}
date.textContent = `${time}:${minut}`

let weekDay = d.getDay()
let day
switch (weekDay) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
}

let monthDay = d.getMonth()
let month
switch (monthDay) {
    case 0:
        month = "Jahuary";
        break;
    case 1:
        month = "February";
        break;
    case 2:
        month = "March";
        break;
    case 3:
        month = "Aipril";
        break;
    case 4:
        month = "May";
        break;
    case 5:
        month = "June";
        break;
    case 6:
        month = "July";
        break;
    case 7:
        month = "August";
        break;
    case 8:
        month = "September";
        break;
    case 9:
        month = "October";
        break;
    case 10:
        month = "November";
        break;
    case 11:
        month = "December";
        break;
}
week.textContent = `${day}, ${d.getDate()} ${month}`


let baseURL = 'https://api.weatherapi.com/v1';
let baseId = 'bf1c5421a2ad4efb95b53623240103';

async function fetchData(url, id) {
    try {
        let response = await fetch(`${url}/forecast.json?key=${id}&days=${5}&q=$Tashkent`)
        let result = await response.json()
        renderDaylyWeather(result);
        renderWeeklyWeather(result);
        renderHourlyWeather(result)
    } catch (err) {
        console.log(err);
    }
}

fetchData(baseURL, baseId)

function renderDaylyWeather(data) {
    weatherToday.innerHTML = `
        <div>
            <p class="font-bold text-[50px] md:text-[80px]">${data.current.temp_c}°C</p>
            <p class="font-semibold text-[20px] flex items-center gap-2 mb-[20px]">Feels like: <span class="text-[25px] md:text-[32px]">${Math.round(data.current.feelslike_c)}°C</span></p>
            <div class="flex items-center gap-3 mb-5">
                <img src="./images/sunrise-white 1.svg" alt="icon">
                <div class="font-semibold">
                    <p>Sunrise</p>
                    <p>${data.forecast.forecastday[0].astro.sunrise}</p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <img src="./images/sunset-white 1.svg" alt="icon">
                <div class="font-semibold">
                    <p>Sunset</p>
                    <p>${data.forecast.forecastday[0].astro.sunset}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center w-[120px] md:w-[180px]">
            <img class="w-[100px] md:w-[150px] mb-10" src="${data.current.condition.icon}" alt="icon">
            <p class="text-[20px] md:text-[32px] font-semibold">${data.current.condition.text}</p>
        </div>

    <div class="hidden md:grid grid-cols-4 md:grid-cols-2 gap-x-4 gap-y-[20px] md:w-[247px]">
        <div class="flex flex-col items-center">
            <img class="mb-2" src="./images/humidity 1.svg" alt="">
            <p class="font-semibold text-[20px]">${data.current.humidity}%</p>
            <p class="font-medium">Humidity</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="./images/wind 1.svg" alt="">
            <p class="font-semibold text-[20px]">${Math.round(data.current.wind_kph)} km/h</p>
            <p class="font-medium">Wind Speed</p>
        </div>
        <div class="flex flex-col items-center">
            <img class="mb-2" src="./images/pressure-white 1.svg" alt="">
            <p class="font-semibold text-[20px]">${data.current.pressure_mb} hPa</p>
            <p class="font-medium">Pressure</p>
        </div>
        <div class="flex flex-col items-center">
            <img class="mb-2" src="./images/uv-white 1.svg" alt="">
            <p class="font-semibold text-[20px]">${data.current.uv}</p>
            <p class="font-medium">uv</p>
        </div>
    </div>
    `
}

function renderWeeklyWeather(data) {
    weeklyWeather.innerHTML = `
                        <div class="flex items-center justify-between">
                            <img src="${data.forecast.forecastday[0].day.condition.icon}" alt="">
                            <p class="text-[24px]">${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°C</p>
                            <p class="text-[20px]">${data.forecast.forecastday[0].date}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="">
                            <p class="text-[24px]">${Math.round(data.forecast.forecastday[1].day.maxtemp_c)}°C</p>
                            <p class="text-[20px]">${data.forecast.forecastday[1].date}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="">
                            <p class="text-[24px]">${Math.round(data.forecast.forecastday[2].day.maxtemp_c)}°C</p>
                            <p class="text-[20px]">${data.forecast.forecastday[2].date}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <img src="${data.forecast.forecastday[3].day.condition.icon}" alt="">
                            <p class="text-[24px]">${Math.round(data.forecast.forecastday[3].day.maxtemp_c)}°C</p>
                            <p class="text-[20px]">${data.forecast.forecastday[3].date}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <img src="${data.forecast.forecastday[4].day.condition.icon}" alt="">
                            <p class="text-[24px]">${Math.round(data.forecast.forecastday[4].day.maxtemp_c)}°C</p>
                            <p class="text-[20px]">${data.forecast.forecastday[4].date}</p>
                        </div>
    `
}

function renderHourlyWeather(el) {
    hourlyWeather.innerHTML = `
        <div class="min-w-[110px] md:w-[130px] h-[270px] flex flex-col items-center bg-[#373636] rounded-[40px] py-[13px] justify-between">
            <p class="text-[24px]">04:00</p>
            <img src="${el.forecast.forecastday[0].hour[4].condition.icon}" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[4].temp_c)}°C</p>
            <img class="rotate-[${el.forecast.forecastday[0].hour[4].wind_degree}deg]" src="./images/navigation 1.svg" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[4].wind_kph)} km/h</p>
        </div>
        <div class="min-w-[110px] md:w-[130px] h-[270px] flex flex-col items-center bg-[#373636] rounded-[40px] py-[13px] justify-between">
            <p class="text-[24px]">08:00</p>
            <img src="${el.forecast.forecastday[0].hour[8].condition.icon}" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[8].temp_c)}°C</p>
            <img class="rotate-[${el.forecast.forecastday[0].hour[8].wind_degree}deg]" src="./images/navigation 1.svg" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[8].wind_kph)} km/h</p>
        </div>
        <div class="min-w-[110px] md:w-[130px] h-[270px] flex flex-col items-center bg-[#373636] rounded-[40px] py-[13px] justify-between">
            <p class="text-[24px]">12:00</p>
            <img src="${el.forecast.forecastday[0].hour[12].condition.icon}" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[12].temp_c)}°C</p>
            <img class="rotate-[${el.forecast.forecastday[0].hour[12].wind_degree}deg]" src="./images/navigation 1.svg" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[12].wind_kph)} km/h</p>
        </div>
        <div class="min-w-[110px] md:w-[130px] h-[270px] flex flex-col items-center bg-[#373636] rounded-[40px] py-[13px] justify-between">
            <p class="text-[24px]">16:00</p>
            <img src="${el.forecast.forecastday[0].hour[16].condition.icon}" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[16].temp_c)}°C</p>
            <img class="rotate-[${el.forecast.forecastday[0].hour[16].wind_degree}deg]" src="./images/navigation 1.svg" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[16].wind_kph)} km/h</p>
        </div>
        <div class="min-w-[110px] md:w-[130px] h-[270px] flex flex-col items-center bg-[#373636] rounded-[40px] py-[13px] justify-between">
            <p class="text-[24px]">20:00</p>
            <img src="${el.forecast.forecastday[0].hour[20].condition.icon}" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[20].temp_c)}°C</p>
            <img class="rotate-[${el.forecast.forecastday[0].hour[20].wind_degree}deg]" src="./images/navigation 1.svg" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[0].hour[20].wind_kph)} km/h</p>
        </div>
        <div class="min-w-[110px] md:w-[130px] h-[270px] flex flex-col items-center bg-[#373636] rounded-[40px] py-[13px] justify-between">
            <p class="text-[24px]">00:00</p>
            <img src="${el.forecast.forecastday[1].hour[0].condition.icon}" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[1].hour[0].temp_c)}°C</p>
            <img class="rotate-[${el.forecast.forecastday[1].hour[0].wind_degree}deg]" src="./images/navigation 1.svg" alt="">
            <p class="text-[20px]">${Math.round(el.forecast.forecastday[1].hour[0].wind_kph)} km/h</p>
        </div>
    `
}
