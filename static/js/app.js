(function () {
  "use strict"

  console.log('app is gestart')
  var app = {
    init : function () {
      console.log("app.init()");

      routie({
        'start' : function() {
          food.init()
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

  var food = {
    init: function(){
      
      //added a object with headers
      var requestUrl = "http://food2fork.com/api/search?key=efddf9c1cff2a075b4ad2d08ea06d2f4&q=shredded%20chicken"
var request = {
    url: requestUrl,
    credential : ' OAuth ' + '{!GETSESSIONID()}',
    headers: { "X-Mashape-Key": '<required>', "Accept" : "application/json","SalesforceProxy-Endpoint": "request.url", "Authorization": "request.credential", "X-User-Agent": "MyClient"}
}

      microAjax(request, function(data){
        var data = JSON.parse(data);
       
        var context = {
          recipes: data.recipes,
          count: data.count,
          recipesTitle: data.recipes[0].title
        }
        console.log(data, context);
      templateSelection.templateSelect(window.location.hash, context);
      
      });

   

    }
    }
  
 
  app.init();


})();