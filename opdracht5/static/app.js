(function () {
	"use strict"

	console.log('app is gestart')
	var app = {
		init : function () {
			routes.init();
			console.log("app.init()")
		}
	};

	var routes = {
		init : function () {
			console.log("routes.init()");
			window.addEventListener("hashchange", function(event) {
				sections.toggle(window.location.hash);
			});

		}
	};

	var sections = {
		toggle: function(route) {
			console.log("sections.toggle(route)"+ route );
			document.querySelector("section:not("+route+")").classList.remove('active');
			document.querySelector(route).classList.add('active');
		}
	};

	app.init();


})();

