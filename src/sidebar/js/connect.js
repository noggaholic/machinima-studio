/* eslint-disable no-shadow */
const { io, $ } = window;

window.socket = io('http://127.0.0.1:8080');
const { socket } = window;

socket.on('error', (err) => {
  console.log('Socket.IO Error');
  console.log(err); // this is changed from your code in last comment
});

$('.rendering').change(function() {
  switch ($(this).data('id')) {
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
    case 'animation':
      socket.emit('RENDERING', { section: 'ANIMATION' });
      break;
    case 'highlight_effect':
      socket.emit('RENDERING', { section: 'HIGHLIGHT_EFFECT' });
      break;
    default:
      break;
  }
});

$('#enableFlying').change(function() {
  if (this.checked) {
    socket.emit('PLAYER_ENABLE_FLY');
  } else {
    socket.emit('PLAYER_DISABLE_FLY');
  }
});


// Initialize the marker position and the active class
const marker = $('#marker');
const current = $('.active');
marker.css({
  // Place the marker in the middle of the border
  bottom: -(marker.height() / 2),
  left: current.position().left,
  width: current.outerWidth(),
  display: 'block'
});


$('.menu button').click(function() {
  // $(".menu button").removeClass('active');
  // $(this).addClass('active');
  const self = $(this);
  const offsetLeft = self.position().left;
  const width = self.outerWidth() || current.outerWidth();
  const left = offsetLeft === 0 ? 0 : offsetLeft || current.position().left;
  $('.menu button').removeClass('active');
  self.addClass('active');
  marker.css({ left, width });
});

$('#enableTimeOfDay').change(function() {
  if (this.checked) {
    socket.emit('ENV_ENABLE_TIME_OF_DAY');
    $('.timeOfDay').removeAttr('disabled');
  } else {
    socket.emit('ENV_DISABLE_TIME_OF_DAY');
    $('.timeOfDay').attr('disabled', 'disabled');
  }
});

$('.timeOfDay').on('input change', function() {
  const density = $(this).val();
  socket.emit('ENV_SET_TIME_OF_DAY', density);
});
const fpsCounter = $('.fpsCounter');
$('.bulletTime').on('input change', function() {
  const frameRate = $(this).val();
  fpsCounter.html(`Bullet time / Frame rate (${frameRate}fps)`);
  socket.emit('ANIM_SET_FRAME_RATE', frameRate);
});

$('.enableCamera').change(function() {
  if (this.checked) {
    socket.emit('CAMERA_ENABLE_CONTROLS');
  } else {
    socket.emit('CAMERA_DISABLE_CONTROLS');
  }
});

const cameraTable = $('.cameraTable tbody');
let cameraCounter = 0;

$('.advance').click(function() {
  socket.emit('PLAYER_ADVANCE_IN_DIRECTION');
});
$('.stepdown').click(function() {
  socket.emit('PLAYER_DOWN');
});
$('.stepup').click(function() {
  socket.emit('PLAYER_UP');
});
$('.play').click(function() {
  const positions = [];
  const listOfPositions = cameraTable.find('tr');
  listOfPositions.each((i, tr) => {
    const data = [];
    $(tr).find('td').each((i, td) => {
      data.push(parseFloat($(td).text()));
    });
    positions.push(data);
  });
  socket.emit('CAMERA_TWEEN_TO', positions);
});

socket.on('CAMERA_PLAY', function() {
  $('.play').click();
});

const cameraInfo = $('.cameraTable>.list-group-item>span');
socket.on('UPDATE_UI', (data) => {
  cameraInfo[0].innerHTML = data.x;
  cameraInfo[1].innerHTML = data.y;
  cameraInfo[2].innerHTML = data.z;
  cameraInfo[3].innerHTML = data.lookAtx;
  cameraInfo[4].innerHTML = data.lookAty;
  cameraInfo[5].innerHTML = data.lookAtz;
  cameraInfo[6].innerHTML = data.roll;
  cameraInfo[7].innerHTML = data.speed;
  cameraInfo[8].innerHTML = data.rotSpeed;
  cameraInfo[9].innerHTML = data.up_down_speed;

  $('#flat').spectrum('set', `rgb(${data.fog_red}, ${data.fog_green}, ${data.fog_blue})`);
  $('.fogDensity').val(data.fog_density);
  $('.timeOfDay').val(data.time_of_day);
});

const debugInfo = $('.debugInfo>.list-group-item>span');
socket.on('UPDATE_DEBUG_INFO', (data) => {
  debugInfo[0].innerHTML = data.MapName;
  debugInfo[1].innerHTML = data.MapNamespace;
  debugInfo[2].innerHTML = data.MapSector;
  debugInfo[3].innerHTML = data.MapType;
  debugInfo[4].innerHTML = data.MapFloor;
  debugInfo[5].innerHTML = data.MapId;
  debugInfo[6].innerHTML = data.MapGuid;
});

socket.on('CAMERA_ADD_POSITION', (data) => {
  const templ = `<tr><th scope='row'>${cameraCounter}</th>
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
  $('.btn-pref .btn').click(function() {
    $('.btn-pref .btn').removeClass('btn-primary').addClass('btn-default');
    // $(".tab").addClass("active"); // instead of this do the below
    $(this).removeClass('btn-default').addClass('btn-primary');
  });

  $('.fogDensity').on('input change', function() {
    const density = $(this).val();
    socket.emit('ENV_SET_FOG_DENSITY', density);
  });

  $('.speedRange').on('input change', function() {
    const speed = $(this).val();
    cameraInfo[7].innerHTML = speed;
    socket.emit('CAMERA_SET_SPEED', speed);
  });

  $('.rotSpeedRange').on('input change', function() {
    const speed = $(this).val();
    cameraInfo[8].innerHTML = speed;
    socket.emit('CAMERA_SET_ROT_SPEED', speed);
  });

  $('.up_down_speed').on('input change', function() {
    const speed = $(this).val();
    cameraInfo[9].innerHTML = speed;
    socket.emit('CAMERA_SET_UP_DOWN_SPEED', speed);
  });

  $('#flat').spectrum({
    flat: true,
    preferredFormat: 'hex',
    showInput: true,
    move(color) {
      color = color.toRgb();
      socket.emit('ENV_SET_FOG_COLOR', { r: color.r, g: color.g, b: color.b });
    }
  });
});
