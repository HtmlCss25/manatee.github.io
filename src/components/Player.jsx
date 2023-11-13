import React from 'react';
import { useState } from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';



export class Player extends React.Component{
    constructor(props){
        super(props)
        this.state={
            duration: 0,
            time:1,
            isPaused:true,
            loop:false,
            muted:false,
            volume:50,
            frequencies:undefined,
            animationId :undefined,
        }
    }

    getMinute(seconds){
        const minutes = Math.floor(seconds / 60);
        const secondesRestantes = (seconds % 60).toFixed(0);
        const secondes = secondesRestantes>9? secondesRestantes : `0${secondesRestantes}`
        return `${minutes}:${secondes}`;
    }

    handleSongChange=()=>{
        this.setState({
            time:document.querySelector('#audio').currentTime,
        })
        
    }

    handleBarChange = ()=>{
        
        document.querySelector('#audio').currentTime = document.querySelector('input').value
        this.handleSongChange()
    }

    setDuration =()=>{
        this.setState({
            duration:document.querySelector('#audio').duration
        })
    }

    setVolume =()=>{
      
      document.querySelector ('#audio').volume = this.state.volume/100
      let icon = document.querySelector('#loudnessIcon')
      icon.style.tansform = `scale(${1+(this.state.volume/100)})`
      if(this.state.volume === 0){
        document.querySelector ('#audio').volume = 0
      }
      if(this.state.volume > 1){
        icon.className = "fa-solid fa-volume-off"
      }
      if(this.state.volume >30){
        icon.className = "fa-solid fa-volume-low"
      }
      if(this.state.volume >70){
        icon.className = "fa-solid fa-volume-high"
        icon.style.color = `rgba(164, 212, 214, ${(this.state.volume/100)})`
      }

    }

    handleLoadMeta=()=>{
      this.setDuration()
      this.setVolume()
      this.getFrequencies()
      this.handlePauseBtnClick()
    }

    handlePauseBtnClick=()=>{
      console.log(this.state.animationId)
      const coverDiv = document.querySelector(".cover")
      if(coverDiv.classList.contains('isPlaying')){
        coverDiv.classList.remove("isPlaying")
      }else if(!coverDiv.classList.contains('isPlaying')){
        coverDiv.classList.add('isPlaying')
      }

      this.setState({
        isPaused: !this.state.isPaused
      })  
      if(this.state.isPaused){
        document.querySelector('#audio').play()
      }
      if(!this.state.isPaused){
        document.querySelector('#audio').pause()
      }

    }

    handleBackwardBtnClick = ()=>{
      this.setState({
        time: this.state.time-10.00
      },()=>{
        document.querySelector('#audio').currentTime = this.state.time
      })
    }

    handleForwardBtnClick = ()=>{
      this.setState({
        time: this.state.time+10.00
      },()=>{
        document.querySelector('#audio').currentTime = this.state.time
      })
    }

    handleVolumeChange = ()=>{
      this.setState({
        volume : document.querySelector('#volume').value
      },this.setVolume())
    }

    handleEnd=()=>{
      this.handlePauseBtnClick()
      this.setState({
        time:0
      },()=>{
        document.querySelector('#audio').currentTime = this.state.time
      })
    }

    toggleMute=()=>{
      let icon = document.querySelector('#loudnessIcon')
      if(document.querySelector('#audio').muted){
        document.querySelector('#audio').muted = false
        this.setVolume()
      }else{
        document.querySelector('#audio').muted = true
        icon.className = "fa-solid fa-volume-xmark"
      }
    }

    handleAudioPlayerClick=(e)=>{
      e.stopPropagation();
    }

   getFrequencies=()=>{
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 32; 

    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    const audioElement = document.getElementById('audio');
    const audioSource = audioContext.createMediaElementSource(audioElement);

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    const cover = document.getElementById("cover")
    const coverImage = document.querySelector('#coverImage')

    function updateFrequencyData() {
      analyser.getByteFrequencyData(frequencyData);

      //frequencyData[1] Basses
      //frequencyData[300] mid
      //frequencyData[600] hi hats
      cover.style.boxShadow = `0px 0px ${frequencyData[0]/6}px 0px #3c6e718a, 0px 0px ${frequencyData[3]/6}px 0px #1CA8C18a, 0px 0px ${frequencyData[6]/10}px 0px #1CA8C19a, 0px 0px ${frequencyData[13]/8}px 0px #ffff007a`
      
      const averageFrequency = (frequencyData[0]+frequencyData[3]+frequencyData[6])/3
      
      coverImage.style.opacity = `${averageFrequency/2}%`
      
      return requestAnimationFrame(updateFrequencyData);
    }
    this.state.animationId = updateFrequencyData();
   }


    render(){
        return (
          <div className='greyBackground' onClick={this.props.handleOutsideClick}>
            <div id='audioPlayer' onClick={this.handleAudioPlayerClick}>
              <h2 id='playerTitle'>{this.props.title}</h2>
              <audio src={this.props.source} type={this.props.type} onEnded={this.handleEnd} onTimeUpdate={this.handleSongChange} onLoadedMetadata={this.handleLoadMeta}  id='audio'></audio>
              <div className="cover" id='cover'>
                <span></span>
                <span></span> 
                <span></span>
                <span></span>
                <img src={this.props.cover} alt="cover de l'instrumental" id='coverImage'/>
              </div>
              <div className="navBar">
                <span>{this.getMinute(this.state.time)}</span>
                <input type="range" min='0' max={this.state.duration} value={this.state.time} onChange={this.handleBarChange} onClick={this.handleBarChange}/>
                <span>{this.getMinute(this.state.duration)}</span>
              </div>
              <div className="controlButtons">
                <button className={"fa-solid fa-backward-step"} onClick={this.handleBackwardBtnClick}></button>
                <button className={this.state.isPaused? "fa-solid fa-play" : "fa-solid fa-pause" } onClick={this.handlePauseBtnClick}></button>
                <button className={"fa-solid fa-forward-step"} onClick={this.handleForwardBtnClick}></button>
              </div>
              <input type="range" min="0" max="100" value={this.state.volume} onChange={this.handleVolumeChange} onClick={this.handleVolumeChange} id="volume"/>
              <i className="fa-solid fa-volume-low" id="loudnessIcon" onClick={this.toggleMute}></i>
            </div>
            <a href={this.props.source} download={`Manatee - ${this.props.title}`}>Free Download Here</a>
          </div>
          );
    }
}