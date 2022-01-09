import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import CategoriesPage from './pages/CategoriesPage'
import CoursesPage from './pages/CoursesPage'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { userAuthenticated } from './components/AuthenticationSlice';
import Navigation from './components/Navigation'
import Footer from './components/Footer';
import { HomePage } from './pages/HomePage';
import { About } from './pages/AboutPage';


const App = () => {
  const { isLoggedIn } = useSelector(state => state.authenticationSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    if (token !== undefined && token !== null) {
      dispatch(userAuthenticated({ accessToken: token }))
    }
  }, [])

  return (
    <BrowserRouter>
      <Navigation />
        <div style={{backgroundColor:"#1C1C1C", minHeight:"800px"}} >
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/categories' element={<CategoriesPage />}></Route>
        <Route exact path='/categories/:id' element={<CoursesPage />} />
        <Route path='/signup' element={isLoggedIn ? <Navigate to='/' /> : <SignUpPage />} />
        <Route path='/signin' element={isLoggedIn ? <Navigate to='/' /> : <SignInPage />} />
        <Route component={() => <h2>Page not found</h2>} />
      </Routes>
      </div>
      <Footer />
    </BrowserRouter>)

}
//<Route exact path='/categories/:id' element={(isLoggedIn ? <CoursesPage /> : <SignInPage />)} />
//<Route path='/signup' element={() => (isLoggedIn ? <Navigate to='/' /> : <SignUpPage />)} />
//<Route path='/signin' render={() => (isLoggedIn ? <Navigate to='/' /> : <SignInPage />)} />
//<Route exact path = '/' render={() => (isLoggedIn ? <HomePage/> : <SignInPage/>)}/>
export default App;
//
/*function App() {
  const [user, setUser] = useState(null)

  const providerValue = useMemo(()=> ({user, setUser}), [user,setUser])

  return (
    <div className="container">
      <BrowserRouter>
        <Navigation />
        <UserContext.Provider value={providerValue}>
          <Routes>
            <Route path='/Index' element={<Index />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Categories' element={<Categories />} />
            <Route path='/About' element={<About />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}*/