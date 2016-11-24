window.socket = io('http://127.0.0.1:8080');
socket.on('error', function (err) {
   console.log("Socket.IO Error");
   console.log(err); // this is changed from your code in last comment
});
$(".rendering").change(function() {

	switch ($(this).data( "id" )) {
		case 'audio':
			socket.emit('RENDERING', { section: 'AUDIO' });
			break;
		case 'blocks':
			socket.emit('RENDERING', { section: 'BLOCKS' });
			break;
		case 'decal':
			socket.emit('RENDERING', { section: 'DECAL' });
			break;
		case 'environment':
			socket.emit('RENDERING', { section: 'ENVIRONMENT' });
			break;
		case 'river':
			socket.emit('RENDERING', { section: 'RIVER' });
			break;
		case 'under_water':
			socket.emit('RENDERING', { section: 'UNDER_WATER' });
			break;
		case 'zone':
			socket.emit('RENDERING', { section: 'ZONE' });
			break;
		case 'lights':
			socket.emit('RENDERING', { section: 'LIGHTS' });
			break;
		case 'shadows':
			socket.emit('RENDERING', { section: 'SHADOWS' });
			break;
		case 'terrain':
			socket.emit('RENDERING', { section: 'TERRAIN' });
			break;
		case 'cube_map':
			socket.emit('RENDERING', { section: 'CUBE_MAP' });
			break;
		case 'props':
			socket.emit('RENDERING', { section: 'PROPS' });
			break;
		}
});

$("#enableFlying").change(function() {
	if(this.checked) {
		socket.emit('PLAYER_ENABLE_FLY');
	} else {
		socket.emit('PLAYER_DISABLE_FLY');
	}
});

$("#enableTimeOfDay").change(function() {
	if(this.checked) {
		socket.emit('ENV_ENABLE_TIME_OF_DAY');
		$(".timeOfDay").removeAttr('disabled');
	} else {
		socket.emit('ENV_DISABLE_TIME_OF_DAY');
		$(".timeOfDay").attr('disabled', 'disabled');
	}
});

$(".timeOfDay").on("input change", function() {
	var density = $(this).val();
	socket.emit('ENV_SET_TIME_OF_DAY', density);
});

$(".enableCamera").change(function() {
    if(this.checked) {
      socket.emit('CAMERA_ENABLE_CONTROLS');
    } else {
      socket.emit('CAMERA_DISABLE_CONTROLS');
    }
});

let cameraTable    = $('.cameraTable tbody');
let cameraCounter = 0;

$(".advance").click(() => {
  socket.emit('PLAYER_ADVANCE_IN_DIRECTION');
});
$(".stepdown").click(() => {
  socket.emit('PLAYER_DOWN');
});
$(".stepup").click(() => {
  socket.emit('PLAYER_UP');
});
$(".play").click(() => {
  var positions = [];
  var listOfPositions = cameraTable.find('tr');
  listOfPositions.each((i,tr) => {
    var data = [];
    $(tr).find('td').each((i, td) => {
      data.push(parseFloat($(td).text()));
    })
    positions.push(data);
  });
  socket.emit('CAMERA_TWEEN_TO',positions);
});

	socket.on('CAMERA_PLAY', () => {
		console.log('playing...')
		$(".play").click();
	});

	var cameraInfo = $('.cameraTable>.list-group-item>span');
	socket.on('UPDATE_UI', (data) => {
		cameraInfo[0].innerHTML = data.x;
		cameraInfo[1].innerHTML = data.y;
		cameraInfo[2].innerHTML = data.z;
		cameraInfo[3].innerHTML = data.lookAtx;
		cameraInfo[4].innerHTML = data.lookAty;
		cameraInfo[5].innerHTML = data.lookAtz;
		cameraInfo[6].innerHTML = data.roll;
	});

socket.on('CAMERA_ADD_POSITION', (data) => {
  let templ = `<tr><th scope='row'>${cameraCounter}</th>
  <td>${data.pos.x}</td>
  <td>${data.pos.y}</td>
  <td>${data.pos.z}</td>
  <td>${data.lookAt.x}</td>
  <td>${data.lookAt.y}</td>
  <td>${data.lookAt.z}</td></tr>`;
  cameraCounter++;
  cameraTable.append(templ);
});

$(document).ready(function() {

	$(".fogDensity").on("input change", function() {
    var density = $(this).val();
    socket.emit('ENV_SET_FOG_DENSITY', density);
  });

	$("#flat").spectrum({
	    flat: true,
			preferredFormat: "hex",
	    showInput: true,
			move: function(color) {
				color = color.toRgb();
				socket.emit('ENV_SET_FOG_COLOR', { r: color.r, g: color.g, b: color.b });
			}
	});
});
