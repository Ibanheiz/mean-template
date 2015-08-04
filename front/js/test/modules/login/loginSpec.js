'use strict';

var dom = require('jsdom');
var chai = require('chai');
var should = chai.should();
var jsdom = require('jsdom')
require('./../../testHelper')


require('angular-mocks');

describe('Formulário de Login', function() {

  it('Validações', function (done) {

    this.timeout(5000);
    jsdom.env({
      file: __dirname + '/../../templates/login/views/login.html',
      scripts: [
        __dirname + '/../../../../build/js/app.js'
      ],
      features: {
        FetchExternalResources: ["script"],
        ProcessExternalResources: ["script"],
      },
      done: function(errors, window) {

        var $ = function(selector) {
          return window.document.querySelector(selector);
        }
        var trigger = function(el, ev) {
          var e = window.document.createEvent('UIEvents');
          e.initEvent(ev, true, true);
          el.dispatchEvent(e);
        }
        var botaoLogin = $('input[type=submit]');
        var username = $('input[name=username]');
        var password = $('input[name=password]');

        username.value = 'ibanheiz';
        trigger(username, 'change');
        password.value = '123';
        trigger(password, 'change');

        botaoLogin.click();

        // usar should na verificação da mensagem no angular

        done();
      }
    });
  });
});