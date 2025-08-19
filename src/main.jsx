import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SeoCompo from './components/FeatureList.jsx'
import CollapsibleContent from './components/CollapsibleContent';
import HowToOrder from './components/HowToOrder.jsx';
import SpecialOffers from './components/SpecialOffers.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <SeoCompo />
    <CollapsibleContent />
    <HowToOrder />
    <SpecialOffers/>
  </StrictMode>
)
