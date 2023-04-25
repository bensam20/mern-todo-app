import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeDataHandler from './HomeContext';

export default function HomeContextWrapper() {
    return (
      <HomeDataHandler>
        <Outlet />
      </HomeDataHandler>
    );
  }