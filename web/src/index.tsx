import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';

import Ranking from './routes/ranking';
import Profile from './routes/profile';
import Compare from './routes/compare';
import Sidebar from './components/sidebar/index';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Sidebar /> */}
      <main>
        <Routes>
          <Route path='/' element={<Navigate to='/ranking' replace />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/compare' element={<Compare />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>
);
