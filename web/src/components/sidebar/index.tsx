import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css'

export default function Sidebar() {
  return <aside>
    <div className='logo'></div>
    <div className='nav-links'>
      <Link to='/ranking'>Ranking</Link>
      <Link to='/profile'>Perfil</Link>
      <Link to='/compare'>Compare</Link>
    </div>
  </aside>
}