import React, { useState } from 'react'
import './AuthModal.css'
import { useNavigate } from 'react-router-dom'



export default function AuthModal(props) {
  const {
    setModalClose, 
    modalOpen,
    onLoginChange,
    onPasswordChange,
    login,
    password,
    onButtonClick
  } = props

  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleLoginChange(e) {
    onLoginChange(e.target.value)
  }

  function handlePasswordChange(e) {
    onPasswordChange(e.target.value)
  }

  function handleClick() {
    const auth = onButtonClick()
    if(auth) {
      setModalClose()
      setError('')
      navigate('/')
    } else {
      setError('Неверный логин или пароль.')
    }
  }
  const render = (
      <div className='authWrapper'>
        <div className='bgLayer' onClick={setModalClose}></div>
        <div className='authModal'>
          <h1> Авторизация </h1>
          <form >
            <label> Логин </label>
            <input
              type='text'
              onChange={handleLoginChange}
              value={login}
            />
            <label> Пароль </label>
            <input 
              type='password' 
              onChange={handlePasswordChange}
              value={password} 
            />
            <div className='errorContainer'>
              { error.length > 0
              ? <span className='danger'> {error} </span>
              : null
              }
              { password.length < 8
                ? <span className='danger'> Пароль должен содержать не менее 8 символов </span>
                : null 
              }
            </div>
            { password.length < 8
              ? <button disabled type='button' className='disabled'> Войти </button>
              : <button type='button' onClick={handleClick}> Войти </button>
            }
          </form>
        </div>
      </div>
  )

  return !modalOpen ? null : render
}
