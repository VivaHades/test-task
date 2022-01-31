# component App

Стейты App.

    function App() {
      //стейт для определения рендерить модалку или нет
      const [authModalOpen, setAuthModalOpen] = useState(false)
      const [password, setPassword] = useState('')
      const [login, setLogin] = useState('')
      //стейт определяющий, залогинен ли пользователь
      const [authenticated, setAuthenticated] = useState(false)
      //стейт хрянящий информацию о залогинином пользователе
      const [loginedUser, setLoginedUser] = useState({})

Хендлеры пороля и логина.

    function handleLoginChange(login) {
      setLogin(login)
    }
    
    function handlePasswordChange(password) {
      setPassword(password)
    }

Аутентификация пользователя и логаут.

    function loginUser() {
        data.users.map( user => {
        if (user.login === login && user.password === password) {
            setLoginedUser(user)
            setAuthenticated(true)
        }
        })
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

## Main

Содержимое карточек. Вынес его отдельно, потому что так можно будет легко дополнить их список или вообще получать их от сервера, дополняя список услуг автоматически

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

Создаем историю браузра, так как после авторизации нам нужно будет перенаправить пользователя на его профиль.
    
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

Стейт для верификации пароля

      const [passwordVerified, setPasswordVerified] = useState(false)


      function handleLoginChange(e) {
        onLoginChange(e.target.value)
      }
      
 верификатор пароля
 
      function verifyPassword(password) {
        if(password.length < 8) setPasswordVerified(false)
        else setPasswordVerified(true)
      }


      function handlePasswordChange(e) {
        onPasswordChange(e.target.value)
        verifyPassword(e.target.value)
      }
      
 Перенаправление при отправке формы
 
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


