var trace1 = [{
    x:['beer','wine','margarita'],
    y:[8,7,9],
    type: 'pie'
}]

//var data =[trace1]

// var layout = {
//     title:"'Drinks' Chart"
// }

// var layout={
//     title:"'Bar' Chart",
//     xaxis:{title:'Drinks'},
//     yaxis:{title: '% of Drinks Ordered'}
//     }

var layout={
    title:"'Bar' Chart"
}

Plotly.newPlot('plotLocation', trace1, layout)