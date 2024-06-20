import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OurFriends from './pages/OurFriends';
import Home from './pages/Home/Home';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { GlobalStateProvider } from './hooks/GlobalState'; 
import styled from 'styled-components';

const App: React.FC = () => {
  return (
    <GlobalStateProvider> 
      <Router>
        <NavBar />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ourfriends" element={<OurFriends />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Content>
        <Footer />
      </Router>
    </GlobalStateProvider>
  );
};

export default App;

// Styled Components

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
`;
