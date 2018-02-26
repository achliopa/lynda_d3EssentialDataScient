var parseDate = d3.timeParse('%Y');

d3.xml('data2.xml').get((error,xml)=>{

	var height = 200;
	var width = 500;
	var margin = {left:50,right:50,top:40,bottom:0};

	xml = [].map.call(xml.querySelectorAll('dat'),d=>{
		return {

			date: parseDate(d.getAttribute('id')),
			top: +d.querySelector('top').textContent,
			middle: +d.querySelector('middle').textContent,
			bottom: +d.querySelector('bottom').textContent

		};
	});

	var x = d3.scaleTime()
		.domain(d3.extent(xml, d=>d.date))
		.range([0,width]);

	var y = d3.scaleLinear()
		.domain([0,d3.max(xml,d=>d.top+d.middle+d.bottom)])
		.range([height,0]);

	var categories = ['top','middle','bottom'];

	var stack = d3.stack().keys(categories);

	var area = d3.area()
				.x(d=>x(d.data.date))
				.y0(d=>y(d[0]))
				.y1(d=>y(d[1]));

	var svg = d3.select('body').append('svg').attr('width','100%').attr('height','100%');
	var chartGroup = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`);

	var stacked = stack(xml);
	console.log(stacked);
	chartGroup.append('g').attr('class','x axis')
		.attr('transform', `translate(0,${height})`)
		.call(d3.axisBottom(x));
	chartGroup.append('g').attr('class','y axis')
		.call(d3.axisLeft(y).ticks(5));

	// chartGroup.selectAll('path.area')
	// 	.data(stacked)
	// 	.enter().append('path')
	// 		.attr('class','area')
	// 		.attr('d',d=>area(d));

	chartGroup.selectAll('g.area')
		.data(stacked)
		.enter().append('g')
			.attr('class','area')
		.append('path')
			.attr('class','area')
			.attr('d',d=>area(d));
});