import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import * as AWS from 'aws-sdk'
// import { ConfigurationOptions } from 'aws-sdk'

// const configuration: ConfigurationOptions = {
//     region: 'us-east-1',
//     secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
//     accessKeyId: 'YOUR_ACCESS_KEY_ID'
// }

// AWS.config.update(configuration)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
