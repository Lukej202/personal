let map
document.addEventListener("DOMContentLoaded", () => {
    map = L.map('map').setView([39.3321, -84.4173], 11); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const serviceCenter = [39.3321, -84.4173];
    const serviceRadius = 16093; // 10 miles

    L.circle(serviceCenter, {
        color: 'green',
        fillColor: '#7cff7c',
        fillOpacity: 0.2,
        radius: serviceRadius
    }).addTo(map);

    map.on('click', function(e) {
        const userLatLng = e.latlng;
        const distance = map.distance(serviceCenter, userLatLng);
        const message = distance <= serviceRadius
        ? "✅ You're within our service area!"
        : "❌ Sorry, you're outside our service area.";
        document.getElementById('status').textContent = message;
    });
    // 👉 Force map to re-layout tiles correctly after load
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
});

function checkAddress() {
    const address = document.getElementById("addressInput").value;
    const serviceCenter = [39.3321, -84.4173]; // Your location
    const serviceRadius = 16093; // 10 miles in meters

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
        document.getElementById("addressStatus").textContent = "❌ Address not found.";
        return;
        }

        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        const distance = map.distance(serviceCenter, [lat, lon]);

        const message = distance <= serviceRadius
        ? "✅ You're within our service area!"
        : "❌ Sorry, you're outside our service area.";
        
        document.getElementById("addressStatus").textContent = message;

        // Optionally show the location on the map
        L.marker([lat, lon]).addTo(map).bindPopup("Your location").openPopup();
        map.setView([lat, lon], 12);
    })
    .catch(err => {
        console.error(err);
        document.getElementById("addressStatus").textContent = "❌ Error looking up address.";
    });
}