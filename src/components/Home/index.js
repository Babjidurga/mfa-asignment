
import React, { useEffect, useState } from 'react';
import './index.css'

const JokesPage = ({ handleLogout }) => {
  const [jokes, setJokes] = useState([]);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=10');
        const data = await response.json();
        setJokes(data.jokes.map(joke => joke.joke));
      } catch (error) {
        console.error('Error fetching jokes:', error);
      }
    };

    fetchJokes();
  }, []);

  const handleLogoutClick = () => {
    handleLogout();
    setLogout(true);
  };

  return (
    <div className="jokes-container">
      <h1>Jokes</h1>

      <div className="jokes">
        {jokes.map((joke, index) => (
          <div key={index} className="joke">
            <p>{joke} <br/>😂</p>
          </div>
        ))}
      </div>
      <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
      {logout ? (<p>Please refresh the page to continue</p>) : null}
    </div>
  );
};

export default JokesPage;
