# component App

## Стейты App

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
