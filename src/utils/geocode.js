const mapboxApiKey = "pk.eyJ1Ijoib3BhNGlrIiwiYSI6ImNtdmRxeHBvbDBxczU0OHM2dnF0Zmk0OGYifQ.fj0B5YQUlxc5N5JCZR0DIg";

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=${mapboxApiKey}&limit=1`;
    fetch(url)
        .then(response => response.json())
        .then(({ error_code, message, features }) => {
            if (error_code) {
                callback(message);
                return;
            }
            const feature = features[0];
            if (!feature) {
                callback("No results found");
                return;
            }
            callback(null, { latitude: feature.geometry.coordinates[1], longitude: feature.geometry.coordinates[0], location: feature.properties.full_address });
        })
        .catch(error => callback(error));
};

module.exports = geocode;