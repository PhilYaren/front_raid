import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state: any) => state.user.user);
  return (
    <div>
      {user ? (
        <>
          <p>Залогиненный home</p>
          <button></button>
        </>
      ) : (
        <p>Незалогиненный home</p>
      )}
      <Outlet />
    </div>
  );
}

export default Home;
