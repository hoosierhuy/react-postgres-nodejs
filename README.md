# react-postgres-nodejs
On the surface, nothing appears impressive about this repo, other than the fact that it's an universal JavaScript app using a relational database to store data, and Knex ORM to create restful api endpoints.  Although this is just trivial demo app, the endpoints are protected.  Anyone who's ever done full-stack web development could appreciate the efforts it took to create this, especially with JavaScript on the back-end.


"client" directory contains the front-end
React, Redux, & WebPack on the front-end.  NodeJS serving up the UI. There is client-side validation for the UI forms (create user, and login ).

"server" directory contains the back-end
NodeJS serving the backend.  Postgresql is the database, Knex ORM.  There is server-side validation of the forms also.

**To Run:**
I'm presuming that you're able to install and set up Postgresql database and the terminal for your respective operating system.  If not, contact me and I will try my best to help.

Pull down this repo.

**Front-end** - cd into the: client > src directory, run "npm install".  Run "npm start" or "yarn start", I have yarn on the front-end as well. The UI will listen on port 3000

**Back-end** - cd into the: server > src directory, run "npm install". Run "createdb redtomato", or whatever database name you want. Open the knexfile.js file and change line 9 from my name to your database user name, if you call your database something other than redtomato, then change the name on line 8 to whatever db name you created.  I included a migrations directory with a schema file in it, run "db:migrate" to create the table.  Run "npm start" to start the api server, which will listen on port 8080.

In the browser, click the "Sign Up" link, notice client-side validation if fields are empty or password re-entry don't match.  Server-side validations kicks in if end-users sign up with a user name or email that's already in the database.  Once signed up, query the "users" table in your database, notice the "password_digest" column hashed value. After logging in with proper credentials, open the browser developer tools > network, try the "new-event", (post request) route or "http://localhost:3000/new-event", type something in the "Event Title" input box, then check out the "events" response headers > Authorization > "Bearer ...access token yada yada", and the response JSON in the dev tools. Try altering the access token, noticed that this will disable auth.  This is all pretty boring stuff and insignificant on the UI side, but for a back-end dev, it's more exciting, considering the fact that this is all JavaScript.  Now log out of the app and try the "http://localhost:3000/new-event" route again without creds, notice that you will be redirected.  

**Note:** I added the server config.js file only for context for other people examining this repo or for myself coming back to this repo 6 months from now, otherwise a config file will never appear in a public repo.  Also, this app is not in production.
