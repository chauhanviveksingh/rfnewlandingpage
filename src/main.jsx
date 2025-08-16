import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SeoCompo from './components/FeatureList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <SeoCompo />
  </StrictMode>
)
