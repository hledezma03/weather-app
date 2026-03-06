import "./style.css";
import { fetchingWeatherData } from "./api.js";

const form = document.querySelector("form");
const input = document.querySelector("input");
const weatherDisplay = document.querySelector("#weather-display");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value;
  const loader = document.querySelector("#loading-spinner");

  console.log("Loader element:", loader); // If this says 'null', the ID is wrong!
  console.log("Display element:", weatherDisplay);
  loader.classList.remove("hidden");

  Array.from(weatherDisplay.children).forEach((child) => {
    if (child !== loader) child.remove();
  });

  try {
    const data = await fetchingWeatherData(location);
    loader.classList.add("hidden");
    if (data) {
      refreshUI(data);
    }
  } catch (err) {
    loader.classList.add("hidden");
    console.error("Fetch failed");
  }
});

function refreshUI(data) {
  weatherDisplay.textContent = "";
  const iconImg = document.createElement("img");
  const addressText = document.createElement("h2");
  const conditionText = document.createElement("p");
  const tempText = document.createElement("p");
  console.log(data.icon);
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
