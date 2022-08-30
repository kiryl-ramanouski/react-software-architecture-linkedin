// Standard
import path from 'path';
import fs from 'fs';

// Fetch for server
import 'isomorphic-fetch';

// Express
import express from 'express';

// React for server
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

// Context
import { InitialDataContext } from './src/InitialDataContext';

// Components
import App from './src/App';

// Styles for server
import { ServerStyleSheet } from 'styled-components';

global.window = {};

const app = express();

app.use(express.static('./build', { index: false })); // Staticky serve the files inside build folder but don’t load base index.html by default

const articles = [
  { title: 'Articles 1', author: 'Bob1' },
  { title: 'Articles 2', author: 'Bob2' },
  { title: 'Articles 3', author: 'Bob3' },
];

app.get('/api/articles', (req, res) => {
  const loadedArticles = articles;
  res.json(loadedArticles);
});

app.get('/*', async (req, res) => {
  const sheet = new ServerStyleSheet();
  const Provider = InitialDataContext.Provider;
  const contextObj = { _isServerSide: true, _requests: [], _data: {} };

  renderToString(
    sheet.collectStyles(
      <Provider value={contextObj}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    )
  );

  await Promise.all(contextObj._requests);
  contextObj._isServerSide = false;
  delete contextObj._requests;

  const reactApp = renderToString(
    <Provider value={contextObj}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const templateFile = path.resolve('./build/index.html');
  fs.readFile(templateFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(
      data
        .replace(
          '<div id="root"></div>',
          `<script>window.preloadedData = ${JSON.stringify(
            contextObj
          )}</script> <div id="root">${reactApp}</div>`
        )
        .replace('{{ styles }}', sheet.getStyleTags())
    );
  });
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
