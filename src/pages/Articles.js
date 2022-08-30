import React from 'react';
import { useDataSSR } from '../useDataSSR';

export const Articles = () => {
  const articles = useDataSSR('articles', () => {
    console.log('No preloaded articles found, loading from the server');
    fetch('/api/articles').then((response) => response.json());
  });

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
