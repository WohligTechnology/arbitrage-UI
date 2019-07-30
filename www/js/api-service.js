angular
  .module("apiService", [])
  .factory("apiService", function($http, $timeout, $state) {
    var scripts = {
      TRX: {
        currencyShortName1: "TRX",
        currencyShortName2: "BTC",
        url: "https://trx.wohlig.in",
        currency1: "Tron",
        currency2: "Bitcoin",
        initialCurrency1: 540000,
        initialCurrency2: 2,
        initialDate: "11-07-2018",
        market1Currency1: 439397,
        market2Currency1: 679231,
        market1Currency2: 2.12,
        market2Currency2: 0.98,
        currency1Decimal: 2,
        currency2Decimal: 4,
        rateDecimal: 10,
        minQuantity: 1000,
        requiredRatio: 1.25
      }
    };
    return {
      setScript: function(script, callback) {
        $.jStorage.set("script", scripts[script]);
        $timeout(function() {
          callback();
        }, 100);
      },
      getScript: function() {
        var scriptDet = $.jStorage.get("script");
        if (scriptDet) {
          adminurl = scriptDet.url + "/api/";
          return scriptDet;
        } else {
          $state.go("app.home");
        }
      },
      balance: function(callback) {
        $http({
          url: adminurl + "Balance/getOldNew",
          method: "POST"
        }).then(function(data) {
          callback(null, data.data.data);
        });
      },
      getLastMarketData: function(callback) {
        $http({
          url: adminurl + "MarketsData/getLast",
          method: "POST"
        }).then(function(data) {
          callback(null, data.data.data);
        });
      },
      getKoinex: function(callback) {
        $http({
          url: "https://koinex.in/api/ticker",
          method: "GET"
        }).then(function(data) {
          callback(null, data.data);
        });
      },
      getArbitrage: function(callback) {
        $http({
          url: adminurl + "Arbitrage/getArbitrage",
          method: "GET"
        }).then(function(data) {
          callback(null, data.data);
        });
      },
      getBestScripts: function(callback) {
        $http
          .post(adminurl + "MarketsData/getBestScripts")
          .then(function(data) {
            callback(data.data.data);
          });
      },
      searchProcess: function(page, callback) {
        $http
          .post(adminurl + "Process/search", {
            page: page
            // filter: {
            //   status: "ProcessCompleted"
            // }
          })
          .then(function(data) {
            callback(data.data.data);
          });
      },
      cancelTransaction1: function(id, callback) {
        $http
          .post(adminurl + "Transaction/checkTransaction1", {
            _id: id
          })
          .then(function(data) {
            callback(data.data.data);
          });
      },
      cancelTransaction2: function(id, callback) {
        $http
          .post(adminurl + "Transaction/checkTransaction2", {
            _id: id
          })
          .then(function(data) {
            callback(data.data.data);
          });
      },
      getDataPerDay: function(callback) {
        // var adminurl = "http://localhost:1337/api/";
        $http.post(adminurl + "Balance/getDataPerDay").then(function(data) {
          callback(data.data.data);
        });
      }
      // This is a demo Service for POST Method.
    };
  });
