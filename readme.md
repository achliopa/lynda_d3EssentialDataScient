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

*