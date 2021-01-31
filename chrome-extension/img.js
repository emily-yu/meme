window.onload = () => {
	console.log('loaded extension')
    console.log('asdf')
    snapshot()
    testSpeech()

    // make paypal request on server
    fetch('http://localhost:5000/charge').then(r => r.text()).then(result => {
      // Result now contains the response text, do what you want...
      console.log('ez clapperoni')
      console.log(result)
    })
}

const snapshot = () => {
    // get a snapshot from videos that are being displayed
    videoCandidates = document.getElementsByClassName('Gv1mTb-aTv5jf')
    for (let video of videoCandidates) {
        console.log(video.style.display)
        if (video.style.display == "") { // process

            const canvas = document.createElement("canvas");
            // scale the canvas accordingly
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            // draw the video at that frame
            canvas.getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height);
            // convert it to a usable data URL
            const dataURL = canvas.toDataURL();

            var img = document.createElement("img");
            img.src = dataURL;

            console.log(img) // image in base64URL
        }
    }
}

function testSpeech() {
  
  var create_email = false;
  var final_transcript = '';
  var recognizing = false;
  var ignore_onend;
  var start_timestamp;
  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    // start_button.style.display = 'inline-block';
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
  
    recognition.onstart = function() {
      recognizing = true;
      // showInfo('info_speak_now');
      // start_img.src = 'mic-animate.gif';
    };
  
    recognition.onerror = function(event) {
      console.log('sadge')
      // if (event.error == 'no-speech') {
      //   start_img.src = 'mic.gif';
      //   showInfo('info_no_speech');
      //   ignore_onend = true;
      // }
      // if (event.error == 'audio-capture') {
      //   start_img.src = 'mic.gif';
      //   showInfo('info_no_microphone');
      //   ignore_onend = true;
      // }
      // if (event.error == 'not-allowed') {
      //   if (event.timeStamp - start_timestamp < 100) {
      //     showInfo('info_blocked');
      //   } else {
      //     showInfo('info_denied');
      //   }
      //   ignore_onend = true;
      // }
    };
  
    recognition.onend = function() {
      recognizing = false;
      if (ignore_onend) {
        return;
      }
      // start_img.src = 'mic.gif';
      // if (!final_transcript) {
      //   showInfo('info_start');
      //   return;
      // }
      // showInfo('');
      // if (window.getSelection) {
      //   window.getSelection().removeAllRanges();
      //   var range = document.createRange();
      //   range.selectNode(document.getElementById('final_span'));
      //   window.getSelection().addRange(range);
      // }
      // if (create_email) {
      //   create_email = false;
      //   createEmail();
      // }
    };
  
    recognition.onresult = function(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      final_transcript = capitalize(final_transcript);
      // final_span.innerHTML = linebreak(final_transcript);
      // interim_span.innerHTML = linebreak(interim_transcript);

      // CHARGE ON PAYPAL
      console.log(final_transcript)
      final_transcript = final_transcript.replace(/ /g, '')
      console.log(final_transcript)
      console.log()
      if (final_transcript.trim().toLowerCase().includes('whitespace')) {
        console.log("CHARGE THAT MOTHER FUCK")
        
        console.log(document.getElementById('charge'))
        if (!document.getElementById('charge')) {
          var div=document.createElement("div"); 
          document.body.appendChild(div);
          div.style = '\
            padding-left: 30%;\
            position: absolute;\
            width: 100%;\
            z-index: 10000000;\
            padding-top: 10px;\
            padding-bottom: 10px;\
            background: red;\
            color: white;\
            font-weight: bold;\
          '
          div.id="charge"
          div.innerText="someone just got charged for saying whitespace";
          
          // reset text to track
          final_transcript = ''

          // remove after 5 seconds
          setTimeout(function(){
            document.getElementById('charge').remove();
          }, 5000);
        }
      }


      if (final_transcript || interim_transcript) {
        // showButtons('inline-block');
      }
    };
  }
  
  // function upgrade() {
  //   // start_button.style.visibility = 'hidden';
  //   showInfo('info_upgrade');
  // }
  
  var two_line = /\n\n/g;
  var one_line = /\n/g;
  function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  }
  
  var first_char = /\S/;
  function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
  }
  
  // function createEmail() {
  //   var n = final_transcript.indexOf('\n');
  //   if (n < 0 || n >= 80) {
  //     n = 40 + final_transcript.substring(40).indexOf(' ');
  //   }
  //   var subject = encodeURI(final_transcript.substring(0, n));
  //   var body = encodeURI(final_transcript.substring(n + 1));
  //   window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
  // }
  
  // function copyButton() {
  //   if (recognizing) {
  //     recognizing = false;
  //     recognition.stop();
  //   }
  //   copy_button.style.display = 'none';
  //   copy_info.style.display = 'inline-block';
  //   showInfo('');
  // }
  
  // function emailButton() {
  //   if (recognizing) {
  //     create_email = true;
  //     recognizing = false;
  //     recognition.stop();
  //   } else {
  //     createEmail();
  //   }
  //   email_button.style.display = 'none';
  //   email_info.style.display = 'inline-block';
  //   showInfo('');
  // }
  
  // function startButton(event) {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';
    // recognition.lang = select_dialect.value;
    recognition.lang = 'en-US'
    recognition.start();
    ignore_onend = false;
    // final_span.innerHTML = '';
    // interim_span.innerHTML = '';
    // start_img.src = 'mic-slash.gif';
    // showInfo('info_allow');
    // showButtons('none');
    start_timestamp = event.timeStamp;
  // }
  
  // function showInfo(s) {
  //   if (s) {
  //     for (var child = info.firstChild; child; child = child.nextSibling) {
  //       if (child.style) {
  //         child.style.display = child.id == s ? 'inline' : 'none';
  //       }
  //     }
  //     info.style.visibility = 'visible';
  //   } else {
  //     info.style.visibility = 'hidden';
  //   }
  // }
  
  var current_style;
  // function showButtons(style) {
  //   if (style == current_style) {
  //     return;
  //   }
  //   current_style = style;
  //   copy_button.style.display = style;
  //   email_button.style.display = style;
  //   copy_info.style.display = 'none';
  //   email_info.style.display = 'none';
  // }
}