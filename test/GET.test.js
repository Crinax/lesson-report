const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should();
chai.use(chaiHttp)
console.clear()
var request = null
var response
describe('=> GET', function() {
  before(function() { request = { date: '2020-10-43' } })
  beforeEach(function(done) {
    this.timeout(10000)
    chai.request('localhost:3000').get('/').send(request).end((err, res) => {
      response = res
      done()
    })
  })
  describe('==> GET / { date=* }', function() {

    //! Error day number
    request = { date: '2020-10-43' }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This date is invalid"', function(done) {
        response.body.should.have.property('message').eq('This date is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "date"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('date')
          done()
        })
        it(`--> Property "date" should be equal "${request.date}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('date').eq(request.date)
          done()
        })
      })
      after(() => { request = { date: '2020-15-10' } })
    })

    //! Error mounth number
    request = { date: '2020-15-10' }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This date is invalid"', function(done) {
        response.body.should.have.property('message').eq('This date is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "date"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('date')
          done()
        })
        it(`--> Property "date" should be equal "${request.date}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('date').eq(request.date)
          done()
        })
      })
      after(() => { request = { date: '99999-05-10' } })
    })

    //! Error year number
    request = { date: '99999-05-10' }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This date is invalid"', function(done) {
        response.body.should.have.property('message').eq('This date is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "date"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('date')
          done()
        })
        it(`--> Property "date" should be equal "${request.date}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('date').eq(request.date)
          done()
        })
      })
      after(() => { request = { date: 'somethingValue' } })
    })

    //! Not date
    request = { date: 'somethingValue' }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This date is invalid"', function(done) {
        response.body.should.have.property('message').eq('This date is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "date"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('date')
          done()
        })
        it(`--> Property "date" should be equal "${request.date}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('date').eq(request.date)
          done()
        })
      })
      after(() => { request = { date: '2020-10-19' } })
    })

    //* Сorrect
    request = { date: '2020-10-19' }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be empty', function(done) {
        response.body.should.be.an('array').that.is.empty
        done()
      })
      after(() => { request = { status: 5 } })
    })
  })
  describe('==> GET / { status=* }', function() {

    //! Invalid number
    request = { status: 5 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This status is invalid"', function(done) {
        response.body.should.have.property('message').eq('This status is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "status"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('status')
          done()
        })
        it(`--> Property "status" should be equal "${request.status}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('status').eq(request.status)
          done()
        })
      })
      after(() => { request = { status: -2 } })
    })

    //! Invalid number
    request = { status: -2 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This status is invalid"', function(done) {
        response.body.should.have.property('message').eq('This status is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "status"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('status')
          done()
        })
        it(`--> Property "status" should be equal "${request.status}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('status').eq(request.status)
          done()
        })
      })
      after(() => { request = { status: 'something' } })
    })
    //! Not a Number
    request = { status: 'something' }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This status is invalid"', function(done) {
        response.body.should.have.property('message').eq('This status is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "status"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('status')
          done()
        })
        it(`--> Property "status" should be equal "${request.status}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('status').eq(request.status)
          done()
        })
      })
      after(() => { request = { status: 0 } })
    })

    //* Correct Number
    request = { status: 0 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      after(() => { request = { status: 1 } })
    })

    //* Correct Number
    request = { status: 1 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      after(() => { request = { teacherIds: 0 } })
    })
  })
  describe('==> GET / { teacherIds=* }', function() {

    //! Invalid value
    request = { teacherIds: 0 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "These teachers identifiers is invalid"', function(done) {
        response.body.should.have.property('message').eq('These teachers identifiers is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "teacherIds"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('teacherIds')
          done()
        })
        it(`--> Property "teacherIds" should be equal "${request.teacherIds}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('teacherIds').eq(request.teacherIds)
          done()
        })
      })
      after(() => { request = { teacherIds: "some,string" } })
    })

    //! Use string like "1,2,3,4" instead other string
    request = { teacherIds: "some,string" }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "These teachers identifiers is invalid"', function(done) {
        response.body.should.have.property('message').eq('These teachers identifiers is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "teacherIds"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('teacherIds')
          done()
        })
        it(`--> Property "teacherIds" should be equal "${request.teacherIds}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('teacherIds').eq(request.teacherIds)
          done()
        })
      })
      after(() => { request = { teacherIds: "1,2,3" } })
    })

    //* Correct string
    request = { teacherIds: "1,2,3" }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      after(() => { request = { studentsCount: -1 } })
    })
  })
  describe('==> GET / { studentsCount=* }', function() {

    //! Invalid value
    request = { studentsCount: -1 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This students count is invalid"', function(done) {
        response.body.should.have.property('message').eq('This students count is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "studentsCount"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('studentsCount')
          done()
        })
        it(`--> Property "studentsCount" should be equal "${request.studentsCount}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('studentsCount').eq(request.studentsCount)
          done()
        })
      })
      after(() => { request = { studentsCount: "some,string" } })
    })

    //! Use string like "1,4" or like "0" instead other string
    request = { studentsCount: "some,string" }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This students count is invalid"', function(done) {
        response.body.should.have.property('message').eq('This students count is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "studentsCount"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('studentsCount')
          done()
        })
        it(`--> Property "studentsCount" should be equal "${request.studentsCount}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('studentsCount').eq(request.studentsCount)
          done()
        })
      })
      after(() => { request = { studentsCount: "1,4" } })
    })

    //* Correct string
    request = { studentsCount: "1,4" }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      after(() => { request = { studentsCount: "0" } })
    })

    //* Correct string
    request = { studentsCount: "0" }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      after(() => { request = { studentsCount: 2 } })
    })

    //* Correct string
    request = { studentsCount: 2 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      after(() => { request = { page: 0 } })
    })
  })
  describe('==> GET / { page=* } (default value page = 1)', function() {

    //! Invalid value
    request = { page: 0 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This page is invalid"', function(done) {
        response.body.should.have.property('message').eq('This page is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "page"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('page')
          done()
        })
        it(`--> Property "page" should be equal "${request.page}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('page').eq(request.page)
          done()
        })
      })
      after(() => { request = { page: -10 } })
    })

    //! Invalid value
    request = { page: -10 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This page is invalid"', function(done) {
        response.body.should.have.property('message').eq('This page is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "page"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('page')
          done()
        })
        it(`--> Property "page" should be equal "${request.page}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('page').eq(request.page)
          done()
        })
      })
      after(() => { request = { page: 1 } })
    })

    //* Correct string
    request = { page: 1 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      after(() => { request = { lessonsPerPage: 0 } })
    })
  })
  describe('==> GET / { lessonsPerPage=* } (default lessons per page: 5)', function() {

    //! Invalid value
    request = { lessonsPerPage: 0 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This lessons per page is invalid"', function(done) {
        response.body.should.have.property('message').eq('This lessons per page is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "lessonsPerPage"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('lessonsPerPage')
          done()
        })
        it(`--> Property "page" should be equal "${request.lessonsPerPage}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('lessonsPerPage').eq(request.lessonsPerPage)
          done()
        })
      })
      after(() => { request = { lessonsPerPage: -456 } })
    })

    //! Invalid value
    request = { lessonsPerPage: -456 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 400', function(done) {
        response.should.have.status(400)
        done()
      })
      it('-> Should be an Object', function(done) {
        response.body.should.be.an('object')
        done()
      })
      it('-> Should have property "status" equal "error"', function(done) {
        response.body.should.have.property('status').eq('error')
        done()
      })
      it('-> Should have property "code" equal "400"', function(done) {
        response.body.should.have.property('code').eq(400)
        done()
      })
      it('-> Should have property "message" equal "This lessons per page is invalid"', function(done) {
        response.body.should.have.property('message').eq('This lessons per page is invalid')
        done()
      })
      describe('====> Property "data"', function() {
        it('--> Should have property "data"', function(done) {
          response.body.should.have.property('data')
          done()
        })
        it(`--> Property "data" should be an Object`, function(done) {
          response.body.should.have.property('data').which.should.be.an('object')
          done()
        })
        it('--> Property "data" should have property "lessonsPerPage"', function(done) {
          response.body.should.have.deep.property('data').which.has.property('lessonsPerPage')
          done()
        })
        it(`--> Property "page" should be equal "${request.lessonsPerPage}"`, function(done) {
          response.body.should.have.deep.property('data').which.has.property('lessonsPerPage').eq(request.lessonsPerPage)
          done()
        })
      })
      after(() => { request = { lessonsPerPage: 3 } })
    })

    //* Correct string
    request = { lessonsPerPage: 3 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      it('-> Should have length: 3', function(done) {
        response.body.should.be.an('array').lengthOf(3)
        done()
      })
      after(() => { request = { lessonsPerPage: 10 } })
    })

    //* Correct string
    request = { lessonsPerPage: 10 }
    describe(`===> GET / ${JSON.stringify(request)}`, function() {
      it('-> Should have error code: 200', function(done) {
        response.should.have.status(200)
        done()
      })
      it('-> Should be an array', function(done) {
        response.body.should.be.an('array')
        done()
      })
      it('-> Should be an array and not be empty', function(done) {
        response.body.should.be.an('array').and.not.be.empty
        done()
      })
      it('-> Should have length: 10', function(done) {
        response.body.should.be.an('array').lengthOf(10)
        done()
      })
    })
  })
})