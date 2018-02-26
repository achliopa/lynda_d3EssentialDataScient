var data = [];

data[0] =[];
data[1] =[];
data[2] =[];
data[3] =[];

data[0][0] = [1,2,3];
data[0][1] = [4,5,6];
data[1][0] = [7,8];
data[1][1] = [9,10,11,12];
data[1][2] = [13,14,15];
data[2][0] = [16];
data[3][0] = [17,18];
data[3][1] = [19];
data[3][2] = [20,21];
data[3][3] = [22,23,24,25];



console.log(data);

var width = 1000;
var height = 240;
var barWidth = 100;
var barGap = 10;


var margin = {left:50,right:50,top:0,bottom:0};

var svg = d3.select('body').append('svg').attr('width',width).attr('height',height);
var chartGroup = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`);

var firstGroups = chartGroup.selectAll('g')
	.data(data)
	.enter().append('g')
		.attr('class',(d,i)=>`firstLevelGroup${i}`)
		.attr('transform',(d,i)=>`translate(${i*(barWidth+barGap)},0)`);

// console.log(firstGroups);

var secondGroups = firstGroups.selectAll('g')
	.data(d=>d)
	.enter().append('g')
	.attr('class',(d,i)=>`secondLevelGroup${i}`)
	.attr('transform',(d,i)=>`translate(0,${height-((i+1)*50)})`);

// console.log(secondGroups);

secondGroups.append('rect')
	.attr('x',(d,i)=>0)
	.attr('y',0)
	.attr('width',100)
	.attr('height',50)
	.attr('class','secondLevelRect');

secondGroups.selectAll('circle')
	.data(d=>d)
	.enter().append('circle')
		.filter(d=>d>10)
		.attr('cx',(d,i)=>(i*21)+10)
		.attr('cy',25)
		.attr('r',10);

secondGroups.selectAll('text')
	.data(d=>d)
	.enter().append('text')
		.attr('x',(d,i)=>(i*21)+10)
		.attr('y',25)
		.attr('class','txt')
		.attr('text-anchor','middle')
		.attr('dominant-baseline','middle')
		.text((d,i,nodes)=>d);