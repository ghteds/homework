var tbody =d3.select("tbody")
var submit=d3.select('#filter-btn')


data.forEach((stuff)=>{
      //console.log(stuff)
      var row=tbody.append('tr')
      //console.log('theRanking',stuff.ranking)
      Object.entries(stuff).forEach(([key,value])=>{
          //console.log(key,value)
          var cell= tbody.append('td').text(value)
      })
})

submit.on('click',function(){
    //prevent refresh
    //console.log('i was clicked')
    d3.event.preventDefault()
    //select input and get html
    var inputElement =d3.select('#datetime')
    //console.log(inputElement.property('value'))
    // //get val of input 
    var inputValue = inputElement.property('value')

    //console.log('inputValue: ',inputValue)
    // //console.log('')
    //inputValue='1/3/2010'
    //var filteredData=data.filter(item=> item.ranking.toString() === inputValue)
    var filteredData = data.filter(item=> item.datetime === inputValue)
    
    //console.log(filteredData)
    $('tbody').empty()

    filteredData.forEach((f)=>{
        //console.log('f: ',f)
        var row=tbody.append('tr')
        Object.entries(f).forEach(([key,value])=>{
                tbody.append('td').text(value)

        })

    })
})