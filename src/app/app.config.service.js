function ConfigService($http) {
  return {
    apiUrl: "http://localhost:3000/api"
  }
  }
  angular
    .module('root')
    .service('ConfigService', ConfigService);