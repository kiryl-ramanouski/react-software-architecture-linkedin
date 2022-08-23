// Express
import express from 'express';

// React
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

// Components
import { App } from './src/App';
import { Home } from './src/pages/Home';

const app = express();

app.use(express.static('./build', { index: false })); // Staticky serve the files inside build folder but don’t load base index.html by default

app.get('/*', (req, res) => {
  const reactApp = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  return res.send(`
    <html>
      <body>
        <div id="root">${reactApp}</div>
      </body>
    </html>
  `);
});

app.listen(8080, console.log('Server is listening on port 8080'));
