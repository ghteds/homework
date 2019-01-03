function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(`/metadata/${sample}`).then(function(data){
    var theSampleMD = d3.select('#sample-metadata')
    theSampleMD.html('')
    theSampleMD.append('ul')
    for (item of Object.entries(data)){
      theSampleMD.append('li').text(`${item[0]}: ${item[1]}`)
    }
  })
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    //buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(data){
 
    maxOtu_id=Math.max.apply(Math, data.otu_ids)
    //console.log('maxotu_id: ',maxOtu_id)
    maxSample_value= Math.max.apply(Math,data.sample_values)
    //console.log('maxSampleValue: ',maxSample_Value)

          // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
    var topSample_values=[]
    var topOtu_ids=[]
    var topOtu_labels=[]

    for (var i=0; i<9; i++){
      let topValue = data.sample_values.reduce((iTop, x, i, arr) => x > arr[iTop] ? i : iTop, 0)
      topSample_values.push(data.sample_values.splice(topValue,1)[0])
      topOtu_ids.push(data.otu_ids.splice(topValue,1)[0])
      topOtu_labels.push(data.otu_labels.splice(topValue,1)[0])
      console.log('topotulabels: ',data.otu_labels.splice(topValue,1)[0])
    }
    // var otherTotal=0
    // for (i=0; i<data.sample_values.length;i++){
    //   otherTotal += data.sample_values[i]
    //   //console.log('otherT: ', otherTotal )
    // }
    //topSample_values.push(otherTotal)
    //topOtu_ids.push('Other')
    //topOtu_labels.push('Other')

  // @TODO: Build a Pie Chart
      var pieInfo = [{
        values: topSample_values,
        labels: topOtu_ids,
        type: 'pie',
        hoverinfo: topOtu_labels
      }]
      var pieLayout ={
        height:500,
        width:500
      }
      Plotly.newPlot('pie', pieInfo, pieLayout)
     // @TODO: Build a Bubble Chart using the sample data
     var bubbleInfo=[{
       x:data.otu_ids,
       y:data.sample_values,
       text: data.otu_labels,
       marker:{
        color: data.otu_ids.map( x => `rgb(${255 - Math.floor(255 * x/maxOtu_id)},0,${Math.floor(255 * x / maxOtu_id)})`),
        size: data.sample_values.map( x => 100 * x/maxSample_value),
        sizemin: 4
       },
       mode: 'markers'       
     }]
     Plotly.plot('bubble',bubbleInfo)
  })  
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    //console.log (firstSample)
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  //buildCharts(newSample);
  // buildMetadata(newSample);
  //Plotly.deleteTraces('bubble',0)
  //Plotly.deleteTraces('pie',0)
  buildCharts(newSample)
  buildMetadata(newSample)
}

// Initialize the dashboard
init();
