var SweetMeSoft;
(function (SweetMeSoft) {
    let map;
    let currentMarker;
    let markers = [];
    let infoWindow;
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
        let defaultLocation = { latitude: 0.0, longitude: 0.0, color: '#03b1fc' };
        if (navigator.geolocation && options.showCurrentLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                defaultLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            }, () => {
                defaultLocation = { latitude: 4.72, longitude: -74.07 };
            });
        }
        else {
        }
        initializeMap(options, divId, defaultLocation);
        updateLocation();
    }
    function addMarkers(coordinates) {
        for (let location of coordinates) {
            const pinBackground = new google.maps.marker.PinElement({
                background: location.color == '' ? '#FBBC04' : location.color,
                borderColor: location.color == '' ? '#FBBC04' : location.color,
            });
            const m = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
                content: pinBackground.element,
                title: location.title,
                gmpClickable: location.title != ''
            });
            if (m.title != '') {
                m.addListener('click', ({ domEvent, latLng }) => {
                    infoWindow.close();
                    infoWindow.setContent(m.title);
                    infoWindow.open(m.map, m);
                });
            }
            markers.push(m);
        }
    }
    function initializeMap(options, divId, location) {
        let div = $('#' + divId);
        if (options.showAutocomplete) {
            div.append('<input class="form-control mb-2" id="autocomplete" placeholder="Enter a location" disabled>');
        }
        div.append('<div id="sweetmesoft-map" style="height: 100%; width: 100%;"></div>');
        map = new google.maps.Map(document.getElementById('sweetmesoft-map'), {
            zoom: 8,
            mapId: "85124246986526912"
        });
        infoWindow = new google.maps.InfoWindow();
        addMarkers(options.coordinates);
        if (location.latitude != 0 && location.longitude != 0) {
            currentMarker = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
                content: new google.maps.marker.PinElement({
                    background: location.color,
                })
            });
            google.maps.event.addListener(currentMarker, 'dragend', function () {
                updateLocation();
            });
            google.maps.event.addListener(map, 'click', function (event) {
                currentMarker.position = event.latLng;
                updateLocation();
            });
        }
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
                currentMarker.position = place.geometry.location;
                updateLocation();
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
    function updateLocation() {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => {
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
        if (currentMarker != undefined) {
            $("#lat").text(currentMarker.position.lat);
            $("#lng").text(currentMarker.position.lng);
        }
    }
})(SweetMeSoft || (SweetMeSoft = {}));
