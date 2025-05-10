$(document).ready(function () {
  const map = L.map('map').setView([40.730610, -73.935242], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  if (typeof nycLawyers !== 'undefined' && nycLawyers.features) {
    nycLawyers.features.forEach(feature => {
      const [lat, lon] = feature.geometry.coordinates; // GeoJSON uses [lat, lon]
      const props = feature.properties;

      const name = props["Lawyer"] || props["Law Office"] || "Unknown Name";
      const neighborhood = props["Neighborhood"] || "Unknown Neighborhood";
      const rating = props["Rating"] || "N/A";
      const fee = props["Consultation Fee"] || props["Consultation fee"] || "Unknown";
      const mapLink = props["Maps"] ? `<a href="${props["Maps"]}" target="_blank">📍 View in Google Maps</a>` : "";

      const popupHTML = `
        <strong>${name}</strong><br>
        <em>${neighborhood}</em><br>
        Rating: ${rating}<br>
        Consultation: ${fee}<br>
        ${mapLink}
      `;

      L.marker([lat, lon]).addTo(map).bindPopup(popupHTML);
    });
  } else {
    console.error("nycLawyers data is missing or malformed.");
  }
});
