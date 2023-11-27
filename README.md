## Google Apps Script Geocoding script

This repository offers a simple geocoding solution designed for seamless integration with your application. Powered by Google Apps Script, the web app effortlessly communicates with applications written in any language via HTTP requests. This solution allows you to harness the capabilities of the Google Maps Geocoder without incurring costs, staying within the free usage quotas provided by Google (check Google quotas [here](https://developers.google.com/apps-script/guides/services/quotas)).

The web app fetches geodata based on an address and transmits it back to your server, providing flexibility in utilizing the data. For example, you can easily generate geolinks, as illustrated in this [example](https://www.google.com/maps/search/?api=1&query=47.5951518%2C-122.3316393).

**How to Use:**

**1. Deploy Google Apps Script:**

   a. Copy the code from [this link](https://script.google.com/home/projects/1fNftW7LM9JqedNKkFj25JNlRRH51_IPNjV4a5FxoYarypg74bIn8LihL/) or paste the provided code into your Google Apps Script project.

   b. Deploy the provided Google Apps Script as a web app:
      - Log into your Google account.
      - Open [Google Apps Script](https://script.google.com/home) and create a new project.
      - Press "Deploy."
      - Choose "New Deployment."
      - Set "Who has access" to "Anyone" and press deploy.
      - Provide the necessary permissions as prompted.
      - Follow Google's guidelines for deploying web apps using Apps Script.

   c. After successful deployment, you will be provided with a URL similar to this: `https://script.google.com/macros/s/SOME_SECRET_KEY/exec`. Copy this address to use it for accessing your web app.

**2. Configure Your Application:**

   - Adapt the HTTP request structure based on the requirements of your application, irrespective of the programming language used.
   - Ensure it is a POST request with the key 'address' in the body, containing the address that you need to geocode, in JSON format.

**3. Send Identified Addresses to the Web App:**

   - Integrate your application to send identified addresses to the web app for geocoding.

**4. Generate Navigation Links or do whatever you want and be happy ☺️**
   - At this stage, you will receive a JSON object in the following format: `{ "ok": boolean, "result": obj }`

   - If the `ok` field is `true`, the operation was successful, and you can find the relevant data in the `result` field. You can find more information [here](https://developers.google.com/apps-script/reference/maps/geocoder#geocode(String)).
   - If `ok` is `false`, it indicates an error, and you can inspect the `result` field for details about the error, such as an error name and message.

**Note:**
Replace placeholders like "SOME_SECRET_KEY" in the provided URL with the actual secret key generated during the deployment of your Google Apps Script. This URL will serve as the endpoint for your geocoding web app.



### Usage Example:

Assuming you have a JavaScript/Node.js application, here's an example of how you might use the geocoding solution:

```javascript
async function geocoder(address) {
    try {
        console.log('Requested address is:', address)

        const requestOptions = new Request( 
            'https://your-web-app-url.com/geocode',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
            }
        )

        const response = await fetch(requestOptions)
        if (!response.ok) {
            return console.error('Web app error', response.result)
        }

        const geodata = await response.json() // recieving JSON from response
        const location = geodata.result[0]?.geometry?.location // Recieving geodata

        if (!location) {
            throw Error('Location data was not found')
        }

        console.log('Geodata is', geodata)
        return { geodata }
    } catch (err) {
        console.error(err)
    }
}

(async () => await geocoder('YOUR ADDRESS TO GEOCODE'))();
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


