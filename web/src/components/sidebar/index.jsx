import React from 'react';
import { NavLink } from 'react-router-dom';
import LeaderboardOutlined from '@mui/icons-material/LeaderboardOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import CompareOutlinedIcon from '@mui/icons-material/CompareOutlined';


import './sidebar.css'

export default function Sidebar() {
  return <aside>
    <div className='logo'></div>
    <div className='nav-links'>
      <NavLink to='/ranking'><LeaderboardOutlined />Ranking</NavLink>
      <NavLink to='/profile'><QueryStatsOutlinedIcon />Perfil</NavLink>
      <NavLink to='/compare'><CompareOutlinedIcon />Compare</NavLink>
    </div>
  </aside>
}