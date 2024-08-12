namespace SweetMeSoft{
    let map: google.maps.Map;
    let marker: google.maps.Marker;

    export function generateMap(options: OptionsMap){
        generateModal({
            title: 'Location',
            type: 'html',
            size: 'big',
            primaryText: 'Set',
            html: '<h3>Pick a Location on the Map</h3><div><input class="form-control mb-2"id=autocomplete placeholder="Enter a location"><div id=map></div><p id=info>Latitude: <span id=lat></span>, Longitude: <span id=lng></span></div>',
            loadCallback: () => {
                initMap()
            },
            primaryCallback: () => {
                options.edtLatitude.val($("#lat").text());
                options.edtLongitude.val($("#lng").text());
                return checkFields();
            }
        });
    }

    async function checkFields(): Promise<boolean> {
        return $("#lat").text() != null && $("#lng").text() != null;
    }

    function initMap() {
        // Initialize the map

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    initializeMap(userLocation);
                    updateLocation(userLocation);
                },
                () => {
                    // Handle error or set a default location if geolocation fails
                    const defaultLocation = { lat: 4.72, lng: -74.07 }; // Bogota
                    initializeMap(defaultLocation);
                    updateLocation(defaultLocation);
                }
            );
        } else {
            // Browser doesn't support Geolocation
            const defaultLocation = { lat: 4.72, lng: -74.07 }; // Bogota
            initializeMap(defaultLocation);
            updateLocation(defaultLocation);
        }
    }

    function initializeMap(location) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: location, // Default center (can be any location)
            zoom: 8
        });

        // Initialize the marker (without position, to be set later)
        marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });

        google.maps.event.addListener(marker, 'dragend', function () {
            updateLocation(marker.getPosition());
        });

        google.maps.event.addListener(map, 'click', function (event) {
            marker.setPosition(event.latLng);
            updateLocation(event.latLng);
        });

        // Call the autocomplete initialization
        initAutocomplete();
    }


// Initialize Google Maps Place Autocomplete
    function initAutocomplete() {
        const input = document.getElementById('autocomplete') as HTMLInputElement;
        //const select = document.getElementById('options-select');

        const autocomplete = new google.maps.places.Autocomplete(input);
        console.log("completa", autocomplete);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (place.geometry) {
                // Get latitude and longitude from place geometry
                const latitude = place.geometry.location.lat();
                const longitude = place.geometry.location.lng();

                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);

                // You can now use latitude and longitude for further processing

                map.setCenter(place.geometry.location);
                map.setZoom(15); // Zoom in on the selected place

                // Set the marker to the selected place
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                updateLocation(place.geometry.location);
            } else {
                console.log('No details available for input: ' + input.value);
            }
        });

        input.addEventListener('focus', () => {
            const modal = document.querySelector('.modal-body'); // Or any other selector for your modal
            const pacContainer = document.querySelector('.pac-container');

            if (pacContainer && modal) {
                modal.appendChild(pacContainer);
            }
        });
    }

    function updateLocation(location) {
        $("#lat").text(location.lat);
        $("#lng").text(location.lng);
    }
}