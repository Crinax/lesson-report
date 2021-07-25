const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should();
chai.use(chaiHttp)
console.clear()
var request = null
var response
describe('=> POST', function() {
    before(function() {
        request = {
            // teacherIds: [1,2],
            title: 'Blue Ocean',
            days: [0,1,3,6],
            firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-31'
        }
    })
    beforeEach(function(done) {
        chai.request('localhost:3000').post('/lessons').send(request).end((err, res) => {
            response = res
            done()
        })
    })
    describe('==> POST /lessons ', function() {

        //! "teacherIds" property is not specified
        request = {
            // teacherIds: [1,2],
            title: 'Blue Ocean',
            days: [0,1,3,6],
            firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal ""teacherIds" is required parameter"', function(done) {
                response.body.should.have.property('message').eq('"teacherIds" is required parameter')
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
                it('--> Property "data" should be empty', function(done) {
                    response.body.should.have.property('data').and.to.be.empty
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1,2, 'a'],
                    title: 'Blue Ocean',
                    days: [0,1,3,6],
                    firstDate: '2019-09-10',
                    lessonsCount: 9,
                    lastDate: '2019-12-31'
                }
            })
        })

        //! teacherIds is specified, but it's invalid
        request = {
            teacherIds: [1,2, 'a'],
            title: 'Blue Ocean',
            days: [0,1,3,6],
            firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal "This is invalid teacherIds"', function(done) {
                response.body.should.have.property('message').eq('This is invalid teacherIds')
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
            after(() => {
                request = {
                    teacherIds: [1,2],
                    // title: 'Blue Ocean',
                    days: [0,1,3,6],
                    firstDate: '2019-09-10',
                    lessonsCount: 9,
                    lastDate: '2019-12-31'
                }
            })
        })

        //! title is not specified
        request = {
            teacherIds: [1, 2],
            // title: 'Blue Ocean',
            days: [0,1,3,6],
            firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal ""title" is required parameter"', function(done) {
                response.body.should.have.property('message').eq('"title" is required parameter')
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
                it('--> Property "data" should be empty', function(done) {
                    response.body.should.have.deep.property('data').and.to.be.empty
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    // days: [0, 1, 3, 6],
                    firstDate: '2019-09-10',
                    lessonsCount: 9,
                    lastDate: '2019-12-31'
                }
            })
        })

        //! days is not specified
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            // days: [0, 1, 3, 6],
            firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal ""days" is required parameter"', function(done) {
                response.body.should.have.property('message').eq('"days" is required parameter')
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
                it('--> Property "data" should be empty', function(done) {
                    response.body.should.have.deep.property('data').and.to.be.empty
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, -1, 3, 6, 'a'],
                    firstDate: '2019-09-10',
                    lessonsCount: 9,
                    lastDate: '2019-12-31'
                }
            })
        })

        //! days is specified, but it's not valid
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, -1, 3, 6, 'a'],
            firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal "This is invalid days (days doesn\'t repeat)"', function(done) {
                response.body.should.have.property('message').eq('This is invalid days (days doesn\'t repeat)')
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
                it('--> Property "data" should have property "days"', function(done) {
                    response.body.should.have.deep.property('data').which.has.property('days')
                    done()
                })
                it(`--> Property "days" should be equal "${request.days}"`, function(done) {
                    response.body.should.have.deep.property('data').which.has.property('days').eq(request.days)
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    // firstDate: '2019-09-10',
                    lessonsCount: 9,
                    lastDate: '2019-12-31'
                }
            })
        })

        //! firstDate is not specified
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            // firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal ""firstDate" is required parameter"', function(done) {
                response.body.should.have.property('message').eq('"firstDate" is required parameter')
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
                it('--> Property "data" should be empty', function(done) {
                    response.body.should.have.deep.property('data').and.to.be.empty
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    firstDate: '2019-09-43',
                    lessonsCount: 9,
                    lastDate: '2019-12-31'
                }
            })
        })

        //! firstDate is specified, but it's not valid
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            firstDate: '2019-09-43',
            lessonsCount: 9,
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal "This is invalid firstDate"', function(done) {
                response.body.should.have.property('message').eq('This is invalid firstDate')
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
                it('--> Property "data" should have property "firstDate"', function(done) {
                    response.body.should.have.deep.property('data').which.has.property('firstDate')
                    done()
                })
                it(`--> Property "firstDate" should be equal "${request.firstDate}"`, function(done) {
                    response.body.should.have.deep.property('data').which.has.property('firstDate').eq(request.firstDate)
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    firstDate: '2019-09-10',
                    // lessonsCount: 9,
                    // lastDate: '2019-12-31'
                }
            })
        })

        //! lessonsCount and lastDate is not specified
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            firstDate: '2019-09-10',
            // lessonsCount: 9,
            // lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal "You should include one of the following parameters: "lessonsCount" or "lastDate""', function(done) {
                response.body.should.have.property('message').eq('You should include one of the following parameters: "lessonsCount" or "lastDate"')
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
                it('--> Property "data" should be empty', function(done) {
                    response.body.should.have.deep.property('data').and.to.be.empty
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    firstDate: '2019-09-10',
                    lessonsCount: -9,
                    lastDate: '2019-12-31'
                }
            })
        })

        //! lessonsCount is specified, but it's not valid
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            firstDate: '2019-09-10',
            lessonsCount: -9,
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal ""lessonsCount" should be positive integer number"', function(done) {
                response.body.should.have.property('message').eq('"lessonsCount" should be positive integer number')
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
                it('--> Property "data" should have property "lessonsCount"', function(done) {
                    response.body.should.have.deep.property('data').which.has.property('lessonsCount')
                    done()
                })
                it(`--> Property "lessonsCount" should be equal "${request.lessonsCount}"`, function(done) {
                    response.body.should.have.deep.property('data').which.has.property('lessonsCount').eq(request.lessonsCount)
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    firstDate: '2019-09-10',
                    lessonsCount: 9,
                    lastDate: '2019-12-43'
                }
            })
        })

        //! lastDate is specified, but it's not valid
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-43'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal "This is invalid lastDate"', function(done) {
                response.body.should.have.property('message').eq('This is invalid lastDate')
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
                it('--> Property "data" should have property "lastDate"', function(done) {
                    response.body.should.have.deep.property('data').which.has.property('lastDate')
                    done()
                })
                it(`--> Property "lastDate" should be equal "${request.lastDate}"`, function(done) {
                    response.body.should.have.deep.property('data').which.has.property('lastDate').eq(request.lastDate)
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    firstDate: '2019-09-10',
                    lessonsCount: 9,
                    lastDate: '2019-12-31'
                }
            })
        })

        //! "lessonsCount" and "lastDate" cannot be used together
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            firstDate: '2019-09-10',
            lessonsCount: 9,
            lastDate: '2019-12-43'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
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
            it('-> Should have property "message" equal ""lessonsCount" and "lastDate" cannot be used together"', function(done) {
                response.body.should.have.property('message').eq('"lessonsCount" and "lastDate" cannot be used together')
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
                it('--> Property "data" should be empty', function(done) {
                    response.body.should.have.deep.property('data').and.to.be.empty
                    done()
                })
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    firstDate: '2019-09-10',
                    lessonsCount: 9,
                }
            })
        })

        //* All is valid
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            firstDate: '2019-09-10',
            lessonsCount: 9,
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
            it('-> Should have error code: 200', function(done) {
                response.should.have.status(200)
                done()
            })
            it('-> Should be an Object', function(done) {
                response.body.should.be.an('array')
                done()
            })
            it('-> Should have length 9', function(done) {
                response.body.should.be.an('array').lengthOf(9)
                done()
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    firstDate: '2019-09-10',
                    lastDate: '2019-12-31'
                }
            })
        })

        //* All is valid
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            firstDate: '2019-09-10',
            lastDate: '2019-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
            it('-> Should have error code: 200', function(done) {
                response.should.have.status(200)
                done()
            })
            it('-> Should be an Object', function(done) {
                response.body.should.be.an('array')
                done()
            })
            it('-> Should have length 64', function(done) {
                response.body.should.be.an('array').lengthOf(64)
                done()
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 3, 6],
                    firstDate: '2019-09-10',
                    lastDate: '2020-12-31'
                }
            })
        })

        //* All is valid
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 3, 6],
            firstDate: '2019-09-10',
            lastDate: '2020-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
            it('-> Should have error code: 200', function(done) {
                response.should.have.status(200)
                done()
            })
            it('-> Should be an Object', function(done) {
                response.body.should.be.an('array')
                done()
            })
            it('-> Should have length 209 (max difference in dates 1 year)', function(done) {
                response.body.should.be.an('array').lengthOf(209)
                done()
            })
            after(() => {
                request = {
                    teacherIds: [1, 2],
                    title: 'Blue Ocean',
                    days: [0, 1, 2, 3, 4, 5, 6],
                    firstDate: '2019-09-10',
                    lastDate: '2020-12-31'
                }
            })
        })

        //* All is valid
        request = {
            teacherIds: [1, 2],
            title: 'Blue Ocean',
            days: [0, 1, 2, 3, 4, 5, 6],
            firstDate: '2019-09-10',
            lastDate: '2020-12-31'
        }
        describe(`===> POST / ${JSON.stringify(request)}`, function() {
            it('-> Should have error code: 200', function(done) {
                response.should.have.status(200)
                done()
            })
            it('-> Should be an Object', function(done) {
                response.body.should.be.an('array')
                done()
            })
            it('-> Should have length 300 (max length)', function(done) {
                response.body.should.be.an('array').lengthOf(300)
                done()
            })
        })
    })
})