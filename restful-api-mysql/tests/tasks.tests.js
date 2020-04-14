const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Tasks API Service', function () {
  it('should GET all tasks', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/tasks')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it('should GET a single task', function (done) {
    const expected = [
      {
        id: 1,
        name: "I'm the first task!",
        created_date: '2020-03-24T05:09:49.000Z',
        status: 'completed',
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/tasks/1')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it.skip('should POST a single task', function (done) {
    const newTask = {
      name: 'New test task!',
    };
    const expected = { msg: 'Add task successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/tasks')
      .send(newTask)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });
});
