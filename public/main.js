//this is where you put the code communicating between the server while using fetches.
//hospital search fetch query
document.getElementById('getButton').addEventListener('click', hosiApiRequest)


async function hosiApiRequest(){
    // try {
        let facilityName = document.querySelector('input').value
        const hosiUrl = `http://localhost:4000/hospital/${facilityName}`

    try{
        const req = await fetch(hosiUrl)
        .then(
            (res) => {
                if (res.ok){
                    return res.json()
                }else{
                    throw new Error('NETWORK RESPONSE ERROR')
                }
            }
        )

        .then(
            hospitals=>{
                    console.log(hospitals)
            }
        )
       
    }catch(error){
        console.log(error)
    }

}

