const analyzeSentiment = async (reviewText) => {
    const response = await fetch('https://api.claude.ai/sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: reviewText }),
    });
    return response.json();
  };

  export default analyzeSentiment;