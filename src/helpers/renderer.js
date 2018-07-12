import React from 'react';

export default (req, context) => { 
  return `
    <html>
      <head>       
      </head>
      <body>
        <div id="app"></div>        
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
