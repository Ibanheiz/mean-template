'use strict';

var SystemUrlConfig = {
  getBaseUrl: '/mean-seed',
  getHome: '/mean-seed/client',
  getLogin: '/mean-seed/login',
  getSignup: '/mean-seed/signup',
  getCreateClient: '/mean-seed/client/create',
  getEditClient: '/mean-seed/client/:id/edit',
  getRemoveClient: '/mean-seed/client/:id/remove',
  getUser: '/mean-seed/user',
  get404: '/mean-seed/404'
};

module.exports = SystemUrlConfig;