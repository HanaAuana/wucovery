function start(response){
	console.log("Request handler for 'start' ");

	var body =	'<!DOCTYPE html>'+
				'<html>'+
					'<head>'+
						'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
					'</head>'+
					'<body>'+
						'<form action="/upload" method="post">'+
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

function recover(response){
	var body = "Recover!";
	console.log("Request handler for 'recover' ");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(body);
	response.end();
}

exports.start = start;
exports.recover = recover;