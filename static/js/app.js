(function () {
	"use strict"

	console.log('app is gestart')
	var app = {
		init : function () {
			routes.init();
			echoNest.init();
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
	http://developer.echonest.com/api/v4/artist/blogs
	var echoNest = {
		init : function () {
			var name = "Boards of Canada"
			microAjax("http://developer.echonest.com/api/v4/artist/similar?api_key=ZIWFRUOZRUL9D67JZ&name=" + name, function (data) {
                data = JSON.parse(data);
               
                
                console.log(data)
            });
		}
	}
	
	
	var sections = {
		toggle: function(route) {
			console.log("sections.toggle(route)"+ route );
			var sections = document.querySelectorAll("section:not(" + route + ")");
			for(var i = 0; i < sections.length; i++) {
				sections[i].classList.remove('active');
			}
			document.querySelector(route).classList.add('active');
		}
	};

	app.init();


})();

