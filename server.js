// Express
import express from 'express';
import path from 'path';
import fs from 'fs';

// React
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

// Components
import App from './src/App';

// Styles
import { ServerStyleSheet } from 'styled-components';

const app = express();

app.use(express.static('./build', { index: false })); // Staticky serve the files inside build folder but don’t load base index.html by default

app.get('/*', (req, res) => {
  const sheet = new ServerStyleSheet();

  const reactApp = renderToString(
    sheet.collectStyles(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    )
  );

  const templateFile = path.resolve('./build/index.html');
  fs.readFile(templateFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
        .replace('{{ styles }}', sheet.getStyleTags())
    );
  });
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});