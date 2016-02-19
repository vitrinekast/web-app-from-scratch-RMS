var router = function() {
	 return {
	 	init : function () {
      
      routie({
        
        'list' : function() {
          beer.getFullBeerList('list', 'beers?availableId=1&');
        },
        
        'amsterdam' : function() {
          beer.getFullBeerList('amsterdam', 'search?q=amsterdam&type=beer&');
        },
        'random' : function () {
          beer.getSingleBeer('detail', 'beer/random?');
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
	 }

    

}();