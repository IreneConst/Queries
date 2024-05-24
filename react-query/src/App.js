import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ItemsListPage } from './Components/ItemsListPage';
import { AddEditPage } from './Components/AddEditPage';
import React from 'react';
import { ContextProvider } from './ContextProvider';

function App() {

  return (
    <ContextProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<ItemsListPage />} />
            <Route path="/edit" element={<AddEditPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
