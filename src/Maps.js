var SweetMeSoft;
(function (SweetMeSoft) {
    let map;
    let marker;
    function generateMap(options) {
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultMap));
        if (options.modal) {
            SweetMeSoft.generateModal({
                title: 'Location',
                type: 'html',
                size: 'big',
                primaryText: 'Set',
                html: '<h3>Pick a Location on the Map</h3><div><input class="form-control mb-2" id=autocomplete placeholder="Enter a location" disabled><div id=map></div><p id=info>Latitude: <span id=lat></span>, Longitude: <span id=lng></span></div>',
                loadCallback: () => {
                    initMap(options, 'map');
                },
                primaryCallback: () => {
                    options.edtLatitude.val($("#lat").text());
                    options.edtLongitude.val($("#lng").text());
                    return checkFields();
                }
            });
        }
        else {
            initMap(options, options.divId);
        }
    }
    SweetMeSoft.generateMap = generateMap;
    async function checkFields() {
        return $("#lat").text() != null && $("#lng").text() != null;
    }
    function initMap(options, divId) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                initializeMap(options, userLocation, divId);
                updateLocation(userLocation);
            }, () => {
                const defaultLocation = { lat: 4.72, lng: -74.07 }; // Bogota
                initializeMap(options, defaultLocation, divId);
                updateLocation(defaultLocation);
            });
        }
        else {
            const defaultLocation = { lat: 4.72, lng: -74.07 }; // Bogota
            initializeMap(options, defaultLocation, divId);
            updateLocation(defaultLocation);
        }
    }
    function initializeMap(options, location, divId) {
        let div = $('#' + divId);
        if (options.showAutocomplete) {
            div.append('<input class="form-control mb-2" id="autocomplete" placeholder="Enter a location" disabled>');
        }
        div.append('<div id="sweetmesoft-map" style="height: 100%; width: 100%;"></div>');
        map = new google.maps.Map(document.getElementById('sweetmesoft-map'), {
            center: location,
            zoom: 8
        });
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
        if (options.showAutocomplete) {
            initAutocomplete();
        }
    }
    function initAutocomplete() {
        const input = document.getElementById('autocomplete');
        document.getElementById('autocomplete').attributes.removeNamedItem("disabled");
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const latitude = place.geometry.location.lat();
                const longitude = place.geometry.location.lng();
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);
                map.setCenter(place.geometry.location);
                map.setZoom(15);
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                updateLocation(place.geometry.location);
            }
            else {
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
})(SweetMeSoft || (SweetMeSoft = {}));
