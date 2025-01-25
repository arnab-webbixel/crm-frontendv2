import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/poppins'
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx'
// import {store} from './utils/store/index'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './utils/store/store';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router}/>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
 