// TODO: 
// - automatische startpagina (dus als de hash niks is)
// loading gif
// gestures
// functionele animatie
// code naar modules
// styles

(function () {
  "use strict";

  console.log('app is gestart');

  var launcher = {

    init : function () {
      console.log("launcher.init()");
      
      routie({
        'list' : function() {
          beer.getFullBeerList('list', 'beers?availableId=1');
        },
        
        'amsterdam' : function() {
          beer.getFullBeerList('amsterdam', 'search?q=amsterdam&type=beer');
        },

        ':id' :function() {
          var id = window.location.hash;
          if( id.charAt(0) === '#' ) {
            id = id.slice( 1 );
          }
          var endPoint = "/beer/" + id + "?";
          beer.getSingleBeer("detail", endPoint);
        }
        
      });
    }
  };
// dit moest misschien een andere naam zijn ipv beer. denk aan MVC
  var beer = {
    baseURL: "https://api.brewerydb.com/v2",
    apiKEY: "c242e13bd62778ab51790bf22fd04269",
    getFullBeerList : function(template, request) {
      var requestUrl = "https://api.brewerydb.com/v2/" + request + "&key=" + beer.apiKEY + "";
      beer.request(requestUrl, template, false);
    },
    getSingleBeer : function (template, request) {
      // hoe zat eht met request in een request?
      var requestUrl = "https://api.brewerydb.com/v2/" + request + "&key=" + beer.apiKEY + "";
      beer.request(requestUrl, template, true);

    },
    request : function (requestUrl, template, single) {
      console.log("request URL is " + requestUrl);
      microAjax(requestUrl, function(data) {
        data = JSON.parse(data);
        
        if(single === false) {
          templateSelection.templateSelect(template, data);
        }
        else {
          var requestUrl = "https://api.brewerydb.com/v2/beers?styleId=" + data.data.styleId + "&order=random&randomCount=3&key=" + beer.apiKEY + "";
          microAjax(requestUrl, function(moreData) {
            moreData = JSON.parse(moreData);
            console.log(requestUrl)
            templateSelection.templateSelect(template, {
              "data": data.data,
              "moreData" : moreData.data
            });
          })
        }
      })
    },
    


  };

  var templateSelection = {
    templateSelect : function (route, context) {
      var main = document.querySelector("main");
      var source = document.querySelector("#"+route+"-template").innerHTML;
      var template = Handlebars.compile(source);
      main.innerHTML = template(context);

      }
  };

  launcher.init();
})();