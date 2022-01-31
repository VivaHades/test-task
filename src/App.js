import './App.css';

import {useState} from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

import AuthModal from './components/AuthModal/AuthModal'
import Main from './components/Main/Main'
import Contacts from './components/Contacts/Contacts'

import logo from './images/logo.jpg'
import * as USERS_DATA from './users.json';

const data = USERS_DATA

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [loginedUser, setLoginedUser] = useState({})
  function handleLoginChange(login) {
    setLogin(login)
  }
  
  function handlePasswordChange(password) {
    setPassword(password)
  }

  function loginUser() {
    data.users.map( user => {
      if (user.login === login && user.password === password) {
        setLoginedUser(user)
        setAuthenticated(true)
      }
    })
    console.log(login + ' ' + password)
    return "Неверный логин или пороль"
  }
  function logoutUser() {
    setLoginedUser({})
    setAuthenticated(false)
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <header className={authModalOpen ? 'blured' :''}>
          <div className='headerWrapper'>
            <div className='logo'>
              <Link to='/'><img src={logo} alt='Logo'/></Link>
            </div>

            <nav>
              <Link to='/contacts' className='headerContacts'> Контакты</Link>
              { authenticated 
                ? <button 
                    className='headerLogin' 
                    onClick={() => logoutUser()}
                  > 
                  Выйти 
                </button>
               : <button 
                  className='headerLogin'
                  onClick={() => setAuthModalOpen(true)}
                 > 
                 Войти 
                 </button>
              }
            </nav>
          </div>
        </header>
        <div className='wrapper'>
          <Routes>
            <Route 
              path="/" 
              element={<Main 
                  authenticated={authenticated}
                  user={loginedUser}
                  logout={() => logoutUser()}
                  isModalOpen={authModalOpen}
                  setModalOpen={() => setAuthModalOpen(true)} 
                  />
              } 
            />     
            <Route path="/contacts" element={<Contacts />}/>
          </Routes>
        </div>
        <AuthModal
          onButtonClick={() => loginUser()}
          modalOpen={authModalOpen}
          setModalOpen={() => setAuthModalOpen(false)} 
          onLoginChange={handleLoginChange}
          onPasswordChange={handlePasswordChange} 
          login={login}
          password={password}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
