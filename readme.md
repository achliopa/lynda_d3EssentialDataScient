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