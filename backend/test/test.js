var chai = require('chai'), chaiHttp = require('chai-http');

let should = chai.should();
var mocha = require('mocha');
chai.use(chaiHttp);
var expect = chai.expect;

describe('/POST login',()=> {
    it("Should check credentials and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/login')
    .send({ "username": "hatraveler2@mail.com", "password" : "hatpass2"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})
})

describe('/GET dashboard',()=> {
    it("Should return properties booked by user and return status code", function(done){
    chai.request('http://localhost:3001')
    .get('/dashboard/hatraveler2@mail.com')
    .end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
    });
})
})

describe('/GET profile',()=> {
    it("Should return user profile and return status code", function(done){
    chai.request('http://localhost:3001')
    .get('/profile/hatraveler2@mail.com')
    .end(function (err, res) {
      
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
    });
})
})


describe('/POST messages',()=> {
    it("Should send message and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/messages')
    .send({ "message": "Hello!", "sender" : "hatraveler2@mail.com", "receiver" : "haowner2@mail.com"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})
})

describe('/POST signup',()=> {
    it("Should create user account and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/signup')
    .send({ "username": "travelerha1@mail.com", "password" : "thapass1", "name" : "Traveler Home Away 1" })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})
})

/*
describe('/POST postproperty',()=> {
    it("Should add property and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/postproperty')
    .send({ "location": "San Jose", "name" : "Villa in San Jose", "sleeps" : 4, "price" : 80, "availablestart" : Date('2018-11-04'), "availableend" : Date('2018-12-10')})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})
})
*/