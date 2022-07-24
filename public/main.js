//this is where you put the code communicating between the server while using fetches.
//hospital search fetch query
document.getElementById('getButton').addEventListener('click', hosiApiRequest)

async function hosiApiRequest(){
    // try {
        let facilityName = document.querySelector('input').value
        const hosiUrl = `http://localhost:4000/hospital/api/${facilityName}`

    try{
        const response = await fetch(hosiUrl)
        const data = await response.json()
        console.log(data)
        for (let i=0;i<data.result.total;i++){
            console.log(data.result.hits[i]._source.county_name)
            console.log(data.result.hits[i]._source.name)
            console.log(data.result.hits[i]._source.owner_type_name)
            console.log(data.result.hits[i]._source.facility_type_category)
            console.log(data.result.hits[i]._source.service_names)
            } 
    }catch(error){
        console.log(error)
    }

}

