
import { BrowserRouter,Routes,Route} from "react-router-dom"
import { UserContextProvider } from './components/ContextAPI/userContext.jsx';
import Header from "./components/Header/Header.jsx"
import Profile from "./pages/Profile/Profile.jsx";
import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/Signin/SignIn.jsx";
import SignUp from "./pages/Signup/SignUp.jsx";

function App() {
  return (
    <div>
         <BrowserRouter>
      <UserContextProvider>
        <main>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
      </UserContextProvider>
    </BrowserRouter>
  </div>
  )
}

export default App