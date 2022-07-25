//this is where you put the code communicating between the server while using fetches.
//hospital search fetch query
document.getElementById('getButton').addEventListener('click', hosiApiRequest)

async function hosiApiRequest(){
    // try {
        let facilityName = document.querySelector('input').value
        const hosiUrl = `http://localhost:4000/hospital/${facilityName}`

    try{
        const response = await fetch(hosiUrl)
        const data = await response.json()
        console.log(data.length)

       
        // let institution = []
        // for (let i=0;i<data.result.total;i++){
        
        // function DisplayFacility(data) {
        //     this.facility = data.result.hits[i]._source.name;
        //     this.type_facility = data.result.hits[i]._source.facility_type_category
        //     this.owner = data.result.hits[i]._source.owner_type_name
        //     this.county_name = data.result.hits[i]._source.county_name
        //     this.services = data.result.hits[i]._source.service_names

        // }
         
        // let hosi = new DisplayFacility(data)

        // institution.push(hosi)
        //     } 
        //     console.log(institution)
    }catch(error){
        console.log(error)
    }

}

