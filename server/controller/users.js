// import dependencies
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import middleware from '../middleware/users';
import model from '../model/users';

// class
class controller{
  static signup(req, res) {
    // middleware
    middleware.signup(req, error => {
      // check for error
      if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].context.label });
      }

      // get request body
      const { firstname, lastname, address, phone, dob, gender, password } = req.body;

      bcrypt.hash(password, 10, (_, result) => {
        
        model.signup(firstname, lastname, address, phone, dob, gender, result, ({ success, data }) => {
          if (!success) {
            // server error
            return res.status(500).json({ status: 500, error: data.message });
          }

          const token = jwt.sign(data, process.env.KEY, { expiresIn: 60 * 60 });
          
          // successfull
          return res.status(201).json({ status: 201, token, data });
        });
        return null;
      });
      return null;
    });
    return null;
  }

  static signin(req, res) {
    // calling middleware
    middleware.login(req, error => {
      if (error) {
        //error
        return res.status(400).json({ status: 400, error: error.details[0].context.label });
      }

      const { phone, password } = req.body;

      // call model to fetch user data
      model.login(phone, ({ success, data }) => {
        if (!success) {
          // server Error
          return res.status(500).json({ status: 500, error: 'Invalid phone number or password' });
        }

        bcrypt.compare(password, data.password, (_, result) => {
          if (!result) {
            // password do not match
            return res.status(409).json({ status: 409, error: 'Invalid phone number or password' });
          }

          // generate token
          const token = jwt.sign(data, process.env.KEY, { expiresIn: 60 * 60 });

          return res.status(201).json({ status: 200, token, data });
        });
        return null;
      });
      return null;
    });
    return null;
  }
}

export default controller;
