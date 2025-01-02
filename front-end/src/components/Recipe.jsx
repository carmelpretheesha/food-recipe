import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 0,
    description: '',
    recipeId:id,
  });

  useEffect(() => {
    // Fetch recipe data
    fetch(`http://localhost:8081/user/cards/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Fetch comments
    fetch(`http://localhost:8081/user/comments/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleStarClick = (rating) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = (e) => {
    if (!form.name || !form.email || !form.rating || !form.description) {
      alert('Please fill in all fields!');
      return;
    }
    
    fetch('http://localhost:8081/user/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(() => {
        setComments([form, ...comments]);
        setForm({ name: '', email: '', rating: 0, description: '' });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '300px',
          backgroundImage: `url('${recipe.image || '/placeholder.jpg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', 
        
          
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        ></div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '36px', marginLeft: '50px', color: '#FFA500', textAlign: 'left' }}>
            {recipe.heading || 'No Heading Available'}
          </h1>

          {/* Description Section aligned horizontally */}
          <div style={{ display: 'flex', justifyContent: 'flex-start',marginLeft: '50px', gap: '250px', marginTop: '10px' }}>
          <p style={{ fontSize: '15px', color: '#FFF' }}>
  <strong style={{ marginRight: '8px' }}>
    <i className="fas fa-user-chef" style={{ marginRight: '5px' }}></i> 
  </strong>
  {recipe.chef || 'Unknown'}
</p>
<p style={{ fontSize: '15px', color: '#FFF' }}>
  <strong style={{ marginRight: '8px' }}>
    <i className="fas fa-clock" style={{ marginRight: '5px' }}></i>
    Duration:
  </strong>
  {recipe.duration || 'Unknown'}
</p>
<p style={{ fontSize: '15px', color: '#FFF' }}>
  <strong style={{ marginRight: '8px' }}>
    <i className="fas fa-pizza-slice" style={{ marginRight: '5px' }}></i> 
    Type:
  </strong>
  {recipe.type || 'Unknown'}
</p>
<p style={{ fontSize: '15px', color: '#FFF' }}>
  <strong style={{ marginRight: '8px' }}>
    <i className="fas fa-star" style={{ marginRight: '5px' }}></i> 
    Rating:
  </strong>
  {recipe.rating ? `${recipe.rating} ` : 'No Rating'}
</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, padding: '20px', borderRadius: '8px', backgroundColor: 'white', color: 'black', }}>
          {/* Ingredients Section */}
<h3 style={{ color: '#FFA500' }}>Ingredients</h3>
{recipe.ingredients?.length > 0 ? (
  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
    
    <tbody>
      {recipe.ingredients.map((ingredient, index) => (
        <tr key={index}>
          <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{ingredient.name}</td>
          <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{ingredient.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No ingredients found</p>
)}
<h3 style={{ color: '#FFA500' }}>Cooked this? Comment and rate the recipe</h3>
<form 
  id="recipe-form" onSubmit={handleSubmit} 
  style={{
    marginTop: '20px', 
    padding: '20px', 
    borderRadius: '8px', 
    backgroundColor: '#DBDBDB' ,
  }}
>
  
  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="name" style={{ fontWeight: 'bold', color: '#959595', display: 'block', marginBottom: '5px' }}>
      Your Name
    </label>
    <input
      id="name"
      type="text"
      name="name"
      value={form.name}
      onChange={handleInputChange}
      style={{
        display: 'block',
        padding: '10px',
        width: '100%',
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#fff',
      }}
    />
  </div>

  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="email" style={{ fontWeight: 'bold', color: '#959595', display: 'block', marginBottom: '5px' }}>
      Your Email
    </label>
    <input
      id="email"
      type="email"
      name="email"
      value={form.email}
      onChange={handleInputChange}
      style={{
        display: 'block',
        padding: '10px',
        width: '100%',
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#fff',
      }}
    />
  </div>
  
  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="rating" style={{ fontWeight: 'bold', color: '#333', display: 'block', marginBottom: '5px' }}>
      Your Rating
    </label>
    <div id="rating" style={{ display: 'flex', gap: '5px' }}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            color: index < form.rating ? '#FFD700' : '#CCC',
          }}
        >
          ★
        </span>
      ))}
    </div>
  </div>

  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="description" style={{ fontWeight: 'bold', color: '#959595', display: 'block', marginBottom: '5px' }}>
      Comment
    </label>
    <textarea
      id="description"
      name="description"
      value={form.description}
      onChange={handleInputChange}
      style={{
        display: 'block',
        padding: '10px',
        width: '100%',
        height: '80px',
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#fff',
      }}
    />
  </div>

  <button
    type="submit"
    style={{
      backgroundColor: '#FFA500',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      width: '100%',
      fontSize: '16px',
      cursor: 'pointer',
    }}
  >
    Submit
  </button>
</form>
        </div>
        <div style={{ flex: 2, padding: '20px', borderRadius: '8px', backgroundColor: 'white', color: 'black' }}>
          {/* Procedures Section */}     
<h3 style={{ color: '#FFA500' }}>Directions</h3>
<div>
  {recipe.procedures?.length > 0 ? (
    recipe.procedures.map((procedure, index) => (
      <div key={index} style={{ marginBottom: '10px',  borderCollapse: 'collapse', borderRadius: '5px' }}>
       
        <div
          onClick={() =>
            setExpandedStep((prev) => (prev === index ? null : index))
          }
          style={{
            padding: '10px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          
          }}
        >
          <span>Step {index + 1}</span>
          <span>{expandedStep === index ? '▼' : '▶'}</span>
        </div>
        {expandedStep === index && (
          <div style={{ padding: '10px', backgroundColor: 'white' }}>
            <p>{procedure.stepDescription}</p>
          </div>
        )}
         <hr></hr>
      </div>
    ))
  ) : (
    <p>No procedures found</p>
  )}
</div>
        {/* Comments Section */}
<h3 style={{ color: '#FFA500' }}>Comments</h3>
{comments.length > 0 ? (
  comments.map((comment, index) => (
    <div 
      key={index} 
      style={{ 
        marginBottom: '20px', 
        padding: '10px', 
        borderRadius: '5px',
        border: '1px solid #eee', 
        background:'#DBDBDB'
      }}
    >
      {/* Rating and Name Block */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '5px' }}>
          <div style={{background:'#F3D643', margin:'5px 10px',padding:'4px',borderRadius:'5px'}}>
            <span  
              style={{ color: '#FFA500', fontSize: '18px', marginRight: '2px' }}
            >
              ★
            </span>
            <span style={{ fontSize: '16px', color: '#333', marginLeft: '5px' }}>
              {comment.rating}
            </span>
          </div>
          <p 
            style={{ 
              fontWeight: 'bold',
              marginLeft: '17px', 
              fontSize: '16px', 
              color: '#333' 
            }}
          >
            {comment.name}
          </p>
        </div>
      </div>

      {/* Description */}
      <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>
        {comment.description}
      </p>
    </div>
  ))
) : (
  <p>No comments yet.</p>
)}


        </div>
      </div>
    </div>
  );
};

export default Recipe;
