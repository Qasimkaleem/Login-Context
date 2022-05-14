import Appbar from './Header/AppBar';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RequireAuth from "./components/requireAuth"
import About from './pages/About';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Signup from './pages/Signup';
import NoMatch from './pages/noMatch';
import {AuthProvider} from './components/auth'

function App() {
  return (
    <AuthProvider>
       <BrowserRouter>
        <Appbar/> 
         <Routes>
           <Route path="/about" element={<About />} />
           <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
           <Route path="/login" element={<Login />} />
           <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
           <Route path="/signup" element={<Signup />} />
           <Route path="*" element={<NoMatch />} />
         </Routes>

       </BrowserRouter>
       </AuthProvider>

  );
}

export default App;
