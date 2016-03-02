var api = {

	baseURL: 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/',
	detail: 'detail/',
	koop:'/koop/',
	apiKEY: 'e2d60e885b8742d4b0648300e3703bd7',
	pagination : "/&page=1&pagesize=35",
	type: '/?type=koop&zo=/',

		listRequest : function (request, route) {
		console.log('start listRequest');
		console.log(request);
		var requestURL = api.baseURL + api.apiKEY + api.type + request + api.pagination;
		microAjax(requestURL, function (data) {
			console.log('start request');
			data = JSON.parse(data);

			console.log(requestURL);
			console.log(data.Objects[1]);

			data = math.init(data);
			

			var templateData = {
				objects: data[1].Objects,
				title: data[1].Metadata.Titel,
				gemidgemiddelddelde:data[0].gemiddeld,
				hoogste:data[0].hoogste,
				laagste:data[0].laagste,
				gemiddeldPerc:data[0].gemiddeldPerc
			}
			
			template.init(route, templateData);
		});
	},
	singleRequest: function(request, route) {
		console.log('start singleRequest');
		var requestURL = api.baseURL + api.detail + api.apiKEY + api.koop + request;
		microAjax(requestURL, function (data) {
			console.log('start request');
			data = JSON.parse(data);
			console.log(requestURL);
			var a = "Media-Foto";
			console.table(data.Kenmerken[2].SubKenmerk);
			var templateData = data;

		template.init(route, templateData);

		})
	},
	request : function(requestURL) {
		
		var data = microAjax(requestURL, function(data) {

			data = JSON.parse(data);
			console.log(requestURL);
			
		})
		// return data;
		
		return data
	}
}



// 	listRequest : function (request, route) {
// 		console.log('start listRequest');
// 		console.log(request);
// 		var requestURL = api.baseURL + api.apiKEY + api.type + request + api.pagination;
// 		microAjax(requestURL, function (data) {
// 			console.log('start request');
// 			data = JSON.parse(data);

// 			console.log(requestURL);
// 			console.log(data.Objects[1]);

// 			data = math.init(data);
// 			var templateData = {
// 				objects: data[1].Objects,
// 				title: data[1].Metadata.Titel,
// 				gemidgemiddelddelde:data[0].gemiddeld,
// 				hoogste:data[0].hoogste,
// 				laagste:data[0].laagste,
// 				gemiddeldPerc:data[0].gemiddeldPerc
// 			}
			
// 			template.init(route, templateData);
// 		});
// 	},
// 	singleRequest: function(request, route) {
// 		console.log('start singleRequest');
// 		var requestURL = api.baseURL + api.apiKEY + api.type + request + api.pagination;
// 		microAjax(requestURL, function (data) {
// 			console.log('start request');
// 			data = JSON.parse(data);

// 			console.log(requestURL);
// // klopt dit?
// 			var templateData = data.Objects ;
// 		})


// 		template.init(route, templateData);
// 	},