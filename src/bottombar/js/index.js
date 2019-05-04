let tween;
let isPlaying = false;
const {
  $,
  jQuery,
  Power0,
  TweenLite,
  socket
} = window;

const easing = [
  {
    base: 'Power0',
    sub: 'easeNone',
    configurable: null
  },
  {
    base: 'Power1',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: null
  },
  {
    base: 'Power2',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: null
  },
  {
    base: 'Power3',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: null
  },
  {
    base: 'Power4',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: null
  },
  {
    base: 'Back',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: [{ placeholder: 'overshoot ' }]
  },
  {
    base: 'Elastic',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: [{ placeholder: 'amplitude (1.1)' }, { placeholder: 'period (0.4)' }]
  },
  {
    base: 'Bounce',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: null
  },
  {
    base: 'RoughEase',
    sub: 'ease',
    configurable: {
      template: Power0.easeNone,
      strength: 1,
      points: 20,
      taper: 'none',
      randomize: true,
      clamp: false
    }
  },
  {
    base: 'SlowMo',
    sub: 'ease',
    configurable: [{ placeholder: 'linearRatio (0.5)' }, { placeholder: 'power (0.8)' }, { placeholder: 'yoyoMode (1 or 0)' }]
  },
  {
    base: 'SteppedEase',
    sub: null,
    configurable: [{ placeholder: 'n of steps' }]
  },
  {
    base: 'Circ',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: null
  },
  {
    base: 'Expo',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: null
  },
  {
    base: 'Sine',
    sub: ['easeIn', 'easeInOut', 'easeOut'],
    configurable: null
  }
];

$(document).ready(() => {
  const { shell } = require('electron');
  jQuery('.easingInfo').click((event) => {
    event.preventDefault();
    shell.openExternal(this.href);
  });

  const setPlay = () => {
    $('.play').html('<span class="glyphicon glyphicon-play"></span> Play');
    isPlaying = false;
  };

  const setPlaying = () => {
    $('.play').html('<span class="glyphicon glyphicon-pause"></span> Playing');
    isPlaying = true;
  };

  const stopTween = () => {
    if (tween) {
      tween.pause();
      setPlay();
    }
  };

  $('.stop').click(() => stopTween());

  const easeBase = $('#easeBase');
  const easeSub = $('#easeSub');
  const subConfig = $('#subConfig');

  const getEasing = () => {
    let base = window;
    base = base[$('#easeBase option:selected').val()][$('#easeSub option:selected').val()];

    const currBase = $('#easeBase option:selected').val();
    const [currAnim] = easing.filter(item => item.base === currBase);

    if (Array.isArray(currAnim.configurable)) {
      if (currAnim.base === 'RoughEase') {
        base = base.config(currAnim.configurable);
      } else {
        const args = [];
        subConfig.find('input').each((key, item) => {
          args.push(parseFloat(item.value));
        });
        base = base.config.apply(this, args);
      }
    }

    return base;
  };

  const cinematicValues = {
    x: 0,
    y: 0,
    z: 0,
    lookAtx: 0,
    lookAty: 0,
    lookAtz: 0,
    timeOfDay: 0
  };

  const sendWaypointData = () => {
    const path = [];
    const rows = $('.waypoints > tbody > tr');
    const duration = parseInt($('.durationSelector input').val(), 10);
    if (rows.length <= 1) return;

    rows.each((index, row) => {
      row = $(row);
      const x = parseFloat($(row.children()[1]).find('textarea').val());
      const y = parseFloat($(row.children()[2]).find('textarea').val());
      const z = parseFloat($(row.children()[3]).find('textarea').val());
      const lookAtx = parseFloat($(row.children()[4]).find('textarea').val());
      const lookAty = parseFloat($(row.children()[5]).find('textarea').val());
      const lookAtz = parseFloat($(row.children()[6]).find('textarea').val());

      const roll = parseFloat($(row.children()[7]).find('textarea').val());
      const timeOfDay = parseFloat($(row.children()[8]).find('textarea').val());
      const frameRate = parseFloat($(row.children()[9]).find('textarea').val());
      path.push({
        x,
        y,
        z,
        lookAtx,
        lookAty,
        lookAtz,
        timeOfDay,
        roll,
        frameRate
      });
    }).promise().done(() => {
      cinematicValues.x = path[0].x;
      cinematicValues.y = path[0].y;
      cinematicValues.z = path[0].z;
      cinematicValues.lookAtx = path[0].lookAtx;
      cinematicValues.lookAty = path[0].lookAty;
      cinematicValues.lookAtz = path[0].lookAtz;

      cinematicValues.timeOfDay = path[0].timeOfDay;
      cinematicValues.roll = path[0].roll;
      cinematicValues.frameRate = path[0].frameRate;

      tween = TweenLite.to(cinematicValues, duration, {
        bezier: {
          values: path,
          curviness: 0,
          type: 'soft',
          timeResolution: 0
        },
        ease: getEasing(),
        onComplete: setPlay,
        onUpdate: () => {
          socket.emit('CAMERA_SET_POS', {
            x: cinematicValues.x,
            y: cinematicValues.y,
            z: cinematicValues.z,
            lookAtx: cinematicValues.lookAtx,
            lookAty: cinematicValues.lookAty,
            lookAtz: cinematicValues.lookAtz,
            timeOfDay: cinematicValues.timeOfDay,
            roll: cinematicValues.roll,
            frameRate: cinematicValues.frameRate
          });
        }
      });
    });
  };

  $(document).on('click', '.deleteWaypoint', () => {
    this.closest('tr').remove();
  });

  const applySubAnimation = () => {
    const currBase = $('#easeBase option:selected').val();
    const [currAnim] = easing.filter(item => item.base === currBase);

    if (typeof currAnim.sub === 'object') {
      $.each(currAnim.sub, (key, item) => {
        easeSub.append($('<option>', { value: item, text: item }));
      });
    }

    if (typeof currAnim.sub === 'string') {
      easeSub.append($('<option>', { value: currAnim.sub, text: currAnim.sub }));
    }

    subConfig.empty();
    if (Object.prototype.toString.call(currAnim.configurable) === '[object Array]') {
      const total = currAnim.configurable.length;
      let item;
      for (let i = 0; i < total; i++) {
        item = currAnim.configurable[i];
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = item.placeholder;
        subConfig.append(input);
      }
    }

    easeSub.multiselect('rebuild');
  };

  const applyEasing = () => {
    $.each(easing, (key, item) => {
      easeBase.append($('<option>', {
        value: item.base,
        text: item.base
      }));
    });
    easeBase.multiselect({
      onChange: () => {
        easeSub.empty();
        applySubAnimation();
      }
    });
  };

  applyEasing();
  applySubAnimation();
  easeSub.multiselect();
  $('.play').click(() => {
    if (isPlaying) {
      stopTween();
      setPlay();
    } else {
      setPlaying();
      sendWaypointData();
    }
  });
});
