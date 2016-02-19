baseURL: "https://api.brewerydb.com/v2",
    apiKEY: "c242e13bd62778ab51790bf22fd04269",

    getBeer : function(endPoint, template) {
      var requestUrl = "https://api.brewerydb.com/v2" + endPoint + "&key=" + beer.apiKEY + "&format=json";
      beer.singleRequest(requestUrl, template);
    },
    getList : function (template) {
      var requestUrl = "https://api.brewerydb.com/v2/beers?availableId=1&key=" + beer.apiKEY + "";
      beer.multipleRequest(requestUrl, template, false);
    },
    getAmsterdam : function (template) {
      var requestUrl = "https://api.brewerydb.com/v2/search?q=amsterdam&type=beer&key=" + beer.apiKEY + "&format=json";
      beer.multipleRequest(requestUrl, template, false);
    },
    singleRequest : function (requestUrl, template) {
      console.log("request URL is " + requestUrl);
      microAjax(requestUrl, function(data) {
        data = JSON.parse(data);
        templateSelection.templateSelect(template, data);
        console.log(data.data.styleId)
      })
    },
    
    multipleRequest : function (requestUrl, template) {
      console.log("request URL is " + requestUrl);
      microAjax(requestUrl, function(data) {
        data = JSON.parse(data);
        var cleanData = _.map(data.data, function (items) {
                    return _.pick(items, 'name', 'id');
        });
        templateSelection.templateSelect(template, {
            "data" : cleanData
        });
        console.table(cleanData);
      });
    }