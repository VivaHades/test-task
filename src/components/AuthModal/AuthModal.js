import React, { useState } from 'react'
import './AuthModal.css'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

export default function AuthModal(props) {
  const {
    setModalOpen, 
    modalOpen,
    onLoginChange,
    onPasswordChange,
    login,
    password,
    onButtonClick
  } = props

  const [passwordVerified, setPasswordVerified] = useState(false)
  
  function handleLoginChange(e) {
    onLoginChange(e.target.value)
  }
  function verifyPassword(password) {
    if(password.length < 8) setPasswordVerified(false)
    else setPasswordVerified(true)
  }

  function handlePasswordChange(e) {
    onPasswordChange(e.target.value)
    verifyPassword(e.target.value)
  }
  function handleClick() {
    onButtonClick()
    setModalOpen();
    history.push('/')
  }
  const render = (
      <div className='authWrapper'>
        <div className='bgLayer' onClick={setModalOpen}></div>
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
            { !passwordVerified
              ? <span className='danger'> Пароль должен содержать не менее 8 символов </span>
              : null 
            }
            </div>
            { !passwordVerified
              ? <button disabled type='button' className='disabled'> Войти </button>
              : <button type='button' onClick={handleClick}> Войти </button>
            }
          </form>
        </div>
      </div>
  )

  return !modalOpen ? null : render
}
