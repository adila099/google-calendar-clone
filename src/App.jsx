import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import CalendarApp from './components/CalendarApp';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <CalendarApp />
      </PersistGate>
    </Provider>
  );
}

export default App;