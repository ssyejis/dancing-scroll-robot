import './App.css';
import { Routes, Route } from 'react-router-dom';
import "./css/compiler.css";
import ModelAnimation from './components/ModelAnimation';
import Header from './layout/Header';
import ScrollBanner from './components/ScrollBanner';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ModelAnimation />} />
        <Route path="/scroll" element={<ScrollBanner />} />
      </Routes>
    </>
  );
}

export default App;
