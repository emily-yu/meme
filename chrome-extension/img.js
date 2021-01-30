window.onload = () => {
	console.log('loaded extension')
    console.log('asdf')
    snapshot()
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