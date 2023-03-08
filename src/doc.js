/*



Templating Engines:

-   Building a Web Applicatino
-   Build Routes for Application
-   Separating Files
-   Parameter Variables
*/


/*

app.use(express.json())

app.use()   ~ method is used to mount moddleware functions at a specified path.
            In this case, the middleware being mounted is express.json()
            
express.json()  ~   is a built-in middleware function in Express.js that parses
                incoming requests with JSON payloads. It parses the JSON data in
                the request body and exposes it on the req.body property of the 
                request object.

                By using app.use(express.json()) any incoming requests with a JSON
                payload will automatically be parsed and their data will be available
                on the req.body object for further processing within the application.

                


*/