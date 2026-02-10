import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Shell/Home';
import Aura from './mockups/Aura/Aura';
import GearHead from './mockups/GearHead/GearHead';
import Guardian from './mockups/Guardian/Guardian';
import Savor from './mockups/Savor/Savor';
import Velvet from './mockups/Velvet/Velvet';
import DynamicInsurance from './mockups/DynamicInsurance/DynamicInsurance';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aura" element={<Aura />} />
        <Route path="/gearhead" element={<GearHead />} />
        <Route path="/guardian" element={<Guardian />} />
        <Route path="/savor" element={<Savor />} />
        <Route path="/velvet" element={<Velvet />} />
        <Route path="/dynamic-insurance" element={<DynamicInsurance />} />
      </Routes>
    </Router>
  );
}

export default App;
