import 'babel-polyfill';
import express from 'express';
import mainRoutes from './routes/index';

const app = express();

app.use(express.static('public'));

mainRoutes(app);

app.listen(3000, () => {
  console.log('Listening on prot 3000');
});
