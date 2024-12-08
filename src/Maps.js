var SweetMeSoft;
(function (SweetMeSoft) {
    let map;
    let markers = [];
    let infoWindow;
    let showCoordinates;
    function generateMap(options) {
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultMap));
        markers = [];
        if (options.isUnique && options.coordinates.length > 1) {
            swal.fire('Error', 'IsUnique and Multiple coordinates can\'t be set at same time', 'error');
            return;
        }
        if (options.isUnique && options.coordinates.length == 1 && options.showCurrentLocation) {
            swal.fire('Error', 'IsUnique and showCurrentLocation block the coordinates', 'error');
            return;
        }
        showCoordinates = options.showCoordinates;
        let html = '<div id=map>';
        if (options.showAutocomplete) {
            html += '<input class="form-control mb-2" id="autocomplete" placeholder="Enter a location" disabled>';
        }
        html += '<div id="sweetmesoft-map" style="height: 100%; width: 100%;"></div>';
        if (options.showCoordinates) {
            html += '<p id=info>Latitude: <span id=lat></span>, Longitude: <span id=lng></span></p></div>';
        }
        if (options.modal) {
            SweetMeSoft.generateModal({
                title: 'Location',
                type: 'html',
                size: 'big',
                primaryText: 'Set',
                html: html,
                loadCallback: () => {
                    initLocation(options);
                },
                primaryCallback: () => {
                    options.edtLatitude.val($("#lat").text());
                    options.edtLongitude.val($("#lng").text());
                    return checkFields();
                }
            });
        }
        else {
            let jquery = $('#' + options.divId);
            jquery.html('');
            let html = '<div id=map>';
            if (options.showAutocomplete) {
                html += '<input class="form-control mb-2" id="autocomplete" placeholder="Enter a location" disabled>';
            }
            html += '<div id="sweetmesoft-map" style="height: 100%; width: 100%;"></div>';
            if (options.showCoordinates) {
                html += '<p id=info>Latitude: <span id=lat></span>, Longitude: <span id=lng></span></p></div>';
            }
            jquery.html(html);
            initLocation(options);
        }
    }
    SweetMeSoft.generateMap = generateMap;
    async function checkFields() {
        return $("#lat").text() != null && $("#lng").text() != null;
    }
    function initLocation(options) {
        let defaultLocation = { latitude: 0.0, longitude: 0.0, color: '#03b1fc', draggable: false };
        if (navigator.geolocation && options.showCurrentLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                defaultLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    draggable: false
                };
            }, () => {
                defaultLocation = { latitude: 4.72, longitude: -74.07 };
            });
        }
        initializeMap(options, defaultLocation);
    }
    function addMarkers(options) {
        for (let location of options.coordinates) {
            addMarker(location);
        }
    }
    function addMarker(location) {
        location.buttonText = location.buttonText == null || location.buttonText == '' ? 'Click here' : location.buttonText;
        const pinBackground = new google.maps.marker.PinElement({
            background: location.color == '' ? '#FBBC04' : location.color,
            borderColor: location.color == '' ? '#FBBC04' : location.color,
        });
        const m = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: location.latitude, lng: location.longitude },
            map: map,
            content: pinBackground.element,
            title: location.title,
            gmpClickable: location.title != '',
        });
        if (location.draggable) {
            google.maps.event.addListener(m, 'dragend', function () {
                updateLocation();
            });
        }
        if (m.title != '') {
            m.addListener('click', ({ domEvent, latLng }) => {
                infoWindow.close();
                const buttonHtml = location.onClick
                    ? '<button id="btnInfoWindowMap" class="btn btn-sm btn-primary">' + location.buttonText + '</button>'
                    : '';
                const content = `<div><h5>${m.title}</h5>${buttonHtml}</div>`;
                infoWindow.setContent(content);
                infoWindow.open(m.map, m);
                setTimeout(() => {
                    const button = $('#btnInfoWindowMap');
                    if (button && location.onClick) {
                        button.on('click', () => {
                            location.onClick(location);
                        });
                    }
                }, 300);
            });
        }
        markers.push(m);
    }
    function initializeMap(options, location) {
        map = new google.maps.Map(document.getElementById('sweetmesoft-map'), {
            zoom: 8,
            mapId: "85124246986526912",
            clickableIcons: false,
        });
        infoWindow = new google.maps.InfoWindow();
        addMarkers(options);
        updateLocation();
        if (location.latitude != 0 && location.longitude != 0) {
            let currentMarker = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
                content: new google.maps.marker.PinElement({
                    background: location.color,
                })
            });
            markers.push(currentMarker);
        }
        if (options.isClickableMap) {
            google.maps.event.addListener(map, 'click', function (event) {
                if (options.isUnique) {
                    if (markers.length == 0) {
                        const latLng = event.latLng;
                        addMarker({ latitude: latLng.lat(), longitude: latLng.lng() });
                    }
                    else {
                        const marker = markers[0];
                        marker.position = event.latLng;
                    }
                }
                else {
                    const latLng = event.latLng;
                    addMarker({ latitude: latLng.lat(), longitude: latLng.lng() });
                }
                updateLocation();
            });
        }
        if (options.showAutocomplete) {
            initAutocomplete(options);
        }
    }
    function initAutocomplete(options) {
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
                if (options.isUnique) {
                    if (markers.length == 0) {
                        addMarker({ latitude: latitude, longitude: longitude });
                    }
                    else {
                        const marker = markers[0];
                        marker.position = { lat: latitude, lng: longitude };
                    }
                }
                else {
                    addMarker({ latitude: latitude, longitude: longitude });
                }
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
        const MIN_ZOOM = 15;
        const listener = google.maps.event.addListener(map, 'bounds_changed', () => {
            if (map.getZoom() > MIN_ZOOM) {
                map.setZoom(MIN_ZOOM);
            }
            google.maps.event.removeListener(listener);
        });
        if (showCoordinates) {
            $("#lat").text(markers[0].position.lat);
            $("#lng").text(markers[0].position.lng);
        }
    }
})(SweetMeSoft || (SweetMeSoft = {}));
