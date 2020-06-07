// import lodash from 'lodash';
import Tone from 'tone';
// import Transport from 'tone/transport';
// import Transport from 'tone/Tone/core/Transport';

document.addEventListener('DOMContentLoaded', () => {
  let technoIsPlayed = false;
  let isTrianglePlayed = false;
  let isSinePlayed = false;
  let isSawtoothPlayed = false;
  const styles = document.querySelector('#styles');
  document.querySelector('#styleChanger').addEventListener('click', () => styles.classList.toggle('hidden'));
  // TECHNO
  function technoSequencer(state) {
    // creating samples buffers
    const technoKick = new Tone.Buffer('./assets/samples/techno/technoKick.wav');
    const technoHat = new Tone.Buffer('./assets/samples/techno/technoHat.wav');
    const technoSnare = new Tone.Buffer('./assets/samples/techno/technoSnare.wav');
    const technoShaker = new Tone.Buffer('./assets/samples/techno/technoShaker.wav');
    const synths = [new Tone.Synth(), new Tone.Synth(), new Tone.Synth()];
    synths.forEach((synth) => synth.toMaster());
    let technoKickPlayer = {};
    let technoHatPlayer = {};
    let technoSnarePlayer = {};
    let technoShakerPlayer = {};
    Tone.Buffer.on('load', function () {
      technoKickPlayer = new Tone.Player(technoKick);
      technoKickPlayer.toMaster();
      technoHatPlayer = new Tone.Player(technoHat);
      technoHatPlayer.toMaster();
      technoSnarePlayer = new Tone.Player(technoSnare);
      technoSnarePlayer.toMaster();
      technoShakerPlayer = new Tone.Player(technoShaker);
      technoShakerPlayer.toMaster();
    });
    // looping and playing samples
    let index = 0;
    function repeat() {
      const step = index % 16;
      let kickInputs = [];
      let hatInputs = [];
      let snareInputs = [];
      let shakerInputs = [];
      kickInputs = document.querySelector(`.kick input:nth-of-type(${step + 1})`);
      hatInputs = document.querySelector(`.hihat input:nth-of-type(${step + 1})`);
      snareInputs = document.querySelector(`.snare input:nth-of-type(${step + 1})`);
      shakerInputs = document.querySelector(`.shaker input:nth-of-type(${step + 1})`);
      if (kickInputs.checked) {
        technoKickPlayer.start();
      }
      if (hatInputs.checked) {
        technoHatPlayer.start();
      }
      if (snareInputs.checked) {
        technoSnarePlayer.start();
      }
      if (shakerInputs.checked) {
        technoShakerPlayer.start();
      }
      index += 1;
    }
    if (state === 'start') {
      Tone.Transport.bpm.value = 140;
      Tone.Transport.scheduleRepeat(repeat, '16n');
      Tone.Transport.start();
    }
    if (state === 'stop') {
      Tone.Transport.cancel();
    }
  }
  // player status
  function playTechno() {
    if (!technoIsPlayed) {
      technoIsPlayed = true;
      technoSequencer('start');
    } else {
      technoIsPlayed = false;
      technoSequencer('stop');
    }
  }
  // synths generated by tone.js and HTML5 web audio api
  const triangle = new Tone.Synth().toMaster();
  const triangleLoop = new Tone.Loop(function () {
    triangle.triggerAttackRelease('C2', '1n');
  }, '1n');
  const sine = new Tone.Synth('sine').toMaster();
  const sineLoop = new Tone.Loop(function () {
    sine.triggerAttackRelease('c4', '1n');
  }, '1n');
  const sawtooth = new Tone.Synth('sawtooth').toMaster();
  const sawtoothLoop = new Tone.Loop(function () {
    sawtooth.triggerAttackRelease('c2', '1n');
  }, '1n');

  function playSynth(synth) {
    if (synth === 'triangle') {
      if (isTrianglePlayed === true) {
        triangleLoop.start(0);
      } else {
        triangleLoop.stop(0);
      }
    } else if (synth === 'sine') {
      if (isSinePlayed === true) {
        sineLoop.start(0);
      } else {
        sineLoop.stop(0);
      }
    } else if (synth === 'sawtooth') {
      if (isSawtoothPlayed === true) {
        sawtoothLoop.start(0);
      } else {
        sawtoothLoop.stop(0);
      }
    }
  }
  // Interface handling
  const playBtn = document.querySelector('#play');
  const btnSynth1 = document.querySelector('#triangle');
  const btnSynth2 = document.querySelector('#sine');
  const btnSynth3 = document.querySelector('#sawtooth');
  playBtn.addEventListener('click', function () {
    if (technoIsPlayed === true) {
      playBtn.innerHTML = '<i class="icon-play-circled2"></i>';
    } else playBtn.innerHTML = '<i class="icon-pause-circle-o"></i>';
    playTechno();
  });
  btnSynth1.addEventListener('click', function () {
    if (isTrianglePlayed === false) {
      isTrianglePlayed = true;
      btnSynth1.innerHTML = '<i class="icon-pause-circle-o"></i>';
    } else {
      isTrianglePlayed = false;
      btnSynth1.innerHTML = '<i class="icon-play-circled2"></i>';
    }
    playSynth('triangle');
  });
  btnSynth2.addEventListener('click', function () {
    if (isSinePlayed === false) {
      isSinePlayed = true;
      btnSynth2.innerHTML = '<i class="icon-pause-circle-o"></i>';
    } else {
      isSinePlayed = false;
      btnSynth2.innerHTML = '<i class="icon-play-circled2"></i>';
    }
    playSynth('sine');
  });
  btnSynth3.addEventListener('click', function () {
    if (isSawtoothPlayed === false) {
      isSawtoothPlayed = true;
      btnSynth3.innerHTML = '<i class="icon-pause-circle-o"></i>';
    } else {
      isSawtoothPlayed = false;
      btnSynth3.innerHTML = '<i class="icon-play-circled2"></i>';
    }
    playSynth('sawtooth');
  });
});
