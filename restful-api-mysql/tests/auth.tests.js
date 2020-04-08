const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API service', () => {
  // run one time then skip once working
  it.skip('should POST a new user', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    const expected = { msg: 'New user created!' };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        console.log(resp.body);
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it('should not POST a new user if they already exist', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    const expected = { msg: 'User already exists!' };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it('should POST a login for an existing', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body.auth).to.be.true;
        expect(resp.body.expires_in).to.be.eql(86400);
        expect(resp.body.access_token).to.be.a('string');
        expect(resp.body.refresh_token).to.be.a('string');
        done();
      });
  });
});
