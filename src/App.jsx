import { BrowserRouter, Route, Routes } from "react-router"
import Navbar from "./Components/Global/Navbar"
import { ThemeContext, ThemeProvider } from "./Components/Global/Theme"
import { LoginPage } from "./Components/Global/Login"
import { RegisterPage } from "./Components/Global/Registration"
// import { GlobalDataProvider } from "./Components/Global/GlobalData"
// import { useContext } from "react"

function App() {

  // const { user } = useContext(ThemeContext)

  return (
    <>
      {/* <GlobalDataProvider> */}
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/' element={<Navbar />} ></Route>

            {/* Protected User Routes */}
            {/* <Route element={<UserNavbar />}>
                {user ? (
                  <>
                    ''

                    {user.email == 'admin@gmail.com'
                      ? ''
                      : ''
                    }
                  </>)
                  : <Route path="/" element={<Login />} />
                }
              </Route> */}

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      {/* </GlobalDataProvider> */}
    </>
  )
}

export default App
