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
      },
      searchProcess: function (page, callback) {
        $http.post(adminurl + "Process/search", {
          page: page,
          // filter: {
          //   status: "ProcessCompleted"
          // }

        }).then(function (data) {
          callback(data.data.data);
        });
      },
      cancelTransaction1: function (id, callback) {
        $http.post(adminurl + "Transaction/checkTransaction1", {
          _id: id
        }).then(function (data) {
          callback(data.data.data);
        });
      },
      cancelTransaction2: function (id, callback) {
        $http.post(adminurl + "Transaction/checkTransaction2", {
          _id: id
        }).then(function (data) {
          callback(data.data.data);
        });
      },
      // This is a demo Service for POST Method.


    };
  });
