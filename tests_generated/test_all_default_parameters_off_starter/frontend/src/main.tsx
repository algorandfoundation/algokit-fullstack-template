import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/App.css'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorFallback from './components/ErrorFallback'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
