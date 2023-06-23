import React from 'react'
import ReactDOM from 'react-dom/client'
import AppMobile from './AppMobile'
import isMobileDevice from './utils/isMobileDevice'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  { isMobileDevice() ? (
      <React.StrictMode>
        <AppMobile />
      </React.StrictMode>
    ) : (
      <React.StrictMode>
        {/* <AppDesktop /> */}
      </React.StrictMode>
    )
  }
  </BrowserRouter>,
)
