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
        return res.status(400).json({ error: error.details[0].context.label });
      }

      // get request body
      const { firstname, lastname, address, phone, dob, gender, password } = req.body;

      bcrypt.hash(password, 10, (_, result) => {
        
        model.signup(firstname, lastname, address, phone, dob, gender, result, ({ success, data }) => {
          if (!success) {
            // server error
            return res.status(500).json({ error: data.message });
          }

          const token = jwt.sign(data, process.env.KEY, { expiresIn: 60 * 60 });
          
          // successfull
          return res.status(201).json({ token, data });
        });
        return null;
      });
      return null;
    });
    return null;
  }
}

export default controller;
