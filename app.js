
const http = require('http');
const os = require('os');

console.log("App server starting...");
console.log(getText());

var handler = function(request, response) {
	console.log("Received request from " + request.connection.remoteAddress);
	response.writeHead(200);
	response.write (getText());
 
 	if (request.url === '/exit') {
 		response.end("Exit contenedor.\n");
 		process.exit(0);
 	} else {
		response.end();
 	}

};

var www = http.createServer(handler);
www.listen(8080);


function getText() {
	return "Pod name: " + os.hostname() + "\n" +
	       "Message: " + (process.env.MESSAGE || "no definido") + "\n" +
	       "IP: \n "+ getIp();
}


function getIp() {
	const { networkInterfaces } = require('os');
	const nets = networkInterfaces();
	const results = Object.create(null); // or just '{}', an empty object


	for (const name of Object.keys(nets)) {
	    for (const net of nets[name]) {
	        // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
	        if (net.family === 'IPv4' && !net.internal) {
	            if (!results[name]) {
	                results[name] = [];
	            }

	            results[name].push(net.address);
	        }
	    }
	}
	return JSON.stringify(results);
}