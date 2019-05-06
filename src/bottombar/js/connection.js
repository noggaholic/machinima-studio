/* eslint-disable indent */
/* eslint-disable no-tabs */
(() => {
  const { io, $ } = window;
  const socket = io('http://127.0.0.1:8080');


  window.socket = socket;

  socket.on('error', (err) => {
    console.log('Socket.IO Error');
    console.log(err);
  });

  let firstTime = true;

  const clearRows = () => $('.waypoints > tbody').empty();

  $(document).ready(() => {
    socket.on('CAMERA_PLAY', () => $('.play').click());

    socket.on('CAMERA_STOP', () => $('.stop').click());

    socket.on('CAMERA_CLEAR_PATH', () => clearRows());

    socket.on('CAMERA_ADD_POSITION', (data) => {
      if (firstTime) {
        clearRows();
        firstTime = false;
      }

      const newRow = `<tr>
      <td><span class="glyphicon glyphicon-trash deleteWaypoint" aria-hidden="true"></span></td>
      <td class="float"><textarea>${data.pos.x}</textarea></td>
      <td class="float"><textarea>${data.pos.y}</textarea></td>
      <td class="float"><textarea>${data.pos.z}</textarea></td>
      <td class="float"><textarea>${data.lookAt.x}</textarea></td>
      <td class="float"><textarea>${data.lookAt.y}</textarea></td>
      <td class="float"><textarea>${data.lookAt.z}</textarea></td>
      <td class="float"><textarea>${data.roll}</textarea></td>
      <td class="float"><textarea>${data.timeOfDay}</textarea></td>
      <td class="float"><textarea>60</textarea></td>
      </tr>`;
    $('.waypoints tbody:last-child').append(newRow);
    });
  });
})();
