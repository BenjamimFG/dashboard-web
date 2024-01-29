import React, { createContext, useEffect, useState } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Ranking from "./routes/ranking";
import Profile from "./routes/profile";
import Compare from "./routes/compare";
import apiService from './services/api.service';

export const StateContext = createContext({ regions: [], states: [], indexes: [] });

export default function AppRouter() {
  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [indexStats, setIndexStats] = useState([]);


  useEffect(() => {
    apiService.getStates()
      .then(res => setStates(res.data))
      .catch(e => console.error(e));

    apiService.getRegions()
      .then(res => setRegions(res.data))
      .catch(e => console.error(e));

    apiService.getIndexes()
      .then(res => setIndexes(res.data))
      .catch(e => console.error(e));

    apiService.getIndexesStats()
      .then(res => setIndexStats(res.data))
      .catch(e => console.error(e));
  }, [])


  return (
    <BrowserRouter>
      <StateContext.Provider value={{ regions, states, indexes, indexStats }}>
        <Sidebar />
        <main>
          <Routes>
            <Route path='/' element={<Navigate to='/ranking' replace />} />
            <Route path='/ranking' element={<Ranking />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/compare' element={<Compare />} />
          </Routes>
        </main>
      </StateContext.Provider>
    </BrowserRouter>);
}