var chai = require('chai');
var expect = chai.expect;
var config = require('./../../../config/config')();
var mongoose = require('mongoose');
var Client = require('../../../modules/client/model')(mongoose);
var _controller = require('../../../modules/client/api/controller')(Client);
var clients, req, res, aleatorio = {};

describe("Clients", function () {

  beforeEach(function () {
    aleatorio = Math.floor((Math.random() * 100000000) + 1)
    mongoose.connect(config.db);
  });

  afterEach(function () {
    mongoose.connection.close();
  })

  describe("findAll()", function () {
    it('Buscar todos os Clientes', function (done) {
      var cb = function (err, data, res) {
        clients = data;
        expect(data[0]).to.not.be.undefined;
        done();
      };

      _controller.findAll(req, res, cb);
    });
  });

  describe("findOneById()", function () {
    it('Buscar Cliente por ID', function (done) {
      var find_Id = clients[0]._id.toString();

      var cb = function (err, data, res) {
        expect(data._id.toString()).to.equal(find_Id);
        done();
      };

      var req = {
        params: {
          id: find_Id
        }
      };

      _controller.findOneById(req, res, cb);
    });
  });

  describe("save()", function () {
    it('Cadastrar um Cliente', function (done) {
      var cb = function (err, data, res) {
        expect(data._id.toString()).to.have.length.above(0);
        done();
      };

      var req = {
        body: {
          razaoSocial: 'teste' + aleatorio
        }
      };

      _controller.save(req, res, cb);
    });
  });

  describe("update()", function () {
    it('Alterar um Cliente', function (done) {
      var cb = function (err, data, res) {
        expect(data.ok).to.equal(1);
        done();
      };

      var req = {
        params: {
          id: clients[0]._id.toString(),
        },
        body: {
          razaoSocial: 'testeUpdate' + aleatorio
        }
      };

      _controller.update(req, res, cb);
    });
  });

  describe("remove()", function () {
    it('Remover um Cliente', function (done) {
      var cb = function (err, data, res) {
        expect(data.result.ok).to.equal(1);
        done();
      };

      var req = {
        params: {
          id: clients[0]._id.toString(),
        }
      };

      _controller.remove(req, res, cb);
    });
  });
});
