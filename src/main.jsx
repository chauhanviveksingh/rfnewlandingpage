import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SeoCompo from './components/FeatureList.jsx'
import CollapsibleContent from './components/CollapsibleContent';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <SeoCompo />
    <CollapsibleContent />
  </StrictMode>
)
