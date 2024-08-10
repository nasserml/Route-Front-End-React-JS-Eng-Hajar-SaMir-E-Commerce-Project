import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import CounterContextProvider from './Context/CounterContext.jsx';
import AuthContextProvider from './Context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <CounterContextProvider>
    <AuthContextProvider>
      <App />

    </AuthContextProvider>
  </CounterContextProvider>
  
)
