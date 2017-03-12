var tween			= undefined;
var isPlaying = false;
$(document).ready(function() {

	var shell = require('electron').shell;
	jQuery('.easingInfo').click(function(event) {
		event.preventDefault();
		shell.openExternal(this.href);
	});

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

	var easeBase 	= $('#easeBase');
	var easeSub 	= $('#easeSub');
	var subConfig = $('#subConfig');

	var getEasing = function() {
		var base = window;
		base = base[$('#easeBase option:selected').val()][$('#easeSub option:selected').val()];

		var currBase = $('#easeBase option:selected').val();
		var currAnim = easing.filter(function(item){ return item.base === currBase; })[0];

		if (Array.isArray(currAnim.configurable)) {
			if(currAnim.base === 'RoughEase') {
				base = base.config(currAnim.configurable);
			} else {
				var args = [];
				var total = currAnim.configurable.length;
				subConfig.find('input').each(function(key, item){
					args.push(parseFloat(item.value));
				});
				base = base.config.apply(this, args);
			}
		}

		return base;
	}

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

			var roll 		= parseFloat($(row.children()[7]).find("textarea").val());
			var timeOfDay = parseFloat($(row.children()[8]).find("textarea").val());
			path.push({ x: x, y: y, z: z, lookAtx: lookAtx, lookAty:lookAty, lookAtz: lookAtz, timeOfDay: timeOfDay, roll: roll});
		}).promise().done( function() {

			cinematicValues.x = path[0].x;
			cinematicValues.y = path[0].y;
			cinematicValues.z = path[0].z;
			cinematicValues.lookAtx = path[0].lookAtx;
			cinematicValues.lookAty = path[0].lookAty;
			cinematicValues.lookAtz = path[0].lookAtz;

			cinematicValues.timeOfDay = path[0].timeOfDay;
			cinematicValues.roll = path[0].roll;

			tween =	TweenLite.to(cinematicValues, duration, {
				bezier: {
					values: path,
					curviness: 0,
					type: "soft",
					timeResolution: 0
				},
				ease: getEasing(),
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
						timeOfDay: cinematicValues.timeOfDay,
						roll: cinematicValues.roll
					});
				}
			});
		});

	};

	$(document).on("click", ".deleteWaypoint",function() {
		this.closest('tr').remove();
	});

	var easing = [
		{
			base: 'Power0',
			sub:  'easeNone',
			configurable: null
		},
		{
			base: 'Power1',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: null
		},
		{
			base: 'Power2',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: null
		},
		{
			base: 'Power3',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: null
		},
		{
			base: 'Power4',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: null
		},
		{
			base: 'Back',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: [{ placeholder: 'overshoot ' }]
		},
		{
			base: 'Elastic',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: [{ placeholder: 'amplitude (1.1)' }, { placeholder: 'period (0.4)' }]
		},
		{
			base: 'Bounce',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: null
		},
		{
			base: 'RoughEase',
			sub:  'ease',
			configurable: { template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false }
		},
		{
			base: 'SlowMo',
			sub:  'ease',
			configurable: [{ placeholder: 'linearRatio (0.5)' }, { placeholder: 'power (0.8)' }, { placeholder: 'yoyoMode (1 or 0)' }]
		},
		{
			base: 'SteppedEase',
			sub:  null,
			configurable: [{ placeholder: 'n of steps' }]
		},
		{
			base: 'Circ',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: null
		},
		{
			base: 'Expo',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: null
		},
		{
			base: 'Sine',
			sub:  ['easeIn', 'easeInOut', 'easeOut'],
			configurable: null
		}
];

	var applyEasing = function() {
		$.each(easing, function( key, item ) {
			easeBase.append($('<option>', {
	      value	: item.base,
	      text 	: item.base
	    }));
		});
		easeBase.multiselect({
			onChange: function(option, checked) {
	      easeSub.empty();
				applySubAnimation();
      }
		});
	};

	var applySubAnimation = function() {
		var currBase = $('#easeBase option:selected').val();
		var currAnim = easing.filter(function(item){ return item.base === currBase; })[0];

		if (typeof currAnim.sub === 'object') {
			$.each(currAnim.sub, function( key, item ) {
				easeSub.append($('<option>', {
		      value	: item,
		      text 	: item
		    }));
			});
		}

		if (typeof currAnim.sub === 'string') {
			easeSub.append($('<option>', {
				value	: currAnim.sub,
				text 	: currAnim.sub
			}));
		}

		subConfig.empty();
		if ( Object.prototype.toString.call(currAnim.configurable) === '[object Array]') {
			var total = currAnim.configurable.length;
			var item 	= null;
			for (var i = 0; i < total; i++) {
				item = currAnim.configurable[i];
				var input = document.createElement("input");
				input.placeholder = item.placeholder
				subConfig.append(input);
			}
		}

		easeSub.multiselect('rebuild');
	};

	applyEasing();
	applySubAnimation();
	easeSub.multiselect();
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
