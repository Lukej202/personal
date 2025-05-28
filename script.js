document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([39.3321, -84.4173], 11); 
  
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