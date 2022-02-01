# Компонент App

Стейты App.

    function App() {
    стейт для определения рендерить модалку или нет
      const [authModalOpen, setAuthModalOpen] = useState(false)
      const [password, setPassword] = useState('')
      const [login, setLogin] = useState('')
    стейт определяющий, залогинен ли пользователь
      const [authenticated, setAuthenticated] = useState(false)
    стейт хрянящий информацию о залогинином пользователе
      const [loginedUser, setLoginedUser] = useState({})

Обработчики полей пароля и логина.

    function handleLoginChange(login) {
      setLogin(login)
    }
    
    function handlePasswordChange(password) {
      setPassword(password)
    }

Аутентификация пользователя. По идее, эта функция будет на сервере и никаких сеттеров здесь быть не должно. По-хорошему, функция должна просто возвращать истину и пользователя, если аутентификация прошла успешно, иначе ложь. 

    function loginUser() {
      for (const user in data.users) {
        if (data.users[user].login === login && 
        data.users[user].password === password) {
          setLoginedUser(data.users[user])
          setAuthenticated(true)
          return true
        }
      }
      return false
    }

Логаут.

    function logoutUser() {
      setLoginedUser({})
      setAuthenticated(false)
    }

Возвращаем компонент.

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

## Компонент Main

Содержимое карточек вынесем отдельно, потому что так можно будет легко дополнить их список или вообще получать их от сервера, дополняя список услуг автоматически.

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

Если пользователь авторизован - рендерим его профиль.

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
      
      
  По дефолту рендерим главную.
  
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

## Компонент AuthModal 

Импортируем useNavigate для перенаправления на профиль.

    import { useNavigate } from 'react-router-dom'

Стейт для ошибки логина или пароля.

      const [error, setError] = useState('')
      
используем хук для перенаправления.
      
      const navigate = useNavigate()

Обработчики полей.

      function handleLoginChange(e) {
        onLoginChange(e.target.value)
      }

      function handlePasswordChange(e) {
        onPasswordChange(e.target.value)
      }

При отправке логина и пароля если логин прошел успешно - закрываем модалку и перенаправляем на профиль, иначе сеттим ошибку.

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
      
 Рендерим модалку.
 
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
                
    
Если длина ошибки больше нуля, значит она есть и мы ее выводим.

                <div className='errorContainer'>
                  { error.length > 0
                  ? <span className='danger'> {error} </span>
                  : null
                  }
                  
 Если длина пароля меньше 8 символов - выводим ошибку и дизейблим кнопку.
 
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
