import React from 'react'
import Card from '../Card/Card'
import './Main.css'
import {Link} from 'react-router-dom'

import appointment from '../../images/appointment.jpg'
import accident from '../../images/accident.jpg'
import cancer from '../../images/cancer.jpg'

const cardsContent = [
  {
    id: 1,
    cardName: 'Онлайн-прием',
    cardImage: <img src={appointment} alt='Онлайн-прием'/>,
    cardContent: 'Рыба текст'
  },
  {
    id: 2,
    cardName: 'Экстренный случай',
    cardImage: <img src={accident} alt='Экстренный случай'/>,
    cardContent: 'Рыба текст'
  },
  {
    id: 3,
    cardName: 'Лечение рака',
    cardImage: <img src={cancer} alt='Лечение рака'/>,
    cardContent: 'Рыба текст'
  }
]

export default function Main(props) {
  const {
    isModalOpen,
    setModalOpen,
    authenticated,
    user,
    logout
  } = props
  
  if(authenticated) {
    return (
    <div className='mainWrapper'>
      <div className='label'><h1>Здравствуйте, {user.name}</h1></div>
      <nav>
        <button className="login logout" onClick={logout}> Выйти из аккаунта </button>
        <Link className='contacts contactsLogout' to='/contacts'> Перейти в контакты </Link>
      </nav>
    </div>
    )
  }
  return (
    <div className={isModalOpen ? 'mainWrapper blured' :'mainWrapper'}>
      <div className='label'><h1> Место для получения медицинской помощи </h1></div>
      <nav>
        <button className="login" onClick={setModalOpen}> Войти </button>
        <Link className='contacts' to='/contacts'> Контакты </Link>
      </nav>
      <div className='cardsWrapper'>
        {cardsContent.map(card => 
          <Card
            key={card.id}
            cardName={card.cardName}
            cardImage={card.cardImage}
            cardContent={card.cardContent}
          />
          )
        }
      </div>
    </div>
  )
}
