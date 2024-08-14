import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import AuthContextProvider from './Context/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const queryClient = new QueryClient({defaultOptions:{queries:{
  
  refetchOnWindowFocus: false
}}});


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <QueryClientProvider client={queryClient}>

    <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer theme={'colored'} autoClose={2500} transition={Bounce} position='bottom-right' />

      <AuthContextProvider>
        <App />

      </AuthContextProvider>

  </QueryClientProvider>

  
)
