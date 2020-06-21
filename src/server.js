const http = require('http');
const path = require('path');
// to use environment variables for .env files
const dotenv = require('dotenv');
// Require Express to run server and routes
const express = require('express');
// to enable cors
const cors = require('cors');

// initialize the app
const app = express();

// Setup empty JS object to act as endpoint for all routes
projectData = {
	file : "What is that "
};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// body parser is deprecated since express version 4.16
// we use express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static(path.join(__dirname,'website')));

// router to get all the project data

app.get('/data',(req,res)=>{
	res.json(projectData) ;
})
// Setup Server
const server = http.createServer(app);
const port = process.env.PORT || 3000;
app.set('port', port);
server.listen(port, () => {
	console.log(`server is running at port ${port}`);
});
