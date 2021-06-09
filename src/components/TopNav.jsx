import React from 'react';

const TopNav = () => {
  return (
    <>
      <nav className="topNav">
        <div className="container">
          <div>
            <a href="/">Home</a>
          </div>
          <div>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
