// @TODO: YOUR CODE HERE!
//d3.csv

var svgHt=600
var svgWdth=600

var margin ={
    top: 20,
    bottom: 800,
    right: 50,
    bottom: 50,
    }
var tPadBottom = 40;
var tPadLeft = 40;
    // space for placing words
var area4Label = 110;
//size of item
var width = svgWdth - margin.left-margin.right
var height = svgHt -margin.top - margin.bottom

//wrap
var svg = d3.select('#scatter')
    .append('svg')
    .attr('width', svgWdth)
    .attr('height',svgHt)
    .attr("class", "chart")
//the x or bottom axis
svg.append("g").attr("class", "theXText")
var theXText = d3.select(".theXText")

function theXTextRefresh() {
    theXText.attr(
      "transform",
      "translate(" + ((width - area4Label) / 2 + area4Label) +
        ", " +(height - margin - tPadBottom) +")"
    )
  }
  theXTextRefresh()

  //poverty
  theXText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("Poverty (%)")

  var leftTextX = margin + tPadLeft
  var leftTextY = (height + area4Label) / 2 - area4Label

//the y or left label
  svg.append("g").attr("class", "theYText")
  var theYText = d3.select(".theYText")

function theYTextRefresh() {
    theYText.attr("transform", "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)")
  }
  theYTextRefresh()

  //healthcare
theYText
.append("text")
.attr("y", 26)
.attr("data-name", "healthcare")
.attr("data-axis", "y")
.attr("class", "aText inactive y")
.text("No Healthcare (%)")



//chart group
var chartGroup = svg.append("g")
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

d3.csv('assets/data/data.csv', function(data){
    console.log('loaded csv')

var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);
})