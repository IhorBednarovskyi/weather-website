document.getElementById('weather-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const address = document.getElementById('address').value;
    fetch(`/weather?address=${address}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('weather-result');
            if (data.error) {
                resultDiv.textContent = data.error;
            } else {
                resultDiv.textContent = `Location: ${data.location}, Forecast: ${data.forecast}`;
            }
        })
        .catch(error => console.log(error));
});