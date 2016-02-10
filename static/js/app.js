(function () {
  "use strict"

  console.log('app is gestart')
  var app = {
    init : function () {
      console.log("app.init()");

      routie({
        'list' : function() {
          beer.style()
        },
        'detail-1' :function() {
          beer.styleID()
        },
        'info' : function() {
         var context = {
            "city": "Rotterdam",
            "street": "Baker Street",
            "number": "221B"
          };
          templateSelection.templateSelect(window.location.hash, context);
        },
        'over' : function() {
          var context = {
            "city": "London",
            "street": "Baker Street",
            "number": "221B"
          };
          templateSelection.templateSelect(window.location.hash, context);
        }
        
      })
    }
  };

  
  var templateSelection = {
    templateSelect : function (route, context) {
      var theTemplateScript = $(""+route+"-template").html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      var theCompiledHtml = theTemplate(context);
      $('main').html(theCompiledHtml);
    }
  }

  var beer = {
    style: function(){
      var requestURL = "https://api.brewerydb.com/v2/styles?key=504db67d6c37be210d33ce3a0ab0169b&format=json";
      microAjax(requestURL, function(data) {
        console.log('start request beer styles');
        var data = JSON.parse(data);
        var context = {
          name: data.data[1].name
      }
      
       
      templateSelection.templateSelect(window.location.hash, data);

      })
    },
    styleID: function() {
      var requestURL = "https://api.brewerydb.com/v2/style/3?key=504db67d6c37be210d33ce3a0ab0169b&format=json";
      microAjax(requestURL, function(data) {
        console.log('start request beer styles');
        var data = JSON.parse(data);
        var context = {
          name: data.data[1].name
      }
      
       console.log("yo" + data.name)
      templateSelection.templateSelect(detail, data);

      })
    }


  }


      
    //   //added a object with headers
    //   var requestUrl = "https://api.brewerydb.com/v2/beer/oeGSxs?key=504db67d6c37be210d33ce3a0ab0169b&format=json"
    //   var request = {
    //     url: requestUrl,
    //     credential : ' OAuth ' + '{!GETSESSIONID()}',
    //     headers: { "X-Mashape-Key": '<required>', "Accept" : "application/json","SalesforceProxy-Endpoint": "request.url", "Authorization": "request.credential", "X-User-Agent": "MyClient"}
    //   }


    //   microAjax(request.url, function(data){
    //     console.log('go')
    //     // request.setRequestHeader('Connection', 'close');
    //     var data = JSON.parse(data);
       
    //     var context = {
    //       name: data.data.name,
         
    //     }
    //     console.log(data, context);
    //   templateSelection.templateSelect(window.location.hash, context);
      
    //   });

   

    // }
    // }
  
 
  app.init();


})();