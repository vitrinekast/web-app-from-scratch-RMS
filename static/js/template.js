template = {
  init: function(route, context) {
    var main = document.querySelector("main");
    var source = document.querySelector("#"+route+"-template").innerHTML;
    var template = Handlebars.compile(source);
    main.innerHTML = template(context);
  }
}
