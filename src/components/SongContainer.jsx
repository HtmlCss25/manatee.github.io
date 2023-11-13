import React, { useState } from 'react';
import {useEffect} from 'react'
import {Card} from "./Card.jsx"
import { click } from '@testing-library/user-event/dist/click.js';

const serverResponseSimulation = [
    {source: "boomBap.mp3",title:'Last On Earth',cover :'bommBap_cover.jpg',category:'boom_bap',tags:'',type:"audio/mpeg"},
    {source: "canard.mp3",title:'Another World',cover :'canard_cover.jpg',category:'chill',tags:'',type:"audio/mpeg"},
    {source: "diamond.mp3",title:'Shine',cover :'diamond_cover.jpg',category:'hard',tags:'',type:"audio/mpeg"},
    {source: "guitarBell.mp3",title:'Walk Around',cover :'guitareBell_cover.jpg',category:'boom_bap',tags:'',type:"audio/mpeg"},
    {source: "rhodesBell.mp3",title:'Left My Home',cover :'rhodesBell_cover.jpg',category:'chill',type:"audio/mpeg"},
    {source: "voix.wav",title:'Dreams',cover :'voix_cover.jpg',category:'chill',type:"audio/wav"},
    {source: "wtf3.mp3",title:"Don't Look Back",cover :'wtf3_cover.jpg',category:'hard',type:"audio/mpeg"},
    {source: "wtf4.mp3",title:"Stay Focus",cover :'wtf4_cover.jpg',category:'club',type:"audio/mpeg"},
    {source: "vitefait.mp3",title:"Journey",cover :'vitefait_cover.jpg',category:'chill',type:"audio/mpeg"},
    {source: "ratman.mp3",title:"RatMan",cover :'ratman_cover.jpg',category:'hard',type:"audio/mpeg"},
    {source: "flute.mp3",title:"King",cover :'flute_cover.jpg',category:'club',type:"audio/mpeg"},
  ]

  let Cards = serverResponseSimulation.map((song,index)=>{
      
                      
                    
    return(
      <Card key={index} cover ={`./img/cover/${song.cover}`} source={`./songs/${song.source}`} title={song.title} type={song.type} category={song.category}/>
    )
  
  })




export class SongContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            songsToDisplay : Cards,
            cardsStyle : undefined,
            links : [
              {dataset: "all", text: "See All" },
              {dataset: "boom_bap", text: "Boom Bap"},
              {dataset: "chill", text: "Chill"},
              {dataset: "hard", text: "Hard"},
              {dataset: "club", text: "Club"},
            ]
        }
    }

    
    getSongs = (e) => {
        const filter = () => {
          if (e.target.dataset.value === "all") {
            return serverResponseSimulation;
          } else {
            return serverResponseSimulation.filter((card) => {
              return card.category === e.target.dataset.value;
            });
          }
        }
      
        const filtered = filter();
      
        const songs = filtered.map((song,index)=>{
      
                    
            return(
              <Card key={index} cover ={`./img/cover/${song.cover}`} source={`./songs/${song.source}`} title={song.title} type={song.type} category={song.category}/>
            )
          
          })
          this.setState({cardsStyle:{opacity:"0"}})
          setTimeout(()=>{
            this.setState({songsToDisplay:songs})
            this.setState({cardsStyle:{opacity:"1"}})
          },300)
      }
      
      slidingNavBar=(e)=>{

        const slidingContainer = document.querySelector('#slidingContainer')

        const updatedLinks = this.state.links.slice(); // Créez une copie pour éviter la mutation directe de l'état
        let clickedLinkIndex = updatedLinks.findIndex(link => link.dataset === e.target.dataset.value);
        let clickedLink = updatedLinks[clickedLinkIndex]
        let transformValue = 0
        
        slidingContainer.style.transition = "transform 1s"

        while(clickedLinkIndex !== 2) {

          if(clickedLinkIndex <2){
            const lastLink = updatedLinks.pop();
            updatedLinks.unshift(lastLink)
            transformValue+=20
          }else if(clickedLinkIndex >2){
            const lastLink = updatedLinks.shift();
            updatedLinks.push(lastLink)
            transformValue-=20
          }
          clickedLinkIndex = updatedLinks.findIndex(link => link.dataset === clickedLink.dataset)
        }
          
        slidingContainer.style.transform = `translateX(${transformValue}%)`
        
        // let middle = Math.floor(updatedLinks.length / 2);
        // let first = updatedLinks.slice(0, middle);
        // let last = updatedLinks.slice(middle);
        // let newLinks = [...first, clickedLink, ...last];
        setTimeout(()=>{
          slidingContainer.style.transition = "transform 0s"
          slidingContainer.style.transform = `translateX(0px)`
          this.setState({links:updatedLinks})
        },1000)

      }

      handleLinkClick=(e)=>{
        this.slidingNavBar(e)
        this.getSongs(e)
      }
      
      
    render(){    
        return (
          
            
            <main>
              <div className='songContainer' id='songContainer'>
                <div className='overflowHidden'>
                  <ul id='slidingContainer'>
                      <li>{this.state.links[3].text}</li>
                      <li>{this.state.links[4].text}</li>
                    {this.state.links.map(link=>(
                      <li key={link.dataset} onClick={this.handleLinkClick} data-value ={link.dataset} className="categorySelector">{link.text}</li>
                    ))}
                      <li>{this.state.links[0].text}</li>
                      <li>{this.state.links[1].text}</li>
                  </ul>
                </div>
                <section id='cards' style={this.state.cardsStyle}>{this.state.songsToDisplay}</section>
              </div>
            </main>
           
        );
    } 

}



