// import
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';

chai.use(chaiHttp);
chai.should();

describe('USER', () => {
  describe('user signup', () => {
    // test for signup
    it('should return 400 if the fields are no filled completely', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: 'Prince',
          lastname: 'Michael'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('should return status 201 with token and user data', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: 'Prince',
          lastname: 'Michael',
          address: '10 A close jokogbola street',
          phone: '09090838739',
          dob: '09-09-2019',
          gender: 'male',
          password: 'pallete2019'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          res.body.should.have.property('data');
          res.body.data.should.have.property('firstname').eql('Prince');
          res.body.data.should.have.property('lastname').eql('Michael');
          res.body.data.should.have.property('address').eql('10 A close jokogbola street');
          res.body.data.should.have.property('phone').eql('09090838739');
          res.body.data.should.have.property('dob');
          res.body.data.should.have.property('gender').eql('male');
          res.body.data.should.have.property('password');
          done();
        });
    });

    it('should return status 500 if the user tries to submit the same information', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: 'Prince',
          lastname: 'Michael',
          address: '10 A close jokogbola street',
          phone: '09090838739',
          dob: '09-09-2019',
          gender: 'male',
          password: 'pallete2019'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error');
          done();
        });
    });
  });
});