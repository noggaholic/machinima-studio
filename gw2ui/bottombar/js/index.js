var socket 		= io('http://127.0.0.1:8080');
var tween			= undefined;
var isPlaying = false;
$(document).ready(function() {

	var setPlay = function() {
		$('.play').html('<span class="glyphicon glyphicon-play"></span> Play');
		isPlaying = false;
	};

	var setPlaying = function() {
		$('.play').html('<span class="glyphicon glyphicon-pause"></span> Playing');
		isPlaying = true;
	};

	var stopTween = function() {
		if (tween) {
			tween.pause();
			setPlay();
		}
	};

	$(".stop").click(function() {
		stopTween();
	});

	var cinematicValues = {
		x: 0,
		y: 0,
		z: 0,
		lookAtx: 0,
		lookAty: 0,
		lookAty: 0,
		timeOfDay: 0,
	};

	var sendWaypointData = function() {
		var path = [];
		var rows = $(".waypoints > tbody > tr");
		var duration = parseInt($(".durationSelector input").val());
		if (rows.length <= 1){
			return;
		}

		rows.each(function(index, row) {
			row = $(row);
			var x = parseFloat($(row.children()[1]).find("textarea").val());
			var y = parseFloat($(row.children()[2]).find("textarea").val());
			var z = parseFloat($(row.children()[3]).find("textarea").val());
			var lookAtx = parseFloat($(row.children()[4]).find("textarea").val());
			var lookAty = parseFloat($(row.children()[5]).find("textarea").val());
			var lookAtz = parseFloat($(row.children()[6]).find("textarea").val());

			var timeOfDay = parseFloat($(row.children()[8]).find("textarea").val());
			path.push({ x: x, y: y, z: z, lookAtx: lookAtx, lookAty:lookAty, lookAtz: lookAtz, timeOfDay: timeOfDay});
		}).promise().done( function() {

			cinematicValues.x = path[0].x;
			cinematicValues.y = path[0].y;
			cinematicValues.z = path[0].z;
			cinematicValues.lookAtx = path[0].lookAtx;
			cinematicValues.lookAty = path[0].lookAty;
			cinematicValues.lookAtz = path[0].lookAtz;

			cinematicValues.timeOfDay = path[0].timeOfDay;

			tween =	TweenLite.to(cinematicValues, duration, {
				bezier: {
					values: path,
					curviness: 0,
					type: "soft",
					timeResolution: 0
				},
				ease: Power0.easeNone,
				onComplete: function() {
					setPlay();
				},
				onUpdate: function() {
					socket.emit('CAMERA_SET_POS', {
						x: cinematicValues.x,
						y: cinematicValues.y,
						z: cinematicValues.z ,
						lookAtx: cinematicValues.lookAtx,
						lookAty: cinematicValues.lookAty,
						lookAtz: cinematicValues.lookAtz,
						timeOfDay: cinematicValues.timeOfDay
					});
				}
			});
		});

	};

	$(document).on("click", ".deleteWaypoint",function() {
		this.closest('tr').remove();
	});

	$('.play').click(function() {
		if (isPlaying) {
			stopTween();
			setPlay();
		} else {
			setPlaying();
			sendWaypointData();
		}
	});
});
