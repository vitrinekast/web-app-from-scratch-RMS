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
			var sections = document.querySelectorAll("section:not(" + route + ")");
			for(var i = 0; i < sections.length; i++) {
				sections[i].classList.remove('active');
			}
			var activePage = document.querySelector(route);
			activePage.classList.add('active');
		}
	};

	app.init();


})();

