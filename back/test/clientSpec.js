require('jasmine-expect');
var should = require('should');
var config = require('./../config/config')();
var mongoose = require('mongoose');
var Client = require('../modules/client/model')(mongoose);
var _controller = require('../modules/client/api/controller')(Client);
var query, req, res, aleatorio = {};
var client_mock = {
  _id: '5514dd1fb21ea438272381b2',
  razaoSocial: 'Ibanheiz LTDA'
};

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
        expect(data[0]).toBeDefined();
        done();
       };

      _controller.findAll(req, res, cb);
    });
  });

  describe("findOneById()", function () {
    it('Buscar Cliente por ID', function (done) {
      var cb = function (err, data, res) {
        expect(data._id.toString()).toEqual(client_mock._id);
        done();
       };

      var req = {
        params: {
          id: client_mock._id
        }
      };

      _controller.findOneById(req, res, cb);
    });
  });

  describe("save()", function () {
    it('Cadastrar um Cliente', function (done) {
      var cb = function (err, data, res) {
        expect(data._id.toString().length).toBeGreaterThan(0);
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
        expect(data).toEqual(1);
        done();
       };

      var req = {
        params: {
          id: client_mock._id,
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
      var client_removed, clientsCount = {};

      var cb = function (err, data, res) {
        client_removed = data[data.length - 1];
        clientsCount = data.length;

        var cb = function (err, data, res) {
          var newClientsCount = clientsCount - data;
          expect(newClientsCount).toBeLessThan(clientsCount);
          done();
         };

        var req = {
          params: {
            id: client_removed._id.toString()
          }
        };

        _controller.remove(req, res, cb);
      };

      _controller.findAll(req, res, cb);
    });
  });
});