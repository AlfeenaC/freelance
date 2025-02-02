import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from './App'
import './index.css'

const paypalInitialOptions = {
  "client-id": "your_paypal_client_id",
  currency: "USD",
  intent: "capture",
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={paypalInitialOptions}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
)
