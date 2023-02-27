const url = require('url');
var qs = require('querystring');
var {getMessages, addMessages} = require('./store');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {
  //const searchURL = new URL(`http://127.0.0.1:3000${request.url}`);
  // console.log(searchURL.pathname);
  // console.log(searchURL.searchParams);
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = defaultCorsHeaders;

  var messages = [];
  var statusCode = 404;

  if (request.url.includes('/classes/messages') && request.method === 'GET') {
    headers['Content-Type'] = 'application/json';
    response.writeHead(200, headers);
    messages = getMessages();
    return response.end(JSON.stringify(messages));

  } else if (request.method === 'OPTIONS') {

    response.writeHead(200, headers);
    return response.end();

  } else if (request.url === '/classes/messages' && request.method === 'POST') {

    var body = '';
    statusCode = 201;
    headers['Content-Type'] = 'application/json';

    request.on('data', function(data) {
      body += data;
      if (body.length >= 1 * Math.pow(10, 6)) {
        request.connection.destroy();
      }
    });

    request.on('end', function () {
      var POST = JSON.parse(body);
      if (POST.username === '' || POST.text === '') {
        headers['Content-Type'] = 'text/plain';
        statusCode = 400;
        response.writeHead(statusCode, headers);
        return response.end('invalid input');
      } else {
        messages = addMessages(POST);
        response.writeHead(statusCode, headers);
        return response.end(JSON.stringify(messages));
      }
    });

  } else {
    response.writeHead(404, headers);
    return response.end(JSON.stringify(messages));
  }
};

module.exports.requestHandler = requestHandler;
