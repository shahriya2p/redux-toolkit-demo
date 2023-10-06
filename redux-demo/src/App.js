import React from 'react';

import { Employee } from "./features/employee/Employee";
import { Header } from "./features/header";
import { ToastNotify } from './features/Toast/toastNotification';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ToastNotify />
      <Employee />
    </div>
  );
}

export default App;
