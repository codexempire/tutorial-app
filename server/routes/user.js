// import dependencies
import { Router } from 'express';

// import files
import user from '../controller/users';

// routes
const route = Router();

// signup route
route
  .post('/signup', user.signup);

// log in route
route
  .post('/', user.signin);

export default route;
