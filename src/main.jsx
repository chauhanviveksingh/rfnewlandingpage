import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SeoCompo from './components/FeatureList.jsx'
import CollapsibleContent from './components/CollapsibleContent';
import HowToOrder from './components/HowToOrder.jsx';
import SpecialOffers from './components/SpecialOffers.jsx';
import GroupOrder from './components/GroupOrder.jsx';
import Testimonial from './components/Testimonial.jsx';
import Appdownload from './components/Appdownload.jsx';
import Footer from './components/Footer.jsx';
import FloatingButtons from './components/FloatingButton.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <SeoCompo />
    <HowToOrder />
    <SpecialOffers/>
    <GroupOrder/>
    <Testimonial/>
    <CollapsibleContent />
    <Appdownload/>
    <Footer/>
    <FloatingButtons/>


  </StrictMode>
)
