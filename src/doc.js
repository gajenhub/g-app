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

                

    passport.js     ~ handle all the user authentication and authorization.  
                deal with maintaining user object in the session. deals by doing that
                with dropping in a cookie, pulling out of a cookie, applying it to session.

                
    sessions vs cookies
            ~   cookies are used to store data on the client side of web application,
                while sessions are used to store data on the server side. 

                cookies are generally used for non-sensitive data that needs to persist
                between user sessions, while sessions are used for sensitive data that
                needs to be protected.

                cookie is a small text file that a website can store on the user's 
                computer or mobile device when they visit the site. ~ are used to
                remember user preferences, login information and other data that the
                website needs to remember between visits.

                When a user visits a website, the server can send a cookie to the user's 
                browser with a set of instructions. The browser stores the cookie and 
                sends it back to the server with each subsequent request, allowing the 
                website to recognize the user and provide personalized content.

                Cookies can be either "session" or "persistent." Session cookies are 
                deleted when the user closes their browser, while persistent cookies 
                remain on the user's device until they expire or are deleted.


                A session is a way to store information on the server side of a web 
                application. When a user logs in to a website, a session is created that 
                stores information about the user, such as their user ID and other 
                relevant data. This session ID is usually stored in a cookie on the 
                client side, so that the server can identify the user with each 
                subsequent request.

                Sessions are often used for tasks that require more security than 
                cookies, such as storing user login credentials or other sensitive data. 
                They can also be used to store data that is too large to be stored in a 
                cookie, such as shopping cart contents or form data.

                
*/