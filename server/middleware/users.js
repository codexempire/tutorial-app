// import
import Joi from 'joi';

// class
class middleware{
  // signup
  static signup(req, callback) {
    const schema = Joi.object().keys({
      firstname: Joi.string()
        .min(4)
        .max(20)
        .required()
        .label('Enter your firstname'),
      lastname: Joi.string()
        .min(4)
        .max(20)
        .required()
        .label('Enter your lastname'),
      address: Joi.string()
        .min(10)
        .required()
        .label('Enter your address'),
      phone: Joi.string()
        .min(10)
        .max(12)
        .required()
        .label('Enter your Phone number'),
      dob: Joi.string()
        .min(4)
        .max(20)
        .required()
        .label('Enter your date of birth'),
      gender: Joi.string()
        .min(4)
        .max(6)
        .required()
        .label('Choose your gender'),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(8)
        .required()
        .label("Enter a password of not less than 8 characters")
    });

    const { error } = Joi.validate(req.body, schema);

    callback(error);
    return null;
  }

  // log in middleware
  static login(req, callback) {
    const schema = Joi.object().keys({
      phone: Joi.string()
        .min(10)
        .max(12)
        .required()
        .label('Enter your Phone number'),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(8)
        .required()
        .label("Enter a password of not less than 8 characters")
    });

    const { error } = Joi.validate(req.body, schema);

    callback(error);
    return null;
  }
}
export default middleware;
