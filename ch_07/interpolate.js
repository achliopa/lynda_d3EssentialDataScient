var dataArray = [{x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}];

var svg = d3.select('body').append('svg').attr('height','100%').attr('width','100%');

var interpolateTypes = [d3.curveLinear, d3.curveNatural, d3.curveStep, d3.curveBasis, d3.curveBundle, d3.curveCardinal];

// d3 line generator
for (var p= 0; p < 6; p++){
	var line = d3.line()
					.x((d,i) => d.x*6)
					.y((d,i) => d.y*4)
					// .curve(d3.curveStep);
					.curve(interpolateTypes[p]);

	// group
	var shiftX = p*250;
	var shiftY = 0;
	var chartGroup = svg.append('g').attr('class','group'+p).attr('transform','translate('+shiftX+',0)');

	// append line to svg and add to group

	chartGroup.append('path')
		.attr('stroke','blue')
		.attr('fill','none')
		.attr('d',line(dataArray));

	// add dots on line  and add to group

	chartGroup.selectAll('circle.grp'+p)
		.data(dataArray)
		.enter().append('circle')
			.attr('class',(d,i)=> 'grp'+i)
			.attr('cx',(d,i) => d.x*6)
			.attr('cy',(d,i) => d.y*4)
			.attr('r','2');
}