window.onload = () => {
	console.log('loaded extension')
    console.log('asdf')
  var asdf = false;
    var checkExist = setInterval(function() {
      if (document.getElementsByClassName('I98jWb').length) {
         console.log("Exists!");
         clearInterval(checkExist);
         snapshot()
         testSpeech()
      }
   }, 100); // check every 100ms

  //   /*
  //   // make paypal request on server
  //   fetch('http://localhost:5000/charge').then(r => r.text()).then(result => {
  //     // Result now contains the response text, do what you want...
  //     console.log('ez clapperoni')
  //     console.log(result)
  //   })
  //   */
  // }
}

const sendJSON = (img) => {
  var data = {
    "requests":[
      {
        "image":{
          "content":img.split('data:image/png;base64,')[1]
        },
        "features":[
          {
            "type":"LABEL_DETECTION",
            "maxResults":1
          }
        ]
      }
    ]
  }

  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://vision.googleapis.com/v1/images:annotate?key={API-KEY}");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    // do something to response
    // console.log(this.responseText);
    console.log(this.responseText)
  };
  xhr.send(json);
}
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const snapshot = () => {
  console.log('snapshottu')
  setTimeout(
    function() {
      console.log('executed')

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
            canvas.toBlob(function(blob) {
              saveAs(blob, "output.png");
          }, "image/png");



            var w=window.open('about:blank','image from canvas');
            w.document.write("<img src='"+dataURL+"' alt='from canvas'/>");



            var img = document.createElement("img");
            img.src = dataURL;

            console.log(img) // image in base64URL

            // request data for meeting on server
            // sendJSON(img.src)

        }
    }
  }, 5000)
}

function testSpeech() {
  
  var create_email = false;
  var final_transcript = '';
  var recognizing = false;
  var ignore_onend;
  // var start_timestamp;
  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    // start_button.style.display = 'inline-block';
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
  
    recognition.onstart = function() {
      recognizing = true;

    };
  
    recognition.onerror = function(event) {
      console.log('sadge')
    };
  
    recognition.onend = function() {
      recognizing = false;
      if (ignore_onend) {
        return;
      }
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
  
  var two_line = /\n\n/g;
  var one_line = /\n/g;
  function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  }
  
  var first_char = /\S/;
  function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
  }
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
    // start_timestamp = event.timeStamp;
  
  var current_style;
}