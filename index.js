require('dotenv').config();
var alexa = require('alexa-app');
var app = new alexa.app();
var getUrl = require('request');
var ngrok = process.env.ngrok;


/**
 * Launch Intent
 */
app.launch(function(request,response) {
	response.say('What would you like to see?');
	response.shouldEndSession(false);
});


/**
 * Google Intent
 */
app.intent('Google',
  {
    'slots':{'GoogleDisplay':'GOOGLE_DISPLAY'},
    'utterances':[ 'Show me a google search for {GoogleDisplay}' ]
  },
  function(request, response) {
	  var display = request.slot('GoogleDisplay');
	  getUrl(ngrok + '/google?display=' + display, function (error, Response, body) {
			if (!error) {
				response.say('Here is a google search for ' + display);
				response.shouldEndSession(true);
				response.send();
			} else {
				response.say('I encountered a problem');
				response.shouldEndSession(true);
				response.send();
			}
	  });
	  return false;
  });

/**
 * Wiki Intent
 */
app.intent('Wiki',
	{
		'slots':{'WikiDisplay':'WIKI_DISPLAY'},
		'utterances':[ 'let me see {WikiDisplay}' ]
	},
	function(request, response) {
		var display = request.slot('WikiDisplay');
		getUrl(ngrok + '/wiki?display=' + display, function (error, Response, body) {
			if (!error) {
				response.say('Here is a Wikepedia search for ' + display);
				response.shouldEndSession(true);
				response.send();
			} else {
				response.say('I encountered a problem');
				response.shouldEndSession(true);
				response.send();
			}
		});
		return false;
	});


/**
 * End Session
 */
app.intent('Image',
	{
		'slots':{'ImageDisplay':'IMAGE_DISPLAY'},
		'utterances':[ 'let me see {ImageDisplay}' ]
	},
	function(request, response) {
		var display = request.slot('ImageDisplay');
		getUrl(ngrok + '/image?display=' + display, function (error, Response, body) {
			if (!error) {
				response.say('Here is a Image of ' + display);
				response.shouldEndSession(true);
				response.send();
			} else {
				response.say('I encountered a problem');
				response.shouldEndSession(true);
				response.send();
			}
		});
		return false;
	});

/**
 * End Session Intent
 */
app.intent('EndIntent',
    function (request, response) {
        response.say('Goodbye');
        response.shouldEndSession(true);
        response.send();
        return false;
    });


/**
 * Error handler for any thrown errors.
 */
app.error = function(exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
