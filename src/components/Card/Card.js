import React from 'react'

import './Card.css'

export default function Card(props) {
  const {cardName, cardContent, cardImage} = props
  return (
    <div className='cardWrapper'>
      {cardImage}
      <h5 className='cardName'> {cardName} </h5>
      <div className='cardLine'></div>
      <p className='cardContent'> {cardContent} </p>
    </div>
  )
}
