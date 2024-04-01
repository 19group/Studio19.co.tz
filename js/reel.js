document.addEventListener('DOMContentLoaded', function(){
    var playButton = document.getElementById('playButton');
    var closeButton = document.getElementById('closeButton');
    var video = document.getElementById('video');
    var textContainer = document.getElementById('textContainer');
    var videoContainer = document.querySelector('.video-container');

    playButton.addEventListener('click', function(event){
        event.preventDefault();
        setTimeout(function() {
            video.pause();
            videoContainer.style.display = 'none';
        }, 60000);
        try {
            var playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log('Video playback started');
                    textContainer.style.display = 'none';
                    videoContainer.style.display = 'block';
                }).catch(error => {
                    console.error('Video playback failed:', error.message);
                });
            }
        } catch(error) {
            console.error('Video playback failed:', error.message);
        }
    });

    closeButton.addEventListener('click', function(){
        video.pause();
        videoContainer.style.display = 'none';
        textContainer.style.display = 'block';
    });

    video.addEventListener('ended', function(){
        videoContainer.style.display = 'none';
        textContainer.style.display = 'block';
    });

    video.addEventListener('error', function(event) {
        console.error('Video playback error:', event.target.error);
    });
});
