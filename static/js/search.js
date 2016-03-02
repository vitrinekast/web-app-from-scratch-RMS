search = {
  	init: function() {
		console.log('start search.js');
	  	var searchBar = document.querySelector('header input');
	  	console.log(searchBar.value);
	  	var request = searchBar.value;
	  	api.listRequest(request, 'lijst');
  	}
}
