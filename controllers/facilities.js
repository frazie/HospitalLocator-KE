
module.exports = {
    getHospital: async (req,res) => {
    
        res.render('facility.ejs')
    },
    getResults: async (req, res) => {
        try {
            let institution = req.body.location
            
            const facilityFetch = await fetch(
                `https://api.healthtools.codeforafrica.org/search/health-facilities?q=[${institution}]&per_page=1000`
            )
          
            const data = await facilityFetch.json()
                
            let facility = []
                
            for (let i=0;i<data.result.total;i++){
                
                function DisplayFacility (data) {
                    this.facility = data.result.hits[i]._source.officialname;
                    this.type_facility = data.result.hits[i]._source.facility_type_category
                    this.owner = data.result.hits[i]._source.owner_type_name
                    this.county_name = data.result.hits[i]._source.county_name
                    this.services = data.result.hits[i]._source.service_names
                    this.constituency = data.result.hits[i]._source.constituency_name
                    this.ward = data.result.hits[i]._source.ward_name
                     this.latitude = data.result.hits[i]._source.lat
                     this.longitude = data.result.hits[i]._source.long
                    this.facilityLevel = data.result.hits[i]._source.keph_level_name
                }
                
                let hosi = new DisplayFacility(data)

                facility.push(hosi)
            }
                
            JSON.stringify(facility.reverse())
                
            
            res.render('results.ejs', {facility: facility, name: facility.facility, search: institution })
        
           } catch (error) {
                console.error('Fetch Error on hosi:',error)
           }
    }
}