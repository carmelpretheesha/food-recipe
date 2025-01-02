import { useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';

const Card = () => {
  const [cardData, setCardData] = useState([]);
  const cardContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('http://localhost:8081/user/cards');
        if (!response.ok) {
          throw new Error(`Failed to fetch card data: ${response.statusText}`);
        }
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error('Error fetching card data:', error);
        alert('Failed to load card data from the server.');
      }
    };

    fetchCardData();
  }, []);

  const moveSlider = (direction) => {
    const container = cardContainerRef.current;
    const scrollAmount = 300;

    if (direction === 'right') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
const container={
  position:'relative',
  bottom:80,
  overflow:'hidden'
}
const contain={
  position:'relative',
  padding: '10px 2rem'
}
  const fullImageStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
  };
  const gradientStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    
    height: '320px',
    background: 'linear-gradient(to right, black, transparent)', 
    borderRadius: '8px',
  };
  const textContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    color: 'white',
    fontSize: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    padding: '10px',
    width: '80%',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '10px',
    wordWrap: 'break-word',
  };

  const descriptionStyle = {
    fontSize: '0.9rem',
    marginBottom: '10px',
    color: '#555',
  };

  const durationStyle = {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: '5px',
  };

  const ratingStyle = {
    position: 'absolute',
    right: '10px',
    backgroundColor: '#FFA500',
    color: 'white',
    fontSize: '0.9rem',
    padding: '5px 10px',
    borderRadius: '5px',
    marginTop:'10px',
  };

  const buttonStyle = {
    backgroundColor: '#FFA500',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1rem',
    marginTop: '10px',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    paddingBottom: '20px',
    paddingLeft: '20px',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const cardStyle = {
    flex: '0 0 auto',
    width: '250px',
    boxSizing: 'border-box',
    textAlign: 'left',
    position: 'relative',
    margin: '0 10px',
  };
  const fullImageHeadingStyle = {
  fontSize: '1.6rem',
  marginBottom: '10px',
  wordWrap: 'break-word',
  color: '#FFA500',
};

const fullImageButtonStyle = {
  backgroundColor: '#FFA500',
  color: 'white', 
  border: 'none',
  borderRadius: '5px',
  padding: '8px',  
  cursor: 'pointer',
  width: '120px',
  fontSize: '0.9rem', 
  marginTop: '10px',
};
const fulldescriptionStyle = {
  fontSize: '0.9rem',
  marginBottom: '10px',
  color: 'white',  
};
const fullImageTitleStyle = {
  fontSize: '1rem', 
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
  position: 'absolute', 
  top: 100, 
  left: 90, 
  transform: 'translateX(-50%)', 
};
const handleGetRecipe = (recipe) => {
  navigate(`/recipe/${recipe.id}`, { state: { recipe } });
};


  return (
    <div style={contain} >
      {/* Vegetable Sizzler Section */}
      <div style={fullImageStyle}>
        <img
          src="\image\WhatsApp Image 2024-12-27 at 20.21.26_b1db917c.jpg"
          alt="Vegetable sizzler"
          style={{ width: '100%', height: '80%', objectFit: 'cover' }}
        />
        <div style={gradientStyle}></div>
        <h2 style={fullImageTitleStyle}>Recipe of Day</h2>
        <div style={textContainerStyle}>
          <h2 style={fullImageHeadingStyle}>Vegetable Sizzler</h2>
          <p style={fulldescriptionStyle}>
          Sizzlers are a favorite with Indians, as they come with 
sizzler plates, with tikkis, rice, stir-fried vegetables, 
French fries, and tasty barbecue sauce.          </p>
          <button
            style={fullImageButtonStyle}
            onClick={() =>
              handleGetRecipe({
                id: 0,
                heading: 'Vegetable Sizzler',
                image: '/image/vegetable sizzler.jpeg',
                description: 'Vegetable Sizzler',
                duration: '15 mins',
                rating: '5',
              })
            }
          >
            Get Recipe 
          </button>
        </div>
      </div>

      {/* Popular Recipes Section */}
      <h2 style={{ fontSize: '2rem',marginLeft:'30px',position:'relative',bottom:80, color: '#FFA500'}}>
        Popular Recipes
      </h2>
      <div style={container} >
        {/* <button
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
          }}
          onClick={() => moveSlider('left')}
        >
          <i className="fas fa-chevron-left"></i>
        </button> */}

        <div ref={cardContainerRef} style={cardContainerStyle}>
          {cardData.map((item, index) => (
            <div key={index} style={cardStyle}>
              <img
                src={item.image}
                alt={item.heading}
                style={{
                  width: '100%',
                  height: '150px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <div style={ratingStyle}>⭐{item.rating}</div>
              <h2 style={{ fontSize: '1.2rem', color: '#333', margin: '10px 0', wordWrap: 'break-word' }}>
                {item.heading}
              </h2>
              
              <p style={durationStyle}>Duration:  {item.duration}</p>
              <p style={descriptionStyle}>duration:{item.description}</p>
              <button
                style={buttonStyle}
                onClick={() => handleGetRecipe(item)}
              >
                Get Recipe
              </button>
            </div>
          ))}
        </div>

        <button
  style={{
    position: 'absolute',
    top: '50%',
    right: '10px',
    zIndex: 10,
    backgroundColor: '#fff', 
    color: 'orange',
    border: 'none',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
  }}
  onClick={() => moveSlider('right')}
>
  <i className="fas fa-chevron-right" style={{ color: 'orange' }}></i>
</button>

      </div>
    </div>
  );
};

export default Card;