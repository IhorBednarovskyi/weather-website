const forecast = (latitude, longitude, callback) => {
    const weatherApiKey = "9bf037439bd34a2ba48103943261810";
    const url = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}`;
    fetch(url)
        .then(response => response.json())
        .then(({ error, current }) => {
            if (error) {
                callback(error.message);
                return;
            }
            callback(null, `${current.condition.text}. It is currently ${current.temp_c} °C, it feels like ${current.feelslike_c} °C`);
        })
        .catch(error => callback(error));
};

module.exports = forecast;