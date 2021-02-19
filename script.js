const audioTag = document.getElementsByClassName('audioTag')[0];
const playlistContainerTag = document.getElementsByClassName('playlistContainer')[0];
const currentAndTotleTimeTag = document.getElementsByClassName('currentAndTotleTime')[0];
const currentProgressTag = document.getElementById('currentProgress');
const playButton = document.getElementsByClassName('playButton')[0];
const pauseButton = document.getElementsByClassName('pauseButton')[0];
const previousButton = document.getElementsByClassName('previousButton')[0];
const nextButton = document.getElementsByClassName('nextButton')[0];

const musics = [

    {trackID:'musics/track1.mp3',songName:'Thomazz - Miracle'},
    {trackID:'musics/track2.mp3',songName:'Kina - Can We Kiss Forever'},
    {trackID:'musics/track3.mp3',songName:'Sasha Sloan - Dancing With Your Ghost'},
    {trackID:'musics/track4.mp3',songName:'Nightcore Nea - Some Say'},
    {trackID:'musics/track5.mp3',songName:'Wine Su Khine Thein - Main Ka Lay Par'},
    {trackID:'musics/track6.mp3',songName:'Selena Gomez - My Dilemma'}

];

for(let i=0;i<musics.length;i++){
    const divTag = document.createElement('div');
    divTag.classList.add('trackItem');
    
    divTag.addEventListener('click',()=>{
        audioTag.src = musics[i].trackID;
        let trackColor = document.getElementsByClassName('trackItem');
        trackColor[i].style.color="#dc3545";
        audioTag.play();
        isPlaying = true;
        playAndPauseButton();
        currentPlayIndex = i;
       
    });
    divTag.textContent = (i+1).toString() + ". " + musics[i].songName;
    playlistContainerTag.append(divTag);
  
 
}

const trackItem = document.getElementsByClassName('trackItem');

let durationText = "00:00";
let duration;
audioTag.addEventListener('loadeddata',()=>{
    duration = Math.floor(audioTag.duration);
    durationText = durationAndCurrentTime(duration);
    
});

audioTag.addEventListener('timeupdate',()=>{
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = durationAndCurrentTime(currentTime);
    // console.log(currentTimeText);
    const currentAndDurationTime = currentTimeText + " / " + durationText;
    currentAndTotleTimeTag.textContent = currentAndDurationTime;
    progressBarUpdate(currentTime);

});

const progressBarUpdate = (currentTime) => {
    const newWidth = (500/duration) * currentTime ;
    currentProgressTag.style.width = newWidth + "px";

}

const durationAndCurrentTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60 ;
    const minutesText = minutes < 10 ? '0' + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? '0' + seconds.toString() : seconds;
    return minutesText +":"+secondsText;
}
let currentPlayIndex= 0;
let isPlaying = false;
playButton.addEventListener('click',()=>{
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    trackItem[currentPlayIndex].style.color ="#dc3545";
    if(currentTime === 0){
     playSong();
   }else{
       audioTag.play();
   }
   playAndPauseButton();
});

pauseButton.addEventListener('click',()=>{
    audioTag.pause();
    isPlaying = false;
    playAndPauseButton();
});

const playAndPauseButton = () => {
    if(isPlaying){
        playButton.style.display = "none";
        pauseButton.style.display = "inline";
    }
    else{
        playButton.style.display = "inline";
        pauseButton.style.display ="none";
    }
};


previousButton.addEventListener('click',()=>{
    if(currentPlayIndex === 0){
        return;
    }
    currentPlayIndex -= 1;
    playSong();
    trackItem[currentPlayIndex+1].style.color = '';//yellow
    trackItem[currentPlayIndex].style.color = '#dc3545';//red
    
});

nextButton.addEventListener('click',()=>{
  if(currentPlayIndex === musics.length -1){
      return;
  }
  currentPlayIndex += 1;
  playSong();
  trackItem[currentPlayIndex-1].style.color ="";//yellow
  trackItem[currentPlayIndex].style.color ="#dc3545";//red
});

const playSong = () => {
    const currentTrack = musics[currentPlayIndex].trackID;
    audioTag.src = currentTrack;
    audioTag.play();
}



