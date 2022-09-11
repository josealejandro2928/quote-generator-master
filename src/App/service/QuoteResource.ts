const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:3000/';

export const getRandomQuote = async () => {
  let res = await fetch(`${ENDPOINT}quotes/random`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let data = await res.json();

  return data?.data?.[0];
};

export const getQuotes = async (author?: string) => {
  let url = `${ENDPOINT}quotes/?`;
  if (author) {
    url += `author=${author}`;
  }

  let res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let data = await res.json();

  return data?.data;
};
