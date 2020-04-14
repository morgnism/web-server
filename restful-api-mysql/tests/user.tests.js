// const chai = require('chai');
// const expect = chai.expect;
// const chaiHttp = require('chai-http');

// chai.use(chaiHttp);

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg2Mjk5NzgzLCJleHAiOjE1ODYzODYxODN9.0WGrPHozwciIqD2iaoraPnLGC4nWV2ydqLUOKD7ra5I';

// describe('User API service', () => {
//   it("should GET a logged in user's unique id, username, and password", (done) => {
//     const expected = [
//       {
//         user_id: 1,
//         username: 'admin',
//         email: 'admin@example.com',
//       },
//     ];

//     chai
//       .request('http://localhost:3000')
//       .get('/api/user/me')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, resp) => {
//         expect(resp.body).to.eql(expected);
//         done();
//       });
//   });

//   // run one time then skip once working
//   it.skip('should PUT updated credentials for a logged in user', (done) => {
//     const updatedUser = {
//       username: 'admin2',
//       password: 'newPassword',
//       email: 'admin@example.com',
//     };
//     const expected = { msg: 'Updated succesfully!' };

//     chai
//       .request('http://localhost:3000')
//       .put('/api/user/me/update')
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedUser)
//       .end((err, resp) => {
//         expect(resp.body).to.eql(expected);
//         done();
//       });
//   });

//   it('should PUT updated credentials for a logged in user', (done) => {
//     const updatedUser = {
//       username: 'admin2',
//       password: 'newPassword',
//       email: 'admin@example.com',
//     };
//     const expected = { msg: 'Nothing to update...' };

//     chai
//       .request('http://localhost:3000')
//       .put('/api/user/me/update')
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedUser)
//       .end((err, resp) => {
//         expect(resp.body).to.eql(expected);
//         done();
//       });
//   });
// });