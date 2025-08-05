import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Times New Roman, sans-serif' }}>
      <h1>Exa Search</h1>
      <input
        type="text"
        placeholder="Search "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: '300px', marginRight: 10 }}
      />
      <button onClick={handleSearch} disabled={loading || !query}>
        {loading ? 'Loading...' : 'Search'}
      </button>

      <ul style={{ marginTop: 20 }}>
        {results.map((result, idx) => (
          <li key={idx} style={{ marginBottom: 10 }}>
            <a href={result.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
