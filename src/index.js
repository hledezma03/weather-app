import "./style.css";
import { fetchingWeatherData } from "./api.js";

const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value;

  const data = await fetchingWeatherData(location);

  refreshUI(data);
});

function refreshUI(data) {
  const weatherDisplay = document.querySelector("#weather-display");
  weatherDisplay.textContent = "";
  const iconImg = document.createElement("img");
  const addressText = document.createElement("h2");
  const conditionText = document.createElement("p");
  const tempText = document.createElement("p");
  console.log(data.icon)
  iconImg.src = `./assets/icons/${data.icon}.svg`;
  iconImg.classList.add("weather-icon");
  iconImg.alt = data.conditions;
  addressText.classList.add("address");
  conditionText.classList.add("condition");
  tempText.classList.add("temp");

  addressText.textContent = `${data.address}`;
  conditionText.textContent = `${data.conditions}`;
  tempText.textContent = `${data.temp}°C`;

  weatherDisplay.append(iconImg, addressText, conditionText, tempText);
}
