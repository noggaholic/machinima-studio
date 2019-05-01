window.socket = io('http://127.0.0.1:8080');
socket.on('error', function (err) {
   console.log("Socket.IO Error");
   console.log(err); // this is changed from your code in last comment
});
var firstTime = true;

var clearRows = function() {
	$('.waypoints > tbody').empty();
};

$(document).ready(function() {

	socket.on('CAMERA_PLAY', () => {
		$(".play").click();
	});

	socket.on('CAMERA_STOP', () => {
		$(".stop").click();
	});

	socket.on('CAMERA_CLEAR_PATH', (data) => {
		clearRows();
	});

	socket.on('CAMERA_ADD_POSITION', (data) => {

		if (firstTime) {
			clearRows();
			firstTime = false;
		}

		var newRow = '<tr>' +
			'<td><span class="glyphicon glyphicon-trash deleteWaypoint" aria-hidden="true"></span></td>' +
			'<td class="float"><textarea>'+data.pos.x+'</textarea></td>' +
			'<td class="float"><textarea>'+data.pos.y+'</textarea></td>' +
			'<td class="float"><textarea>'+data.pos.z+'</textarea></td>' +
			'<td class="float"><textarea>'+data.lookAt.x+'</textarea></td>' +
			'<td class="float"><textarea>'+data.lookAt.y+'</textarea></td>' +
			'<td class="float"><textarea>'+data.lookAt.z+'</textarea></td>' +
			'<td class="float"><textarea>'+data.roll+'</textarea></td>' +
			'<td class="float"><textarea>'+data.timeOfDay+'</textarea></td>' +
			'<td class="float"><textarea>60</textarea></td>' +
		'</tr>';
		var rowSelector = $('.waypoints tbody:last-child').append(newRow);
	});
});

// function animate() {
// 	if (tweenTime.orchestrator.timer.is_playing) {
// 		var box_values 	= tweenTime.getValues('camera');
// 		socket.emit('CAMERA_SET_POS', { x: box_values.x, y: box_values.y, z: box_values.z , lookAtx: box_values.lookAtx, lookAty: box_values.lookAty, lookAtz: box_values.lookAtz, });
// 	}
// 	window.requestAnimationFrame(animate);
// }
//
// animate();
