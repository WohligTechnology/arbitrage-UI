var socketObj = {};
angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  })
  .controller('HomeCtrl', function ($scope, $ionicModal, $timeout, $state, apiService) {
    $scope.changeScript = function (script) {
      apiService.setScript(script, function () {
        $state.go("app.marketstatus");
      });

    };
    // $scope.currentScript = apiService.getScript();
  })
  .controller('MarketStatusCtrl',
    function ($scope, $timeout, apiService) {


      $scope.currentScript = apiService.getScript();
      io.sails.url = $scope.currentScript.url;
      io.sails.connect();

      $scope.currency1 = $scope.currentScript.currency1;
      $scope.currency2 = $scope.currentScript.currency2;
      $scope.currencyShortName2 = $scope.currentScript.currencyShortName1;
      $scope.currencyShortName1 = $scope.currentScript.currencyShortName2;
      $scope.market = $scope.currencyShortName2 + "/" + $scope.currencyShortName1;

      $scope.initialRipple = $scope.currentScript.initialCurrency1;
      $scope.initialBitcoin = $scope.currentScript.initialCurrency2;
      $scope.initialDateMoment = moment($scope.currentScript.initialDate, "MM-DD-YYYY");
      $scope.currentDateMoment = moment();
      var days = moment().diff($scope.initialDateMoment, "days");
      $scope.days = days;
      var daysInYear = 365;
      $scope.initialDate = $scope.initialDateMoment.toDate();
      $scope.currentDate = $scope.currentDateMoment.toDate();

      function getCurrentAmount() {
        async.parallel({
          balance: apiService.balance,
          marketsData: apiService.getLastMarketData
        }, function (err, data) {
          $scope.oldBalance = data.balance.old;
          $scope.newBalance = data.balance.new;
          $scope.newBinance = _.find($scope.newBalance, function (n) {
            return n.market == "Binance";
          });
          $scope.market1Data = {};
          $scope.market1Data.bitcoin = parseFloat($scope.newBinance.data[$scope.currencyShortName2].available) + parseFloat($scope.newBinance.data[$scope.currencyShortName2].onOrder);
          $scope.market1Data.usd = parseFloat($scope.newBinance.data.BTC.available) + parseFloat($scope.newBinance.data.BTC.onOrder);
          $scope.newHitbtc = _.find($scope.newBalance, function (n) {
            return n.market == "Hitbtc";
          });
          $scope.market2Data = {};
          $scope.market2Data.bitcoin = parseFloat($scope.newHitbtc.data[$scope.currencyShortName2].cash);
          $scope.market2Data.usd = parseFloat($scope.newHitbtc.data.BTC.cash);
          $scope.totalUsd = $scope.market1Data.usd + $scope.market2Data.usd;
          $scope.totalBitcoin = $scope.market1Data.bitcoin + $scope.market2Data.bitcoin;
          $scope.totalValueUsd = $scope.totalUsd + ($scope.totalBitcoin * $scope.valueOfBitcoin);
          $scope.totalValueBitcoin = $scope.totalValueUsd / $scope.valueOfBitcoin;
          $scope.rippleGrowth = ($scope.totalBitcoin / $scope.initialRipple - 1);
          $scope.bitcoinGrowth = ($scope.totalUsd / $scope.initialBitcoin - 1);
          $scope.annulizedRipple = $scope.rippleGrowth * daysInYear / days;
          $scope.annulizedBitcoin = $scope.bitcoinGrowth * daysInYear / days;
        });
      }
      getCurrentAmount();

      function getArbitrage() {
        apiService.getArbitrage(function (err, data) {
          $scope.arbitrage = data;
        });
      }
      getArbitrage();
      io.socket.on('connect', function () {
        io.socket.off("RatioBuySell", socketObj.ratioBuySell);
        socketObj.ratioBuySell = function (data) {
          $scope.ratioBuySell = data;
          $scope.$apply();
        };
        io.socket.on("RatioBuySell", socketObj.ratioBuySell);

        io.socket.off("RatioSellBuy", socketObj.ratioSellBuy);
        socketObj.ratioSellBuy = function (data) {
          $scope.ratioSellBuy = data;
          $scope.$apply();
        };
        io.socket.on("RatioSellBuy", socketObj.ratioSellBuy);

        io.socket.off("Arbitrage", socketObj.arbitrageData);
        socketObj.arbitrageData = function (data) {
          $scope.arbitrageData = data;
          $scope.$apply();
        };
        io.socket.on("Arbitrage", socketObj.arbitrageData);
      });



    })




  .controller('MarketlistsCtrl', function ($scope, $stateParams, apiService, $state) {
    io.socket.close();
    $scope.bitcoinPrice = 11300;
    $scope.initial = function () {
      $scope.pageNo = 0;
      $scope.processes = [];
      $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    $scope.initial();
    $scope.differenceTime = function (process) {
      var difference = moment(process.updatedAt).diff(moment(process.createdAt), "second");
      return difference;
    };
    $scope.moreDataCanBeLoaded = function () {
      return true;
      // console.log("More Data");
    };
    $scope.loadMoreData = function () {
      apiService.searchProcess(++$scope.pageNo, function (data) {
        $scope.processes = _.concat($scope.processes, data.results);
        if (data.results.length == 20) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      });
    };
    $scope.doRefresh = function () {
      $scope.initial();
      $scope.loadMoreData();
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.checkTransaction1 = function (transaction) {
      if (transaction.status == "Pending" || transaction.status == "Cancelled") {
        apiService.cancelTransaction1(transaction._id, function () {

        });
      }
    };
    $scope.checkTransaction2 = function (transaction) {
      if (transaction.status == "Pending" || transaction.status == "Cancelled") {
        apiService.cancelTransaction2(transaction._id, function () {

        });
      }
    };
  })
  .controller('GrowthCtrl', function ($scope, $ionicModal, $timeout, apiService) {
    function generateGraph(data) {
      console.log(data.length);
      $scope.labels = [];
      var script1Arr = [];
      var script2Arr = [];
      _.each(data, function (n) {
        // if (moment(n.date).isAfter("2018-04-25T12:18:54.539Z")) {
        $scope.labels.push(moment(n.date).format("H:mm, D MMM"));
        var script1Val = parseFloat(n.market1.data.STORM.available) + parseFloat(n.market2.data.STORM.cash);
        script1Arr.push(script1Val);
        var script2Val = parseFloat(n.market1.data.BTC.available) + parseFloat(n.market2.data.BTC.cash);
        script2Arr.push(script2Val);
        // }
      });

      $scope.series = ['STORM', 'BTC'];
      $scope.data = [
        script1Arr,
        script2Arr
      ];

      var color1 = "#488aff";
      var color2 = "#32db64";


      $scope.datasetOverride = [{
          yAxisID: 'y-axis-1',
          borderColor: color1,
          backgroundColor: color1 + "10",
          pointBackgroundColor: color1,
          pointHoverBackgroundColor: color1,

        },
        {
          yAxisID: 'y-axis-2',
          borderColor: color2,
          backgroundColor: color2 + "10",
          pointBackgroundColor: color2,
          pointHoverBackgroundColor: color2
        }
      ];
      $scope.options = {
        events: ['click', "touch"],
        maintainAspectRatio: true,
        responsiveAnimationDuration: 1000,
        scales: {
          yAxes: [{
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };

    }

    apiService.getDataPerDay(generateGraph);

  });
