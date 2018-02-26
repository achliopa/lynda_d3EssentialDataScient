# Lynda.com Course: D3.js Essential Training for Data Scientists

## Section 1. Refresher

### Introducing SVG

* svg is an html block element, like a blank canvas.
* svg is the first and last element (tag) of every d3 graphic. we cannot have d3 without svg
* you cannot put a div or p in an svg. only rects lines text
* d3 binds data to the svg and styles it, manipulates it
* css styling for html does not always work with svg. svg has its own css properties

### Combining Javascript and D3

* we add boilerplate html file d3.html
* we add and import a stylesheet
* we add a d3.v4.js with the lib
* we add a shapes.js for our code
* we import both javascipt files in our code

## Section 2 - Making a Simple Bar Chart with D3

### Adding an SVG

* we make a project for live-server
* we write our code in shapes.js
* we declate a number arrat
* we add an svg element to html with js with d3.select().append()
* we set its height and width with attr()
* we select all rectangles from svg. this returns 0 rerctabgles as the svg is empty for now. then we call data to bind the array to the rectangles. what is left it goes in the enter() subselection. as there are no rectangles all data array items go into enter and are used in teh append(rect) so that an equal number of rects with the array items is created abd attached to the svg
* we give all rects same 4 core atttributes (height, width,x,y) so they are all on top of eachother
* we use the callback with d to distribute the bars dynamicaly based on the data bound and set their height
* canvas is top left zeroed so bars are reversed we need to subtract the height from a fixed number. we do this in a callback 

```
svg.selectAll('rect')
	.data(dataArray)
	.enter().append('rect')
		.attr('height',(d,i) => d*10)
		.attr('width','50')
		.attr('fill','orangered')
		.attr('x', (d, i) => 60 * i)
		.attr('y', (d,i) => 300-(d*10));
```

* if you  can style an element in css you can select it in d3
* when we use an enter() point for subselcection d3 creates an exit point forwhat elements are left unused (usualy from the data() function)

## Section 3 - Basic Shapes, Courtesy of SVG

###  Introducing SVG shapes

* rect .attr() Mandatory: x,y,width,height Optional: rx, ry, class, transform
* circle .attr() Mandatory: cx, cy, r Optional: class,transform
* ellipse .attr() Mandatory: cx,cy,rx,ry Optional: class, transform
* line .attr() Mandatory: x1,y1,x2,y2 Optional: class, transform
* text .text() .attr() Mandatory: x, y Optional: dx, yd, class, transform, text-anchor
* path: .attr() Mandatory: d Optional: class, transform, pathLength

* polygon and polyline are also supported but it is easier to use path

### Drawing Circles

* we use the same approach of preselecting circles, binding data, entering subselection ans appending circles while styling them with callbacks with data as their parameters

```
var newX = 300;
svg.selectAll('circle')
	.data(dataArray)
	.enter().append('circle')
		.attr('cx', (d,i) => {
			newX += (d*6) +(i*20);
			return newX;
		})
		.attr('cy','100')
		.attr('r', (d,i) => d*3);
```

### Drawing Elipses

* we first try to draw a new set of circles cping the code and changing position.
* nothing happens. why? because our code doesnt enter() the subselection as we select 3 circles and bind them to the data. there are no data left to eenter() in the subselection and append() more circles.
* we can solve that if we add classes to sepearate selections and avoid targeting same elements again and again

```
svg.selectAll('circle.first')
	.data(dataArray)
	.enter().append('circle')
		.attr('class', 'first')
...
```

* adding elipses

```
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
```

### Drawing Lines

* x & y values if not set default to zero
* svgs in d3 get no stroke and black fill as default. we need styling to add stroke so that a line gets shown
* we can style with attr

```
		.attr('stroke', 'blue')
		.attr('stroke-width', '2px');
```

* the result html is `<line x1="900" y1="80" x2="975" y2="80" stroke="blue" stroke-width="2px"></line>`

* we can style with .style

```
		.style('stroke', 'green')
		.style('stroke-width', '2px');
<line x1="900" y1="80" x2="975" y2="80" style="stroke: green; stroke-width: 2px;"></line>
```

* style wins over attr in CSS priority of styling
* a third way is to style in CSS stylesheet

```
line {
	stroke: red;
}
```

* style() beats CSS stylesheet that beats attr() in CSS precedence
* in CSS we can add pseudoclasses (hover effects)

### Rejecting Polygons and Polylines

* nobody uses them. all use Path

### Adding Text

* we use `svg.append('text').text('hello world');` to add text and by default it zeroes x, y if not defined the result svg tag is `<text>hello world</text>` we add x and y with attr() the result htmnl is `<text x="900" y="150">hello world</text>`
* svg text is different than html text. each svg letter is a shape
* we manipulate tthe text in javascript . we can use CSS to do it
* with text the insert approach is different than with shapes. here we append each and every text separately
* we can treat texgt as shape in svg we can fill and stroke to it
* we can align horizontically with 'text-anchor' attribute taking values start, middle, end to relate text top the x dimension
* to align verticaly we use'dominant-baseline'. values used are middle and many others to position on the y axis related to the y dimension
* to add a new line in text in d3 we use t-span as svg eleemnt to preselect and append
* we pass the data and insert it in text() with the callback and set y with the callback to avoid overlap

```
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
```

## Section 4 - Advanced Shapes, with D3 and Path

### Introducing path

* path is a set of data points . it can contain thousands
* path = 'Mx,y Lx,y Lx,y z' => Mx,y is the starting point. L are lines and z is to close or return to the original point. instead of L we can have Cx,y for curves.
* more on [W3.org SVG paths](https://www.w3.org/TR/SVG/paths)
* in d3 we use generators to create paths

### Explaining Generators

* with thouzands of data points its impossible to draw a path manually poin to point
* d3 offers generators for common shapes : e.g line, path , area
* we write our test code in interpolate.js file
* svg line is an element, d3 line is a generator
* to test the generator we define an array of dataobjects with point coordinates

```
var dataArray = [{x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}];
```

* we set the svg with d3
* we define our line generator setting callbacks for the x and y of lines

```
var line = d3.line()
				.x((d,i) => d.x*6)
				.y((d,i) => d.y*4);
```

* we append a path using the linegenerator

```
svg.append('path')
	.attr('stroke','blue')
	.attr('fill','none')
	.attr('d',line(dataArray));
```

* the geenrated svg elemetn is `<path stroke="blue" fill="none" d="M30,20L60,60L120,28L180,72L240,40"></path>`

* if we use a curve in our line gerator `.curve(d3.curveCardinal)` the generated path is `<path stroke="blue" fill="none" d="M30,20C30,20,45,58.666666666666664,60,60C75,61.333333333333336,100,26,120,28C140,30,160,70,180,72C200,74,240,40,240,40"></path>`

### Drawing an area chart

* we will use an area generator. our code in area.js

* again we define a dataArray with a numbers, we define the area generator which has 3 variables. x axis points, y0 (upper line) and y1 (lower line)

```
var area = d3.area()
			.x((d,i) => i*20)
			.y0(height)
			.y1(d => height-d);
```

* we append the generator to our svg with d3 and the generated path is '<path d="M0,175L20,174L40,172L60,168L80,163L100,155L120,145L140,130L160,110L180,80L200,65L220,50L240,40L260,32L280,28L300,23L320,20L320,200L300,200L280,200L260,200L240,200L220,200L200,200L180,200L160,200L140,200L120,200L100,200L80,200L60,200L40,200L20,200L0,200Z"></path>'

### Finding other Generators

* there are 20 generators in the API

### Introducing Groups

* you can put anything in a group. 
* you cannot style them they are not physical . they are conceptual
* they help organize, move together etc.
* we append a group in the svg
* we add a line path and an array of circles to the group
* we define an array of interpolateTypes
* we wrap line generation and shape appending to the group ina for loop
* we add dynamic class name to circles to draw all iterations
* we have now 6 lines with circles/points on top of each other
* we use translate to shift groups away from eachother using iteration index as x param
* we add dynamic curve stale by passing the array val
* we pass a parametric class name to each group. 
* class and transform are the most used attributeds in groiups
* we add some style in CSS using group class

```
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
```

## Section 5 - Scales and Axes

### Introducing Scales

* d3 offers axis generators, manual is also possible but more difficult
* d3 will draw axis lines, tickmarks and axis labels dynamically
* axis data can be grouped
* d3 axes can show dates, strings or numeric data
* axis use scales. scales use domains as inputs and ranges as outputs
* domain of data array : data min 0 - data max 10000
* range of axis : axis min 0px - axis max 300px
* to compensate for top-left zero in d3 we reverse the map between domain and range in the y axis

### Create a Linear Scale

* we link to area.js
* we do y axis first
* in the call we define type of scale the domain and range

```
var y = d3.scaleLinear()
			.domain([0,180])
			.range([height, 0]);
```

### Creating a linear axis

* we will define our linear axis generator. it uses scale to place elements on the map
* axis has four types. axisLeft, Right, Top, Bottom , it tells where to put labels relative to the line. its not about positioning the line `var yAxis = d3.axisLeft(y);`
* to place it we define a group and append it to the svg `svg.append('g').attr('class','axis y').call(yAxis);`
* with call we put in group the yAxis
* to align chart and axis we apply this technique. we create amargin object and use it to position the elements.
* the most elegant way is append a group to svg, position it and then add chart and scale to it.

### Positioning and Formatting our Axis

* we see in the generated markup that axisLeft() add to the axis labels the text-anchor: end property. in axisRight it is text-anchor: start
* our tick lines are red because of the CSS property line { stroke: red }
* we can resttyle in CSS choosing our selectors from the generated markup tags
* we can chain tick styling props `var yAxis = d3.axisLeft(y).ticks(3).tickPadding(10).tickSize(10);`
* requested num of ticks is suggestive. d3 selects the optimal close to our decision

### Creating a Time scale

* we are going to use our dateYears array to drive the x scale
* we use d3.timeParse() method to parse the years string from the array using ta string interpollation argument.
* d3.max() can get 2 arguments . aprt from the array the map method as a callback using the parser.
* d3.extent() returns the range of the array (min, max)
* we use this in the scale domain `domain([d3.extent(dataYears,d=>parseDate(d))])`

### Creating Time series axis

* we define an xAxis var like the y and append it to the chartGroup as a group.
* we have a x axis range issue as x in are is static with 20px between points. we need to mak eit data dependent
* we cannot use x(d) as it refers to dataArray of Yax `.x((d,i) => x(parseDate(dataYears[i])))`

### Creating an ordinal scale and axis

* there are 3 other types of scales, ordinal, quantize, sewuential
* ordinal scales contain category labels. they display strings passed to them and not calculated values
* we will add ordinal axis at shapes.js
* we add an array of strings
* we set the ordinal scale

```
var x = d3.scaleOrdinal()
		.domain(dataDays)
		.range([25,85,145]);

var xAxis = d3.axisBottom(x);
```

* in ordinal scale we se the exact position of ticks in range()
* we append the axis as a group to svg
* we can  remove the line and leave only labels with display: none in CSS. the selector is g.class line & path
* instead of scaleOrdinal we can use scalePoints and pass the whole range in range. this distributes ticks including start and end. scaleBand is the best option as it accepts a range and by adding in paddingInner() the percentage of padding in our chart it places the ticks exactly below the bars without manual setting.

### Using Color Scales

* d3 offers preset colorRanges eg. d3.interpolateRainbow. we can add custom ranges
* we use scaleSequential for our color scale. sequential scale takes an algorithm to calculate range() from domain() so it does not need .range() defined. e.g. `var rainbow = d3.scaleSequential(d3.interpolateRainbow).domain([0,10]);`
* the domain definition above splits the rainbow range  in 10 and uses the first 10th
* we use it `.attr('fill',(d,i) => rainbow(i))`. as our d has 3 points we use 3 colors of the 10th of the rainbow
* istead of preset ranges we can use custom range with arrays of hex value stings to represenbt rgb colors.
* we can use predef hex vals with `var cat20 = d3.schemeCategory20;` ... '.attr('fill',(d,i) => cat20[i])'
* d3 v4 offers a plugin called scale chromatic 

### Introducing other scales

* linear, logarithmic, natural log (ln), squareroot, power*2, quantile (%), quantize, threshold

## Chapter 6 - Importing Data into D3

### introducing external data

* d3 has built-in handlers fro csv, xml, tsv, json, txt, html, dsv, custom files
* they are grouped a) HTML,txt,custom b) csv,tsv,dsv c) json,xml

### Parsing a CSV file

* we create a csv file and a js file
* we try the builtin d3 csv parser 

```
d3.csv('prices.csv').get((error,data) => {
	console.log(data);
});
```

* we get is an array of key value pairs, where the key is the index and the value is the object containing each line's data
* we can get the date out of the date string with a d3 middleware function
* we first setup the parser with the used date format interpolator `var parseDate = d3.timeParse('%m/%d/%Y');`
* the before get we add `.row(d => { return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))};})`
* this line formats the object to be returned trimming the dollar sign from the price and getting the Date object from the parser method

### Drawing a line chart from CSV data

* we add styles in CSS for path
* we add our graph generating code in the get callback function where we had the console.log
* this is an one off async function called when csv parsing is done
* the first part of our code is time specific with scaleTime and min max def.

```
var max = d3.max(data, d => d.price);
		var minDate = d3.min(data, d => d.month);
		var maxDate = d3.max(data, d => d.month);

		var y = d3.scaleLinear()
				.domain([0, max])
				.range([height, 0]);

		var x = d3.scaleTime()
				.domain([minDate, maxDate])
				.range([0, width]);
```

* the rest of the code is same as before. for the graph we use a line generator and we use scaling in our callbacks

### Using TSV and DSV

* TSV same as CSV but *tab* separated not *comma* separated 
* we create a txt file with | instead of , for parsing
* in txt parser we cannot use rows as it is not supported because text is not row defined.
* in the get() callback we set `var rows = psv.parse(data);` where psv is defined before as `var psv = d3.dsvFormat('|');`
* we console.log the rows but it contains data in string format
* we do our own custom row parser with map() creating a newRow with properly formated Date

### Parsing JSON

* we create a tree like JSON and parse it with

```
d3.json('treeData.json').get((error,data) => {
	//use data
});
```

* json supports deep onject nesting

### Parsing and Mapping XML

* we create n XML file for testing
* we test parsing with d3.xml()

```
d3.xml('data.xml').get((error,data) => {
	console.log(data);
});
```

* the output is a document not object
* to make it an object we use vanilla js `var xmlLetter = data.documentElement.getElementsByTagName('letter');`
* or we use innate d3 functions `var letterNodes = d3.select(data).selectAll('letter');` to parse XML elements much like HTML.

### Parsing a TXT file

* avoid when possible
* d3 imports txt files as strings. we must distinguish between piped row data txt files 

```
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

	console.log(myTabPositions);
	console.log(myNewLinePositions);
```

* in the above snippet we set regexp to detect the positions of tabs and newlines to detect data and parse them

### Parsing HTML

* d3.html() returns a document much like XML parser
* CORS = cross origin resource sharing must be enabled to be able to scrabe data from html markup

### Introducing other data methods

* general syntax

```
d3.request(url)
	.row((d)=>{/* format row */})
	.get(callback)
```

* using request we can make our own custom parser *https://github/d3/d3-request*

```
d3.request(url,formatRow, callbacl);


function formatRow() {return format(d);}

function callback(error, rows) {
	if (error) throw error;
}
```

## Chapter 7 - Additional Graphics with D3 Layout

### Introducing Layout

* Layouts are like D3 Generators: input data and output (x,y) coordinates
* some layouts do more
* layouts make it easier to make complex graphics

### Making a tree diagram out of JSON

* we add an ew js file to host our diagram
* we use d3.tree() layout which gets .size function with params not min max but height and width (2D) x,y axis
* we parse our json to get a nester array to get our root element we identify it with data[0]
* if we work with hirarchical data in d3 we must provide the root element
* `ar root = d3.hierarchy(data[0]);` return an Node object with children as objects
* if our data did not have tree structure but were tabular we then would have to give them tree hierarchy with d3.stratify()

```

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
```

* this code runs in jhson callback and makes a tree with circles and curvy paths

### Making a Voronoi Tesselation

* we will put CSS and JS in HTML (index.htm in voronoi folder)
* d3.range(100) creates an array with  100 numbers in it
* we use .map to replace the array with an array of random x,y coordinates
* we create our voronoi layout with voronoi layout generator `var voronoi = d3.voronoi().size([width,height]);`
* we then put the random coordinates on svg as circles 
* then we add a path passing to it the voronoi.polygons and set its d path

```
			var width = 960;
			var height = 500;

			var vertices = d3.range(100).map(d=>[Math.random()*width, Math.random()*height]);
			console.log(vertices);

			var voronoi = d3.voronoi().size([width,height]);
			var svg = d3.select('body').append('svg').attr('width','100%').attr('height','100%');
			svg.append('g').attr('class','fuel')
				.selectAll('circle')
				.data(vertices)
				.enter().append('circle')
					.attr('cx',d=>d[0])
					.attr('cy',d=>d[1])
					.attr('r','2.5');

			svg.append('g').attr('class','polygons')
				.selectAll('path')
				.data(voronoi.polygons(vertices))
				.enter().append('path')
					.attr('d',d => 'M'+d.join('L')+'Z');
```

* we cannot use z-index in svg
* we set order with the order of d3 .code


### Introducing other layouts

* dendrogram(mike bostock tree)
* radial tree (mike bostock)
* tree map, rainbow treemap,circle packing, partition
* arc padding
* fixed radius near neighbors, draggable blob
* chord diagram
* hexagonal binning

## Chapter 8 - Preparing Your Data for Advanced Graphics

### Data manipulation

* prepare your data , 
* we have used ready data for parsing
* we might need to filter,group, nest the data

### Prepare stack data using map

* we add stack.js for our code
* we create a data2.xml file for parsing with years id and 3 values top,middle,bottom
* we parse xml with d3
* we set boilerplate code for positioning and margin
* we use map to fill data array (xml) with extracted dtat from xml rows
* we create a timescale and linear scale for axis
* we set 3 categories
* we use stack generator to do a stacked chart using the categories for naming
* we use an area path generator
* we add svg to body and a chartgroup (boilerplate)
* we instantiate the stack generator passing the xml array
* we console log. we see that the 3 gategories that mach the mapped arrady object keys create 3 arrays with the points for the chart

### Drawing a stack area chart

* in d3 v4 we can declare both axis in one line
* we append axis to the group
* to add our path to the group we cannot just append it because we have multiple (3) in stack. so we preselect selectAll and use enter to append in subselection

```
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
```

* we can access data d for path despite the multiple group definition

### Advancing Selections

* we add select.js prefilling it with a 4by 2 array with some numbers prefilled in nested arrays
* we add some styling for rects , circles and text and we add some dimensioning
* we will create a stacked barchart filled with numbers in circles representiung the array
* we start as always with  dimensioning
* we create svg and chartgroup
* we need to create 4 groups for each column and shift each group to the horizontal position. these are the firstgroup as data has size of 4
* we need to add secondgroup to each firstgroup depending on the subarray size addign group to the group
* always console.log(d) to see the data parsed
* data(d=>d) is going one level deep into data hierarchy
* node is used as a 3rd accesor in callbacks to give us the node list of the parent element

### Make flat data multidimensional

* d3 has a number of function for manipulating data 
* nest method turns flat tablar data into hierarchical data
* in csv parser in dataHandlers.js we have one object per row. each object contains a month data and price
* we and d3.nest() which contains a key() and entries() method. entries() contains the data we want to nest. key says how we want to group data

```
		var nestedData = d3.nest()
							.key(d=>d.month.getMonth())
							.entries(data);
```

* our example groups the data by month and makes the array from 36 entries to 12 each entry contains 3 rows one per year for the given month
* getMonth() assigns a 0 based month index
* nested treemap uses this technique

### Filtering Data

* sometimes we dont have to show a point for every element in the dataset
* we use d3.filter to filter data points that print circles
* we use select.js and add d3.filter to show only circles greater than 10
* our filter get a callback with the condition
* filter goes after append so that we have the d passed fro subselection
* d3 has array.filter if we want to alter the array
* elemetns apear in html but have no attributes so do  not show on screen