var height = 200;
var width = 500;

var margin = {left:50,right:50,top:40,bottom:0};

var tree = d3.tree().size([width,height]);

var svg = d3.select('body').append('svg').attr('height','100%').attr('width','100%');
var chartGroup = svg.append('g').attr('transform','translate('+margin.left+','+margin.top+')');

d3.json('treeData.json').get((error,data) => {

	// console.log(data[0]);
	var root = d3.hierarchy(data[0]);
	// console.log(root);
	tree(root);
	chartGroup.selectAll('circle')
		.data(root.descendants())
		.enter().append('circle')
			.attr('cx',d=>d.x)
			.attr('cy',d=>d.y)
			.attr('r','5');

	chartGroup.selectAll('path')
		.data(root.descendants().slice(1))
		.enter().append('path')
			.attr('class','link')
			// .attr('d',d=>`M${d.x},${d.y}L${d.parent.x},${d.parent.y}`);
			.attr('d',d=>`M${d.x},${d.y}C${d.x},${(d.parent.y+d.y)/2} ${d.parent.x},${(d.parent.y+d.y)/2} ${d.parent.x},${d.parent.y}`);

});