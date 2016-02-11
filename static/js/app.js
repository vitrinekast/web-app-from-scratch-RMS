(function () {
  "use strict"

  console.log('app is gestart')
  var app = {
    init : function () {
      console.log("app.init()");

      routie({
        'list' : function() {
          var endPoint = "/beers?availableId=1&";
          beer.getStyle(endPoint, 'list');
          
        },
        
        'info' : function() {
         var context = {
            "city": "Rotterdam",
            "street": "Baker Street",
            "number": "221B"
          };
          templateSelection.templateSelect('info', context);
        },
        'over' : function() {
          var context = {
            "city": "London",
            "street": "Baker Street",
            "number": "221B"
          };
          templateSelection.templateSelect('over', context);
        },
        ':id' :function() {
          var id = window.location.hash;
          if( id.charAt(0) === '#' ) {
            id = id.slice( 1 )}
          var endPoint = "/beer/" + id + "?";
          console.log(endPoint);
          beer.getStyle(endPoint, "detail");
          
        }
        
      })
    }
  };

  
  

  var beer = {
    baseURL: "https://api.brewerydb.com/v2",
    apiKEY: "504db67d6c37be210d33ce3a0ab0169b",

    getStyle : function(endPoint, template) {
      var requestUrl = beer.baseURL + endPoint + "key=" + beer.apiKEY + "&format=json";
      console.log(requestUrl);
      microAjax(requestUrl, function(data) {
        data = JSON.parse(data);
        console.log("start looking for" + endPoint);
        
        var context = {
          
        };
        console.log(data)
        templateSelection.templateSelect(template, data);
        
        
      
      });
    }

  };
  
  var templateSelection = {
    templateSelect : function (route, context) {
      console.log(context)
      var source = $("#"+route+"-template").html();
      var template = Handlebars.compile(source);
      console.log(context.currentPage)
      $("main").html(template(context))

      }
  }

  app.init();


})();