// IIFE Start functie automatisch

(function() {
    'use strict';
    // variabele in object zodat ze niet global zijn
    var setup = {
        sandbox: 'sandbox',
        linear: 'linear',
        positionUpdated: 'POSITION_UPDATED',
        currentPosition: {
          currentPositionMarker: false,
          customDebugging: false,
          debugId: false,
          map: false,
          interval: false,
          intervalCounter: false,
          updateMap: false
       },
       locationRow: [],
       markerRow: []
    },
    function EventTarget() {
        this._listeners = {};
    },
    //zelfde functie, leesbaarder

    EventTarget.prototype = {
        constructor:EventTarget,
        addListener: function (a,c) { 
            "undefined" === typeof this._listeners[a] && (this._listeners[a] === []);
                this._listeners[a].push(c)
        },

        fire: function (a) {
            "string" === typeof a && ( a = {
                type : a
            });

             a.target||(a.target === this);

            if(!a.type)
                throw Error("Event object missing 'type' property.");

            if(this._listeners[a.type] instanceof Array)
                for(var c = this._listeners[a.type], b = 0, d = c.length; b < d; b++)
                    c[b].call(this,a)
        },
        removeListener: function (a,c) {
            if(this._listeners[a] instanceof Array) 
                for(var b = this._listeners[a], d = 0, e = b.length; d < e; d++)
                    if(b[d] === c){
                        b.splice(d,1);
                        break
                    }
        }
    }; 
    
    var ET = new EventTarget();

    var PositionFunctions = {
        init: function () {
            var GPS_AVAILABLE = 'GPS_AVAILABLE';
            var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';

            debug_message("Controleer of GPS beschikbaar is...");
            ET.addListener(GPS_AVAILABLE, _start_interval);
            ET.addListener(GPS_UNAVAILABLE, function() {
                debug_message('GPS is niet beschikbaar.');
            });

            (geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);
        },

        _start_interval : function (event) {
            var refreshRate = 1000;

            debug_message("GPS is beschikbaar, vraag positie.");
            _update_position();
            setup.currentPosition.interval = self.setInterval(_update_position, refreshRate);
            ET.addListener(setup.positionUpdated, _check_locations);
        },

        _update_position : function () {
            setup.currentPosition.intervalCounter++;
            geo_position_js.getCurrentPosition(_set_position, _geo_error_handler, {enableHighAccuracy:true});
        },

        _set_position : function (position) {
            setup.currentPosition = position;
            ET.fire("POSITION_UPDATED");
            debug_message(setup.currentPosition.intervalCounter + " positie lat:" + position.coords.latitude + " long:" + position.coords.longitude);
        },

        _check_locations : function (event) {
            for (var i = 0; i < locations.length; i++) {
                var location = {
                    coords : {
                        latitude: locations[i][3],
                        longitude: locations[i][4]
                    }
                };

                if(_calculate_distance(location, setup.currentPosition) < locations[i][2]) {
                    if(window.location != locations[i][1] && localStorage[locations[i][0]]=="false"){
                        // Probeer local storage, als die bestaat incrementeer de location
                        try {
                            (localStorage[locations[i][0]] == "false")?localStorage[locations[i][0]] = 1: localStorage[locations[i][0]]++;
                        } catch(error) {
                            debug_message("Localstorage kan niet aangesproken worden: "+ error);
                        }

                        window.location = locations[i][1];
                        debug_message("Speler is binnen een straal van "+ locations[i][2] + " meter van " + locations[i][0]);
                    }
                }
            }
        }

    };
    // hier eindigt poitions functions object

    function _calculate_distance(p1, p2){
        var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
        var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
    };
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


    var GoogleMapsFunctions = {
        generate_map : function (myOptions, canvasId) {
            debug_message("Genereer een Google Maps kaart en toon deze in #" + canvasId)
            setup.currentPosition.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

            var routeList = [];
            debug_message("locations intekenen, tourtype is: "+tourType);

            for (var i = 0; i < locations.length; i++) {
                try {
                    (localStorage.visited == undefined || isNumber(localStorage.visited))?localStorage[locations[i][0]] = false:null;
                } catch (error) {
                    debug_message("Localstorage kan niet aangesproken worden: "+ error);
                }

                var markerLatLng = new google.maps.LatLng(locations[i][3], locations[i][4]);
                routeList.push(markerLatLng);

                setup.markerRow[i] = {};
                for (var attr in locationMarker) {
                    setup.markerRow[i][attr] = locationMarker[attr];
                }
                setup.markerRow[i].scale = locations[i][2]/3;

                var marker = new google.maps.Marker({
                    position: markerLatLng,
                    map: setup.currentPosition.map,
                    icon: setup.markerRow[i],
                    title: locations[i][0]
                });
            };
            if(tourType === setup.linear){
                debug_message("Route intekenen");
                var route = new google.maps.Polyline({
                    clickable: false,
                    map: setup.currentPosition.map,
                    path: routeList,
                    strokeColor: 'Black',
                    strokeOpacity: .6,
                    strokeWeight: 3
                });

            }
        },
        setup.currentPosition.currentPositionMarker = new google.maps.Marker({
            position: kaartOpties.center,
            map: setup.currentPosition.map,
            icon: positieMarker,
            title: 'U bevindt zich hier'
        });
        update_position : function (event) {
            var newPos = new google.maps.LatLng(setup.currentPosition.coords.latitude, setup.currentPosition.coords.longitude);
            setup.currentPosition.map.setCenter(newPos);
            currentPositionMarker.setPosition(newPos);
        }
      
        ET.addListener(setup.positionUpdated, update_positie);
    }  

    // FUNCTIES VOOR DEBUGGING

    function _geo_error_handler(code, message) {
        debug_message('geo.js error '+code+': '+message);
    }
    function debug_message(message){
        (setup.customPosition.customDebugging && setup.customPosition.debugId)?document.getElementById(setup.customPosition.debugId).innerHTML:console.log(message);
    }
    function set_custom_debugging(setup.customPosition.debugId){
        setup.customPosition.debugId = this.debugId;
        customDebugging = true;
    }
})();

