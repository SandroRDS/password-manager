import React from 'react'
import ReactDOM from 'react-dom/client'
import AppMobile from './AppMobile'
import isMobileDevice from './utils/isMobileDevice'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  isMobileDevice() ? (
    <React.StrictMode>
      <AppMobile />
    </React.StrictMode>
  ) : (
    <React.StrictMode>
      {/* <AppDesktop /> */}
    </React.StrictMode>
  ),
)
