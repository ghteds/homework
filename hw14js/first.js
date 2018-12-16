var tbody =d3.select("tbody")
var submit=d3.select('#submit')

var data=[{
    name:'J Am Med Inform Assn ',
    ranking:1,
    focus:'clinical informatics, US-focus'
},
{
    name:'J Med Internet Res',
    ranking:2,
    focus:'Web, consumer health, ehealth innovations, interdisciplinary, clinical Internet applications, intl ICT policy, public health, telecare '
},
{
    name: 'some journal',
    ranking: 3,
    focus: 'stuff'
}
]


// console.log(data)
//console.log('test')
// data.forEach(function(stuff){
// data.forEach((stuff) => {
//     console.log(stuff);
//     var row = tbody.append("tr")
//     Object.entries(stuff).forEach(function([key,value]){
//         console.log(key,value)});
// });

data.forEach((stuff)=>{
    //console.log(stuff)
    var row=tbody.append('tr')
    //console.log('theRanking',stuff.ranking)
    Object.entries(stuff).forEach(([key,value])=>{
        console.log(key,value)
        var cell= tbody.append('td')
        cell.text(value)
   
    })
})

//var tbody=d3.select('tbody')

// for(var i=0; i<data.length; i++){
//     console.log(data[i].ranking)
// }

// function myTest(t){
//     return t.ranking === 1;
// }
//console.log(data.filter(myTest))
// console.log('len:',data.length)
submit.on('click',function(){
    //prevent refresh
    d3.event.preventDefault()
    //select input and get html
    var inputElement =d3.select('#form-input')

    //get val of input 
    var inputValue = inputElement.property('value')

    console.log('inputValue: ',inputValue)
    //console.log('')
    var filteredData=data.filter(item=> item.ranking.toString() === inputValue)
    
    console.log(filteredData)
    $('tbody').empty()
    filteredData.forEach((f)=>{
        //console.log('f: ',f)
        var row=tbody.append('tr')
        Object.entries(f).forEach(([key,value])=>{
            tbody.append('td').text(value)
        })

    })
})
