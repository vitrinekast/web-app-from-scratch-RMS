(function () {
  "use strict"

  console.log('app is gestart')
  
  var app = {

    init : function () {
      console.log("app.init()");
      
      routie({
        'list' : function() {
          beer.getList('list');
        },
        
        'amsterdam' : function() {
          beer.getAmsterdam('amsterdam')
        },

        ':id' :function() {
          var id = window.location.hash;
          if( id.charAt(0) === '#' ) {
            id = id.slice( 1 )
          };
          var endPoint = "/beer/" + id + "?";
          beer.getBeer(endPoint, "detail");
        }
        
      });
    }
  };

  var beer = {
    baseURL: "https://api.brewerydb.com/v2",
    apiKEY: "504db67d6c37be210d33ce3a0ab0169b",

    getBeer : function(endPoint, template) {
      var requestUrl = "https://api.brewerydb.com/v2" + endPoint + "&key=" + beer.apiKEY + "&format=json";
      beer.request(requestUrl, template);
    },
    getList : function (template) {
      var requestUrl = "https://api.brewerydb.com/v2/beers?availableId=1&key=" + beer.apiKEY + "&format=json";
      beer.request(requestUrl, template);
    },
    getAmsterdam : function (template) {
      var requestUrl = "https://api.brewerydb.com/v2/search?q=amsterdam&type=beer&key=" + beer.apiKEY + "&format=json"
      
      microAjax(requestUrl, function(data) {
       
        
        console.log(requestUrl)
        var picked = _.map(data, function (items) {
                    return _.pick(items, 'name', 'id');
        });

        var filtered = _.filter(data.data, function(obj) {
          console.log(obj.name.toLowerCase().indexOf("amsterdam"));
          return ~obj.name.toLowerCase().indexOf("amsterdam");
          
        })

        console.log(picked)
       
        templateSelection.templateSelect(template, picked);
      })

    },
    request : function (requestUrl, template) {
      console.log("request URL is" + requestUrl);
      microAjax(requestUrl, function(data) {
        data = JSON.parse(data);
        templateSelection.templateSelect(template, data);
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
  }

  app.init();


})();