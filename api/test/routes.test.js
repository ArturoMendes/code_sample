const app = require('../index.js')
const sinon = require('sinon')
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = require('chai').expect

chai.use(chaiHTTP)

describe('GET /', () => {
  context('basic route', () => {
    it('should return API status', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.text).to.equal('API OK')
          done()
        })
    })
  })
})

describe('GET /station', () => {
  let sandbox
  let stationFindAllStub
  let stationFindByPkStub

  let stations = [
    { id: 1, name: 'test_1', longitude: 41.3, latitude: 41.2 },
    { id: 2, name: 'test_2', longitude: 46.3, latitude: 31.2 },
  ]

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    const Station = app.db.sequelize.models.Station

    stationFindAllStub = sandbox.stub(Station, 'findAll')
    stationFindAllStub.returns(Promise.resolve(stations))

    stationFindByPkStub = sandbox.stub(Station, 'findByPk')
    stationFindByPkStub.callsFake((idx) =>
      Promise.resolve(stations.find((s) => s.id == idx))
    )
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('without parameters', () => {
    it('should return all the stations', (done) => {
      chai
        .request(app)
        .get('/station')
        .end((err, res) => {
          expect(res).to.have.status(200)
          sandbox.assert.calledOnce(stationFindAllStub)
          expect(res.body).to.be.a('array')
          expect(res.body).to.have.length(stations.length)
					expect(res.body).to.deep.equal(stations)
          done()
        })
    })
  })

  context('with station id', () => {
    let testStationId = 1
    it('should return station definition', (done) => {
      chai
        .request(app)
        .get(`/station?id=${testStationId}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          sandbox.assert.calledOnce(stationFindByPkStub)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('id')
          expect(res.body.id).to.equal(testStationId)
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('longitude')
          expect(res.body).to.have.property('latitude')
          done()
        })
    })
  })
})

describe('GET /meteo-variables', () => {
  let sandbox
  let masterVariableFindAllStub

  let masterVariables = [
    { id: 1, name: 'test_1', unit: 'bananas'},
    { id: 2, name: 'test_2', unit: 'km'},
    { id: 3, name: 'test_3', unit: 'm'},
  ]

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    const MasterVariable = app.db.sequelize.models.MasterVariable

    masterVariableFindAllStub = sandbox.stub(MasterVariable, 'findAll')
    masterVariableFindAllStub.returns(Promise.resolve(masterVariables))
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('with no parameters', () => {
    it('should return all master variables', (done) => {
      chai
        .request(app)
        .get('/meteo-variable')
        .end((err, res) => {
          expect(res).to.have.status(200)
					sandbox.assert.calledOnce(masterVariableFindAllStub)
          expect(res.body).to.be.a('array')
					expect(res.body).to.have.length(masterVariables.length)
					expect(res.body).to.deep.equal(masterVariables)
          done()
        })
    })
  })
})
