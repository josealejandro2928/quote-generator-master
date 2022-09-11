import React, { useEffect, useState } from 'react';
import './App.scss';
import Quote from './components/Quote';
import { getQuotes, getRandomQuote } from './service/QuoteResource';

function App() {
  const [singleCoute, setSingleCoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null | undefined>(null);
  const [showAuthorQuotes, setShowAuthorQuotes] = useState(false);
  const [quotesByAuthor, setQuotesByAuthor] = useState<any[]>([])

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    if (selectedAuthor) {
      getMultiplesQuotesByAuthor();

    }
  }, [selectedAuthor])

  async function init() {
    try {
      let resp = await getRandomQuote()
      setSingleCoute(resp);
    } catch (e) {
      console.log("error", e)
    }
  }

  const onSelectAuthor = () => {
    setSelectedAuthor(singleCoute.quoteAuthor);
  }

  const getMultiplesQuotesByAuthor = async () => {
    try {
      setShowAuthorQuotes(true);
      setLoading(true)
      let resp = await getQuotes(singleCoute.quoteAuthor);
      setQuotesByAuthor(resp);
    } catch (e) {
      console.log("error", e)
    }
    setLoading(false)
  }

  const onReset = () => {
    setSelectedAuthor(null);
    setShowAuthorQuotes(false);
    setQuotesByAuthor([])
    init();
  }

  return (
    <div className="App">
      <div className='header'>
        <span></span>
        <button className='btn-refresh' onClick={onReset}>
          random
          <span className="material-symbols-outlined">
            refresh
          </span>
        </button>
      </div>
      {!showAuthorQuotes && singleCoute &&
        <div className='randomQuote'>
          <Quote quote={singleCoute}></Quote>
          <br />
          <section onClick={onSelectAuthor} className='author'>
            <h2>
              {singleCoute?.quoteAuthor}
            </h2>
            <p>
              {singleCoute?.quoteGenre}
            </p>
            <span className="material-symbols-outlined arrow">
              arrow_forward
            </span>
          </section>
        </div>}
      {showAuthorQuotes &&
        <>
          <div style={{ margin: 'auto', maxWidth: '800px', padding: '0px 64px' }}>
            <h2>
              {singleCoute?.quoteAuthor}
            </h2>
            {loading && (new Array(5).fill(5)).map((quote) => (<div className='quote-loading'></div>))}
            {!loading && quotesByAuthor.map((quote) => (<Quote key={quote._id} quote={quote} />))}

          </div>

        </>}


    </div>
  );
}

export default App;
