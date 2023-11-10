import React, { useState } from 'react';
import {useEffect} from 'react'
import {Card} from "./Card.jsx"

const serverResponseSimulation = [
    {source: "boomBap.mp3",title:'Boom Bap',cover :'bommBap_cover.jpg',category:'boom_bap',tags:'',type:"audio/mpeg"},
    {source: "canard.mp3",title:'Canard',cover :'canard_cover.jpg',category:'chill',tags:'',type:"audio/mpeg"},
    {source: "diamond.mp3",title:'DDiamond',cover :'diamond_cover.jpg',category:'jersey',tags:'',type:"audio/mpeg"},
    {source: "guitarBell.mp3",title:'guitare bells',cover :'guitareBell_cover.jpg',category:'boom_bap',tags:'',type:"audio/mpeg"},
    {source: "rhodesBell.mp3",title:'rhodes bells',cover :'rhodesBell_cover.jpg',category:'chill',type:"audio/mpeg"},
    {source: "voix.wav",title:'voix',cover :'voix_cover.jpg',category:'chill',type:"audio/wav"},
    {source: "wtf3.mp3",title:'wtf 3',cover :'wtf3_cover.jpg',category:'hard',type:"audio/mpeg"},
    {source: "wtf4.mp3",title:'wtf 4',cover :'wtf4_cover.jpg',category:'club',type:"audio/mpeg"},
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
            cardsStyle : undefined
        }
    }

    
    getSongs = (e) => {
        const filter = () => {
          if (e.target.value === "all") {
            return serverResponseSimulation;
          } else {
            return serverResponseSimulation.filter((card) => {
              return card.category === e.target.value;
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
                  
      
      
    render(){    
        return (
          
            
            <main>
              <div className='songContainer'>
                <select id="categorySelector" onChange={this.getSongs}>
                    <option value ="all">Voir tous les genres</option>
                    <option value ="boom_bap">Boom Bap</option>
                    <option value ="chill">Chill</option>
                    <option value ="jersey">Jersey</option>
                    <option value ="hard">Hard</option>
                    <option value ="club">Club</option>
                </select>
                <section id='cards' style={this.state.cardsStyle}>{this.state.songsToDisplay}</section>
              </div>
            </main>
           
        );
    } 

}



