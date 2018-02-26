var parseDate = d3.timeParse('%m/%d/%Y');

d3.csv('prices.csv')
	.row(d => { return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))};})
	.get((error,data) => {

		console.log(data);

		var nestedData = d3.nest()
							.key(d=>d.month.getMonth())
							.entries(data);

		console.log(nestedData);
});

d3.tsv('prices.tsv')
	.row(d => { return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))};})
	.get((error,data) => {

		// console.log(data);

});

var psv = d3.dsvFormat('|');
d3.text('prices.txt')
	.get((error,data) => {
		// .row(d => { return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))};})
		var rows = psv.parse(data);
		var newRows = rows.map(d => {
			return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))};
		});
		// console.log(newRows);

});

d3.json('treeData.json').get((error,data) => {
	// console.log(data[0].children);
})

d3.xml('data.xml').get((error,data) => {
	var xmlLetter = data.documentElement.getElementsByTagName('letter');
	// console.log(data.documentElement);
	var letterNodes = d3.select(data).selectAll('letter');
	// console.log(letterNodes);
});

d3.text('test.txt').get((error,data) => {
	var myTabPositions = [];
	var myNewLinePositions = [];

	var tabVal = '\\b\t\\b';
	var tabMod = 'g';
	var tabRegExp = new RegExp(tabVal,tabMod);
	var lineVal = '\\b\n\\b';
	var lineMod = 'g';
	var lineRegExp = new RegExp(lineVal,lineMod);

	// custom parsing function
	data.replace(tabRegExp, (a,b) => { myTabPositions.push(b); return a; });
	data.replace(lineRegExp, (a,b) => { myNewLinePositions.push(b); return a; });

	// console.log(myTabPositions);
	// console.log(myNewLinePositions);
});

d3.html('https://enable-cors.org').get((error,data) => {
	// console.log(data);
	var frag = data.querySelector('div');
	console.log(frag);
});