# MEAN Skeleton
This repo is a basic structure for a web application that uses the MEAN stack (MongoDB, Express, AngularJS, and NodeJS). It is made for beginners with a basic understanding of these technologies. If there are any questions, feel free to create a New Issue on the repository.

## Setup

#### Node
To get this running locally, start by installing [**NodeJS**](http://nodejs.org/download/). The Node website is very good at explaining how to do this. Once installed verify that npm (Node Package Manager) came with the installation by running npm in Terminal.

#### Nodemon
I recommend installing [Nodemon](https://github.com/remy/nodemon) to assist you in development. It will watch for changes in your server files and automatically restart the server for you. That way you can stick to developing rather than constantly restarting the process manually.

#### Mongo
Next, download and install [**MongoDB**](http://www.mongodb.org/downloads). **Make sure to follow all the directions for installing on your respective operating system.** Verify that this is installed correctly by running the mongo server locally with the command ```mongod```. The mongod service must be running locally to point to local Mongo databases.


## Configure
Clone the repository, and you will have the structure in place to start. Begin by editting the package.json file.

#### Package.json
```javascript
// package.json
{
	"name"         : "mean-skeleton",
	"version"      : "0.0.1",
	"description"  : "Skeleton for an application using the MEAN stack.",
	"main"         : "server.js",
	"author"       : "Alfred",
	"dependencies" : {
		"express"    : "latest",
		"mongoose"	 : "latest"
	}
}
```

**Don't forget to change**
* Name
* Version, if applicable
* Description
* Author

Install all listed dependencies by navigating to the repository in Terminal and running the command 

```npm install``` 

This will install [**Express**](http://expressjs.com/4x/api.html) along with the other packages in the package.json file. 

In the above, "latest" denotes version number. It's a string. I set it to latest to simplify use. I am also assuming that these package owners will continue to document their changes as they update their packages. Luckily [**StrongLoop**](http://strongloop.com/) is pretty good about it.

<Enter>
<Enter>
<Enter>

#### Connecting to a Database
Replace the link below with the url for your hosted DB or keep this url for the default local MongoDB
```javascript
// config/db.js
module.exports = {
	url : 'mongodb://localhost:27017/test'
}
```

#### Server Settings
Right now we have a few moving parts, but they aren't connected yet. Let's change that.

In the root of our project you'll find a server.js file. This is the file that we will run to make our server live.

First, we require our dependencies. You'll notice I declare bodyParser, which is an Express middleware for parsing HTTP Responses and Requests. I also declare morgan, another Express middleware, used for logging. 

I suggest reading up on them and other Express middlewares, but the settings I have here should work for this example.

```javascript
// server.js

// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
```

Next, we configure our Express application. I import the database file to this one in an effort to keep the database file nice and lean.
```javascript
// server.js

// Configs
var db = require('./config/db');

// Connect to the DB
mongoose.connect(db.url);

// Initialize Express app
var app = express();
// Configure 

// To expose public assets to the world
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(morgan('dev'));

// For parsing HTTP responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
```

After configuring, we add the routes by sending the application as a parameter to the require statements.

Lastly, start the application with listen by giving it a port number. 
```javascript
// server.js

// Express Routes
require('./app/routes/api')(app);
require('./app/routes/routes')(app);

// Start the app with listen
app.listen(3000);

```

#### Run our server
To run this server, in the root of the project directory run 

```node server.js``` or if using nodemon ```nodemon server.js```

It will start the application and you should be able to navigate to http://localhost:3000 and see our first page.

## Make It Yours
### Defining a Model
This application is designed to implement the MV* pattern. Thus, start by creating a Model for our data.

Each model should be defined in its own file in the app/models directory.

```javascript
// app/models/user.js

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema ({
	name : {
		type: String
	},
});

module.exports = mongoose.model('User', UserSchema);
```

The above is an example of a User model with a name field. We require [mongoose](http://mongoosejs.com/index.html) as our Object Modeler and then require Mongoose Schema as an object to extend and create our own Schema.

Then define the fields of your model. You can set the datatype, mark fields as required and validate the data before saving the document to the collection. Read more about mongoose schemas in their [docs](http://mongoosejs.com/docs/guide.html)

Lastly, you are going to want to export the model with a name and a Schema Object for use in our API.

### Defining Routes
These are Express-style routes, to see all the fancy things you can do refer to the Express docs.

To define a simple route to serve a static HTML page:
```javascript
// app/routes/route.js
module.exports = function(app) {
    app.get('/path', function(request, response) {
        response.sendfile('path/to.html');
    });
}
```

To define a route that writes to the response:
```javascript
// Assuming this is wrapped in the export line
    app.get('/path', function(request, response) {
        response.writeHead(200); // 200 Success Status code
        response.write(<h1>Hello World</h1>); // Writes to the body
        response.end(); // Closes the write stream
    });
```

#### Defining an API
Since making RESTful applications makes everything easy on everyone, let's define a way to interact with our model

To make a call that returns our models:
```javascript
/* app/routes/api.js */

module.exports = function(app) {
    /* Require mongoose, and the Model */
    var mongoose =  require('mongoose'),
        Model = require('app/models/model')
        
    app.get('path', function(request, response) {
        Model.find({conditions : 'in JSON'}, function(err, models) {
            response.send(models); // Sends the data in JSON in the response
        });
    });
}
```

Express also supports the other HTTP verbs like POST. 
To create a model and return them all after one is created.
```javascript
    // Assuming this is wrapped in the export after the require lines
    
	app.post('path', function (req, res) {
		Model.create({
			name : req.body.name // Value from form with field "name"
		}, function(err, model) {
			
			Model.find(function(err, models) {
				res.send(models);
			});
		});
	});
```

So far we have set up quite the backend, and gone over the M, E, and N in MEAN. Now we can finally start **A**.

## Make It Pretty
We use [AngularJS](https://angularjs.org/) to receive all of the data sent from Node in the backend to give us a truly dynamic webpage it also offers us many directives to display this data on the frontend. 

### Define an Angular Controller
Angular follows the MVC pattern on the frontend. We won't have to really do anything to the model once it gets to Angular so, next up is the Controller. We define Angular controllers and export them as angular modules. 

[Angular Services](https://docs.angularjs.org/api/ng/service)

To add more functionality to our controller, we can throw in more angular services as arguments after ```$scope```

I recommend adding the ```$http``` service to make frontend wrappers for our API calls.
```javascript
var appController = angular.module('appController', []);

function appCtrl($scope, $http) {
    ...
}
```

[Angular Directives](https://docs.angularjs.org/api/ng/directive)

To use what we have defined in our controller, we use the ng-app directive to point to the controller for this page. We must also be sure to load angular and the controller.js file.

Lastly, add the ng-controller directive to the body of the document to make all of the controller methods available to the body.


```html
<!DOCTYPE html>
<html ng-app="appController">
    <head>
	<!--  Angular from Google CDN -->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min.js"></script>
	
	<!-- Load AppController -->
	<script type="text/javascript" src="../controllers/app.js"></script>
    </head>
    <body ng-controller="appCtrl">
        
    </body>
</html>
```

## Testing Your Application
Making sure that our application works is an incredibly important part of developing for any platform. The entire software stack in this instance is JavaScript. This means we only need JavaScript testing libraries. 

#### Testing Angular
[Jasmine](http://jasmine.github.io/) is recommended for testing your frontend JavaScripts. If you are unfamiliar with jasmine check out the tutorial [here](http://jasmine.github.io/2.0/introduction.html)

You can find a very basic angular controller spec in the ``test-angular/spec/`` directory.

#### Testing Node
[jasmine-node](https://github.com/mhevery/jasmine-node) is jasmine for your Node backend. Their documentation is brief because they assume that you are familiar with running jasmine already. 

Install the package globally and it comes with a CLI. 

To run Node tests:

```jasmine-node test-node/```

This will recursively run all the files named *spec.js, which means all of your specs must end with spec.js 

## Disclaimer 
I do not claim to be an expert at any of the technologies used. I also do not claim to own any of the technologies mentioned in this guide.