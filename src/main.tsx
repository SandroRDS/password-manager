import React from 'react'
import ReactDOM from 'react-dom/client'
import AppMobile from './AppMobile'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  window.innerWidth < 996 ? (
    <React.StrictMode>
      <AppMobile />
    </React.StrictMode>
  ) : (
    <React.StrictMode>
      {/* <AppDesktop /> */}
    </React.StrictMode>
  ),
)
