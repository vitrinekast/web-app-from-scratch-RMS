(function () {
	"use strict"

	console.log('app is gestart'); // Het is mooi als je consistent bent met "" of ''
	var app = {
		init: function () { // let op je spaties: init : --> init:
			routes.init();
			console.log("app.init()");
		}
	};

	var routes = {
		init: function () { 
			console.log("routes.init()"); // ook achter een console.log() moet een ; -> console.log(code);
			window.addEventListener("hashchange", function(event) { // Vet dat het is gelukt om je hash als parameter mee te geven
				sections.toggle(window.location.hash); // volgens mij is het niet erg netjes om een function in je eventListener te maken
			});

		}
	};

	var sections = {
		toggle: function(route) {
			console.log("sections.toggle(route)" + route); // let op de spacing tussen een +
			document.querySelector("section:not(" + route + ")").classList.remove('active');
			document.querySelector(route).classList.add('active');
		}
	};

	app.init();

})();
