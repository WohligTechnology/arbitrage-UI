angular.module('apiService', [])
  .factory('apiService', function ($http, $q, $timeout, $state) {
    var scripts = {
      "BCN": {
        currencyShortName1: "BCN",
        currencyShortName2: "BTC",
        url: "http://bcn.wohlig.com",
        currency1: "Bytecoin",
        currency2: "Bitcoin",
        initialCurrency1: 306900.000000000,
        initialCurrency2: 0.17232397,
        initialDate: "07-24-2018",
        currency1Decimal: 0,
        currency2Decimal: 8,
        rateDecimal: 10,
        minimumInHitbtcQuantity: 100
      }
    };
    return {
      setScript: function (script, callback) {
        $.jStorage.set("script", scripts[script]);
        $timeout(function () {
          callback();
        }, 100);
      },
      getScript: function () {
        var scriptDet = $.jStorage.get("script");
        if (scriptDet) {
          adminurl = scriptDet.url + "/api/";
          return scriptDet;
        } else {
          $state.go("app.home");
        }
      },
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
      getDataPerDay: function (callback) {
        // var adminurl = "http://localhost:1337/api/";
        $http.post(adminurl + "Balance/getDataPerDay").then(function (data) {
          callback(data.data.data);
        });

      },
      // This is a demo Service for POST Method.
    };
  });
