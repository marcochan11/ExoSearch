import { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.post('http://localhost:5000/search', { query });
    setResults(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Exa TikTok Search</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search TikTok..."
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            <a href={r.url} target="_blank" rel="noreferrer">
              {r.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
