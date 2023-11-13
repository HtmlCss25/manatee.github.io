import React from 'react';
import {Player} from "./Player.jsx"


export class Card extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isClicked : false,

        }
    }

    handleCardClick = (e)=>{
        this.setState({isClicked:true},console.log("click sur la card"))
        document.body.style.overflow = "hidden"
    }

    handleOutsideClick = (e,animationId)=>{
        e.stopPropagation();
        this.setState({isClicked:false},()=>{
            document.body.style.overflow = "visible"
        })
        cancelAnimationFrame(animationId)
    }

    render(){
        return (
            
            <article onClick={this.handleCardClick} className='card'>
                <img src={this.props.cover} alt="Cover de l'instrumental" />
                
                <h3>{this.props.title}</h3>
                
                {this.state.isClicked && (
                    <Player handleOutsideClick={this.handleOutsideClick} cover={this.props.cover} title={this.props.title} source={this.props.source}/>
                )}
            </article>

          );
    }
}