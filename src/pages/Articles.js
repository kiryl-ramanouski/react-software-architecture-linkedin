import React, { useEffect, useState } from 'react';

export const Articles = () => {
  const [articles, setArticles] = useState();

  useEffect(() => {
    return (async () => {
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data);
    })();
  }, []);

  return (
    <>
      <h1>Articles</h1>
      {articles && (
        <ul>
          {articles.map((item, i) => {
            return (
              <li key={i}>
                <p>{item.title}</p>
                <p>{item.author}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
