/**
 * Simple class to create WEBAPP response
 */
class Response {
  setError (err) { //error handler
    console.error(err)
    this.ok = false;
    this.result = `${err.name}: ${err.message}`
  }
  setResult (data) { //for successful operation
    this.ok = true;
    this.result = data;
  }
}


function doPost(e){
  const response = new Response(); //creating response object
  try{
    const address = JSON.parse(e.postData.contents).address //getting address from request

    if (! address) throw new Error('There is no address in your request');

    const navi = Maps //geocoding address
        .newGeocoder()
        .setRegion('ru')
        .setLanguage('ru')
        .geocode(address);

    response.setResult(navi.results) //set data to response
  } catch(err){
    response.setError(err) // error handler
  } finally {
    return ContentService.createTextOutput(JSON.stringify(response)) //return response data
  }
}