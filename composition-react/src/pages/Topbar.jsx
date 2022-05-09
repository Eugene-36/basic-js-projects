import React from 'react';
import { Create } from './Create';
import Logo from './Logo';
import MainMenu from './MainMenu';

const Topbar = () => {
  return (
    <div className='top-bar'>
      <Logo />
      <MainMenu />
      <Create />
      more top bar items here like search bar and profile menu
    </div>
  );
};

export default Topbar;
