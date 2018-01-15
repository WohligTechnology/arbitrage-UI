angular.module('apiService', [])
  .factory('apiService', function ($http, $q, $timeout) {
    return {

      balance: function (callback) {
        $http({
          url: adminurl + 'Balance/getOldNew',
          method: 'POST'
        }).then(function (data) {
          callback(null, data.data.data);
        });
      },
      getLastMarketData: function (callback) {
        $http({
          url: adminurl + 'MarketsData/getLast',
          method: 'POST'
        }).then(function (data) {
          callback(null, data.data.data);
        });
      },
      getKoinex: function (callback) {
        $http({
          url: "https://koinex.in/api/ticker",
          method: 'GET'
        }).then(function (data) {
          callback(null, data.data);
        });
      },
      getArbitrage: function (callback) {
        $http({
          url: adminurl + 'Arbitrage/getArbitrage',
          method: 'GET'
        }).then(function (data) {
          callback(null, data.data);
        });
      },
      getBestScripts: function (callback) {
        $http.post(adminurl + "MarketsData/getBestScripts").then(function (data) {
          callback(data.data.data);
        });
      }
      // This is a demo Service for POST Method.


    };
  });
