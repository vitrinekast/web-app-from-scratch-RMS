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
        'twee' : function() {
         var context = {
            "city": "London",
            "street": "Baker Street",
            "number": "221B"
          };
          templateSelection.templateSelect(window.location.hash, context);
        },
        'drie' : function() {
          var context = {
            "city": "London",
            "street": "Baker Street",
            "number": "221B"
          };
          templateSelection.templateSelect(window.location.hash, context);
        },
        '*' : function() {
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
var request = {
    url: 'http://food2fork.com/api/search?key=efddf9c1cff2a075b4ad2d08ea06d2f4&q=shredded%20chicken',
    headers: { "X-Mashape-Key": '<required>', "Accept" : "application/json" }
}

      microAjax("https://food2fork.com/api/search?key=efddf9c1cff2a075b4ad2d08ea06d2f4&q=shredded%20chicken", function(data){debugger;
        var data = JSON.parse(data);
        var context = {
          count: data.count,
          recipesTitle: data.recipes[0].title
        }
      
      });
      templateSelection.templateSelect(window.location.hash, context);

    }
    }
  
 
  app.init();


})();