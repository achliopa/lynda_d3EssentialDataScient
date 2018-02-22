var dataArray = [5,11,18];

var svg = d3.select('body').append('svg').attr('height', '100%').attr('width', '100%');

// add a barchart

svg.selectAll('rect')
	.data(dataArray)
	.enter().append('rect')
		.attr('height',(d,i) => d*10)
		.attr('width','50')
		.attr('fill','orangered')
		.attr('x', (d, i) => 60 * i)
		.attr('y', (d,i) => 300-(d*10));

// add a bubble chart

var newX = 300;
svg.selectAll('circle.first')
	.data(dataArray)
	.enter().append('circle')
		.attr('class', 'first')
		.attr('cx', (d,i) => {
			newX += (d*3) +(i*20);
			return newX;
		})
		.attr('cy','100')
		.attr('r', (d,i) => d*3);

// add an elipse bubble chart

var newX = 600;
svg.selectAll('ellipse')
	.data(dataArray)
	.enter().append('ellipse')
		.attr('cx', (d,i) => {
			newX += (d*3) +(i*20);
			return newX;
		})
		.attr('cy','100')
		.attr('rx', (d,i) => d*3)
		.attr('ry', 30);

// add lines

var newX = 900;
svg.selectAll('line')
	.data(dataArray)
	.enter().append('line')
		.attr('x1', newX)
		.attr('y1',(d,i) => 80+(i*20))
		.attr('x2', (d,i) => newX + (d*15))
		.attr('y2', (d,i) => 80+(i*20))

// add text statically

// svg.append('text')
// 	.attr('x', newX)
// 	.attr('y', 150)
// 	.attr('fill','none')
// 	.attr('stroke','blue')
// 	.attr('stroke-width','2')
// 	.attr('text-anchor','start')
// 	.attr('dominant-baseline', 'middle')
// 	.attr('font-size',30)
// 	.text('start');
// svg.append('text')
// 	.attr('x', newX)
// 	.attr('y', 180)
// 	.attr('fill','blue')
// 	.attr('stroke','none')
// 	.attr('text-anchor','middle')
// 	.attr('dominant-baseline', 'middle')
// 	.attr('font-size',30)
// 	.text('middle');
// svg.append('text')
// 	.attr('x', newX)
// 	.attr('y', 210)
// 	.attr('stroke','blue')
// 	.attr('fill','none')
// 	.attr('text-anchor','end')
// 	.attr('dominant-baseline', 'middle')
// 	.attr('font-size',30)
// 	.text('end');

// svg.append('line')
// 	.attr('x1',newX)
// 	.attr('y1','150')
// 	.attr('x2',newX)
// 	.attr('y2','210');

// add text dynamically

var textArray = ['start','middle','end'];

svg.append('text').selectAll('tspan')
	.data(textArray)
	.enter().append('tspan')
	.attr('x', newX)
	.attr('y', (d,i) => 150+(i*30))
	.attr('fill','none')
	.attr('stroke','blue')
	.attr('stroke-width','2')
	.attr('text-anchor','start')
	.attr('dominant-baseline', 'middle')
	.attr('font-size',30)
	.text(d => d);

svg.append('line')
	.attr('x1',newX)
	.attr('y1','150')
	.attr('x2',newX)
	.attr('y2','210');