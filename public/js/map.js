document.addEventListener("DOMContentLoaded", async function () {
    let apiKey = mapToken; // Your Geoapify API Key
    let lisLocation = listingLocation;
    let lisCountry = listingCountry;
    

    // Get location and country from the EJS template
    const location = `${lisLocation}, ${lisCountry}`;

    try {
        // Fetch location coordinates
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.features.length === 0) throw new Error("Location not found");

        const { lat, lon } = data.features[0].properties;

        // Initialize the map
        const map = L.map("map", { zoomControl: false }).setView([lat, lon], 12);

        // High-performance tile layer
        L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${apiKey}`, {
            maxZoom: 16,
            attribution: "&copy; Geoapify",
        }).addTo(map);

        // Add a marker instantly
        L.marker([lat, lon]).addTo(map)
            .bindPopup(`<b>Location:</b> ${location}`)
            .openPopup();

    } catch (error) {
        console.error("❌ Error loading map:", error);
    }
});
