import React, { useState } from 'react';

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 2rem',
      position:'relative',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
    },
    burgerIcon: {
      width: '30px',
      height: 'auto',
      marginRight: '10px',
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
    },
    searchContainer: {
      position: 'relative',
      marginRight: '20px',
    },
    searchInput: {
      padding: '10px 12px 10px 40px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    icon: {
      fontSize: '24px',
      color: '#FFA500',
    },
    searchIcon: {
      position: 'absolute',
      top: '50%',
      left: '12px',
      transform: 'translateY(-50%)',
      color: '#aaa',
      fontSize: '18px',
    },
  };

  return (
    <header>
      <div style={styles.container}>
        <div style={styles.headerLeft}>
          <img
            src="/image/burger-icon-cartoon-hamburger-fast-food-symbol_80590-14811.jpg"
            alt="Burger Icon"
            style={styles.burgerIcon}
          />
          <h1 style={{ fontSize: '24px', color: '#FFA500', margin: 0 }}>Food Recipe</h1>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchContainer}>
            <i className="fas fa-search" style={styles.searchIcon}></i>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
          </div>
          <i className="fas fa-user" style={styles.icon}></i>
        </div>
      </div>
    </header>
  );
};

export default Nav;
