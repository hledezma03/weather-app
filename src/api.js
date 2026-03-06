export async function fetchingWeatherData(location) {
  const API_KEY = "ZTXBSF3BULWX39GGRRTT8QLE7";
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}&contentType=json&unitGroup=metric`;

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    return processWeatherData(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

function processWeatherData(data) {
  const { datetime, temp, feelslike, conditions, icon } =
    data.currentConditions;

  return {
    address: data.resolvedAddress,
    description: data.description,
    datetime,
    temp,
    feelslike,
    conditions,
    icon,
  };
}
