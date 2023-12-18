# Run to the Moon!

## Server.Js
- The server.js file instantiates the connection of the backend. In order to stand up the backend, navigate the the folder using your IDE terminal by typing 'cd backend'.
- You will need to install several packages in order to run the backend; a quick approach for this is to simply type 'npm install' and the appropriate packages aka dependencies will be installed in the backend folder. 
- Once installed, ensure you should have the following reflected in your backend package.json file: 
    1) "type":"module" immediately after the main function, succeeded with a comma. 
    2) update your script to state "nodemon server.js" rather than 'node server.js'.
    3) kill your terminal by right-clicking and selecting 'kill terminal' or use the shortcut ctrl+C and open a new terminal. 
    4) type and execute 'npm start' in the command line. 
        - doing so will now call the start command in the package json, which itself leverages nodemon in order to reflect changes and refresh the backend connection instead of the developer having to kill the connection each time. 
- Add a .env file to your backend folder with your database details:

        - DB_PORT=your-port-number
        - DB_PASSWORD=your-db-password
        - DB_DATABASE=RunToTheMoon 

### Server.js Endpoints
    1) http://localhost:8080/ - this is the homepage endpoint for our backend server. You should see 'This is the backend' once hooked up correctly. 
        - You should also see 'Connected to backend😁😁!' in the console when listening on the appropriate port. Should you decide to listen on a different port for any reason whatsoever in the future, ensure you update the default port within the server.js file (i.e. app.listen [...])

    2) http://localhost:8080/teammiles - this endpoint is being leveraged on the leaderboard page in order to GET and display the total miles completed by all teams thus far, and also sorts these in descending order - from leader to last place. 

    3) http://localhost:8080/teamdashboard - this endpoint is being used on the team dashboard page to GET and surface a user-specific dashboard, according to the team that is logged in. 

    4) http://localhost:8080//updatedashboard - this endpoint used to POST new miles to the dashboard. This endpoint is best tested using postman; typing the endpoint URL into the browser will not return any values. 

    5) http://localhost:8080/addtowaitlist - this endpoint is being used to POST details to our waitlist page, which we will subsequently use for our mailing list, to email people when we have moved from this pre-launch/waitlisting state, to fully live, at which point registration will be fully open to everyone. 

    6) http://localhost:8080//teams - this endpoint is being used to get user credentials to aid log in. 


## Client side 
- There are several packages required to run the client side, navigate to the client folder and 'npm install' to install all required packages
- Once packages are installed, remaining in the client folder, execute 'npm start'
- This will run the app in the development mode, automatically opening your default browser and navigating to  [http://localhost:3000](http://localhost:3000).

### React instructions taken from default react readme 
    - `npm test`
        - Launches the test runner in the interactive watch mode.\
        - See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

    - `npm run build`
        - Builds the app for production to the `build` folder.\
        - It correctly bundles React in production mode and optimizes the build for the best performance.
        - The build is minified and the filenames include the hashes.\
        - Your app is ready to be deployed!
        - See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

    - `npm run eject`
        - **Note: this is a one-way operation. Once you `eject`, you can't go back!**
        - If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
        - Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
        - You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

    - Learn More
        - You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
        - To learn React, check out the [React documentation](https://reactjs.org/).

    - Code Splitting
        - This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

    - Analyzing the Bundle Size
        - This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

    
    - Making a Progressive Web App
        - This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

    - Advanced Configuration
        - This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

    - Deployment
        - This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

    - `npm run build` fails to minify
        - This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



## MySQL DB - i.e. sql_db.sql
- Ensure you have software with which you can open this file e.g. workbench. 
- Assuming you are using workbench, open this file within it and execute the relevant queries (notes are within the file itself) to create both the database and the tables emanating from it. You will need to have this setup locally to create the full end-to-end journey, otherwise the backend would have no data source.
- If there are authorisation problems when connecting the backend server to MySQL, execute this line in a query file: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your-password'