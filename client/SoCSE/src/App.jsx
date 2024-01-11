// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './components/ContextAPI/userContext.jsx';
import Header from './components/Header/Header.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Home from './pages/Home/Home.jsx';
import SignIn from './pages/Signin/SignIn.jsx';
import SignUp from './pages/Signup/SignUp.jsx';
import CreatePost from './pages/CreatePost/CreatePost.jsx';
import Article from './pages/Article/Article.jsx'; // Import your Article component
import Footer from './components/Footer/Footer.jsx';

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
              <Route path="/create" element={<CreatePost />} />
              {/* Route for viewing single article */}
              <Route path="/article/:id" element={<Article />} />
            </Routes>
          </main>
    
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
