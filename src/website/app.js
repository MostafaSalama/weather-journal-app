/* Global Variables */
// API KEY FOR OpenWeatherMap.com
const apiKey = '76f1aeec7d3a59e992ee01cc42c88559';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
getWeatherData(80014)

function getCurrentDate() {
    const d = new Date() ;
    return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()
}

async function getWeatherData(zipCode,userResponse) {
    // the url to request
    let url = baseURL + zipCode + `&appid=${apiKey}` ;
   try{
       const response = await fetch(url) ;
       if (response.ok){
           const data = await response.json() ;
           return {
               date : getCurrentDate(),
               temperature:data.main.temp,
               userResponse
           }
       }
   }
   catch (e) {
       console.log(e) ;
   }
}

