var math = {
	init: function (dataset) {
		console.log('math.init');
		console.log(dataset.Objects[0].Prijs.Koopprijs);
		var prijzenHolder = math.gemiddelde(dataset);
		dataset = math.isduurder(dataset, prijzenHolder);
		response = [prijzenHolder, dataset]
		return response
	},
	gemiddelde : function (dataset) {
		console.log('start gemiddelde')
		var totaalPrijs = 0;
		var prijzenArray = []

		for (var i = 0; i < dataset.Objects.length; i++) {
			prijzenArray.push(dataset.Objects[i].Koopprijs);
			totaalPrijs += dataset.Objects[i].Koopprijs;
		}

		var prijzenHolder = {
			gemiddeld: totaalPrijs / dataset.Objects.length,
			hoogste: Math.max.apply(Math, prijzenArray),
			laagste: Math.min.apply(Math, prijzenArray),
		}
		prijzenHolder.gemiddeldPerc = (prijzenHolder.gemiddeld * 100) / prijzenHolder.hoogste
		console.log(prijzenHolder);
		return prijzenHolder
	},
	isduurder : function (dataset, prijzenHolder) {
		console.log('start isduurder' + prijzenHolder)
		for (var i = 0; i < dataset.Objects.length; i++) {
			dataset.Objects[i].percentageKoopPrijs = (dataset.Objects[i].Koopprijs * 100) / prijzenHolder.hoogste;
			if (dataset.Objects[i].Koopprijs >= prijzenHolder.gemiddeld) {
				dataset.Objects[i].duurder = true;
			}
			else {
				dataset.Objects[i].duurder = false;
			}
		}
		return dataset
	}
}


	