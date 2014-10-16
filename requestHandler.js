var wunode = require("./wunode");
var querystring = require('querystring');

function start(request, response){
	console.log("Request handler for 'start' ");

	var body =	'<!DOCTYPE html>'+
				'<html>'+
					'<head>'+
						'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
					'</head>'+
					'<body>'+
						'<form enctype="application/x-www-form-urlencoded" action="/recover" method="post">'+
						'<label for="formID">Form ID:</label>'+
						'<input type="text" name ="formID"/>'+
						'<label for="entryID">Entry ID:</label>'+
						'<input type="text" name ="entryID"/>'+
						'<input type="submit" value="Submit" />'+
						'</form>'+
					'</body>'+
				'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function recover(request, response){
	console.log("Request handler for 'recover' ");

	if(request.method === "POST"){
		console.log("Handling POST");
		var rawBody = "";

		request.on("data", function(chunk){
			rawBody += chunk.toString();
		});

		request.on("end", function(){
			
			var decodedBody = querystring.parse(rawBody);
			console.log(decodedBody);
			var formID = wunode.parseFormURL(decodedBody.formID);
			var entryID = decodedBody.entryID;

			var recoveredURL;
			wunode.refillEntry(formID, entryID, function(result){
				recoveredURL = result;
				var redirectBody =	'<!DOCTYPE html>'+
				'<html>'+
					'<head>'+
					'</head>'+
					'<body>'+
						'<script>console.log("Test"); window.location.href = "'+recoveredURL+'";</script>'+
					'</body>'+
				'</html>';
				response.writeHead(200, "OK", {'Content-Type': 'text/html'});
				response.write(redirectBody);
			
				response.end();
			});

			
			
		});
	}
	else{
		response.writeHead(405, "Method not supported", {"Content-Type": "text/plain"});
		response.write("405-Method not supported");
		response.end();
	}
	
}

exports.start = start;
exports.recover = recover;