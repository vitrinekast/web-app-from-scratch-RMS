// TODO: 
// - automatische startpagina (dus als de hash niks is)
// loading gif V
// gestures
// functionele animatie V
// code naar modules
// styles

(function () {
  "use strict";
console.log("Start gestures")
     
  console.log('app is gestart');
  
  var launcher = {

    init : function () {
      
      router.init();

    }
  };
// dit moest misschien een andere naam zijn ipv beer. denk aan MVC
  var beer = {
    baseURL: "https://api.brewerydb.com/v2",
    apiKEY: "c242e13bd62778ab51790bf22fd04269",
    
    getFullBeerList : function(template, request) {
      var requestUrl = "https://api.brewerydb.com/v2/" + request + "key=" + beer.apiKEY + "";
      beer.request(requestUrl, template, false);
    },
    getSingleBeer : function (template, request) {
      // hoe zat eht met request in een request?
      document.getElementById("amsterdam-template").classList.toggle("schuif");
      var requestUrl = "https://api.brewerydb.com/v2/" + request + "key=" + beer.apiKEY + "";
      beer.request(requestUrl, template, true);
    },
    request : function (requestUrl, template, single) {
      // 
      console.log("request URL is " + requestUrl);

      microAjax(requestUrl, function(data) {
        var req = this.getRequest();
       
        console.log("start request");

        
        data = JSON.parse(data);
        
        if(single === false) {
          console.log("false");
          templateSelection.templateSelect(template, data);
        }
        else {
          console.log("true");
          var requestUrl = "https://api.brewerydb.com/v2/beers?styleId=" + data.data.styleId + "&order=random&randomCount=3&key=" + beer.apiKEY + "";
         
          microAjax(requestUrl, function(moreData) {
            
            moreData = JSON.parse(moreData);
            console.log(requestUrl)
            templateSelection.templateSelect(template, {
              "data": data.data,
              "moreData" : moreData.data
            });
          })
        };
        Events.gestures();
      })
    },
    


  };
  var Events = {
    gestures : function () {
      console.log("start gesture")
      var myElement = document.querySelector("main");
      var mc = new Hammer(myElement);
      mc.on("swipeleft", function() {
        console.log("gesture");
        location.reload();
        window.location.replace('#random');

      });
    }
  };
  var templateSelection = {

    templateSelect : function (route, context) {
      var main = document.querySelector("main");
      main.classList.add("fadeOut");
      setTimeout(function(){ 
        main.classList.remove("fadeOut");
        main.classList.add("fadeIn");
        var source = document.querySelector("#"+route+"-template").innerHTML;
      var template = Handlebars.compile(source);
      main.innerHTML = template(context);
       }, 200);
      
     
      
      }
  };

  launcher.init();
})();