gedrag = {
	init: function() {
		console.log('gedrag.init');
		var navknop = document.querySelector("#nav-button");
		var navLinks = document.querySelector("nav a");
		var nav = document.querySelector('nav');
		var body = document.querySelector('main');
		body.onclick = function() {
			nav.classList.remove('show');
		}
		navknop.onclick = function() {
			console.log('click');
			nav.classList.toggle('show');

		}
		navLinks.onclick = function () {
			console.log('click');
			nav.classList.remove('show');
		}

		Handlebars.registerHelper('html_decoder', function(text) {
		  var str = unescape(text).replace(/&amp;/g, '&');

		  var div = document.createElement('div');
		  div.innerHTML = str;
		  return div.firstChild.nodeValue; 
		});

		function grafiek() {

var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
    console.log(bar);


    return chart
		}

		 Handlebars.registerHelper('list', function() {
 			return grafiek();;
})
		}
}