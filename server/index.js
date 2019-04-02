// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from 'dotenv';

// import route
import user from './routes/user';

// create the server
config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/v1/users', user);

app.listen(port);
export default app;// export for testing
