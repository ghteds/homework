var tbody =d3.select("tbody")
var data=[{
    name:'J Am Med Inform Assn ',
    ranking:1,
    focus:'clinical informatics, US-focus'
},
{
    name:'J Med Internet Res',
    ranking:2,
    focus:'Web, consumer health, ehealth innovations, interdisciplinary, clinical Internet applications, intl ICT policy, public health, telecare '
}]
// console.log('len:',data.length)

// console.log(data)
//console.log('test')
//data.forEach(function(stuff){
// data.forEach((stuff) => {
//     console.log(stuff);
//     var row = tbody.append("tr")
//     Object.entries(stuff).forEach((key,value) => {console.log(key,value)});
// });

data.forEach((stuff)=>{
    //console.log(stuff)
    Object.entries(stuff).forEach((key,value)=>{
        console.log(key,value)
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