// server.js

const express = require('express')
    ,app = express()
    ,bodyParser = require('body-parser')
    ,cookieParser = require('cookie-parser')
    ,PORT = 4000
    ,cors = require('cors')
    ,mongoose = require('mongoose')
    ,config = require('./DB.js')
    // TO-DO: Hide the API keys in a file similar to keys.js in Task 7 
    ,carsRoute = require('./routes/cars')
    ,path = require('path')
    ,logger = require('morgan')

mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true })
        .then(
            () => {console.log('Database is connected')},
            err => { console.log(`Can't connect to the database:\n${err}`) }
        )

// use cross-site origin requests because this is the back-end to an application
app.use(cors())


// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// everything should use the carsRoute
app.use('/', carsRoute)

// tell them the server is running
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  next(err);
});

app.use(function (req, res, next) {
  fs = require('fs')
  fs.readFile("./api/public/404.html", (err, data) => {
      if (err) throw err
      //console.log("404.html")
      //console.log(data.toString())
      
      res.status(404).end(createResponse(data));
      //res.status(404).send(data);
  })
  //res.status(404).send("Sorry can't find that!")
})

// i want to prettify the output so I made a function to format the responses. I tried to import or require createResponse.js and use the function from another page but I couldn't get it to work.
function createResponse(responseBody){

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  /*                            START - MAKE HTML RESPONSE                               */
  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  var body = ""
      //,responseBody = ""  // store what you want output in responseBody
      ,response = ""  // RESERVED. DO NOT USE
      ,responseTitle = "Full Stack Web Dev w Task 7 - Compulsory 1 - Authentication";
      ;

  // Start boilerplate section
  response += '<html lang="en">' +
  '<head>' +
  '<meta charset="utf-8" />' +
  '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
  '<meta name="theme-color" content="#000000" />' +
  '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"' +
  ' integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />';
  // End boilerplate.

  // Add the title
  response += '<title>' + responseTitle + '</title>';

  // Start more boilerplate
  response += '</head>' +
  '<body style="margin: 20px">' /*+
  '<noscript>You need to enable JavaScript to run this app.</noscript>'*/;
  // End of more boilerplate.

  // add the responseBody
  response += responseBody;

  // Start final boilerplate
  response += '</body>' +
  '</html>';
  // End of final boilerplate

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  /*                            END - MAKE HTML RESPONSE                                 */
  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

  return response;

}