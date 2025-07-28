import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function Home() {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <div style={{ marginTop: '2em' }}>
        <Link to="/gemini">Geminiに質問する</Link>
      </div>
    </div>
  );
}

function Gemini() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    setAnswer('回答取得中...');
    const res = await fetch('http://localhost:8000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(
      data.candidates?.[0]?.content?.parts?.[0]?.text || '回答が取得できませんでした'
    );
  };

  return (
    <div>
      <h2>Geminiに質問</h2>
      <input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Geminiに質問"
        style={{ fontSize: '1em', width: '60%' }}
      />
      <button onClick={handleAsk} style={{ marginLeft: '1em', fontSize: '1em' }}>
        質問する
      </button>
      <p style={{ marginTop: '1em', whiteSpace: 'pre-wrap' }}>
        Geminiの回答: {answer}
      </p>
      <Link to="/">ホームへ戻る</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gemini" element={<Gemini />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;