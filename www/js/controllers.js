angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {


  })

  .controller('MarketStatusCtrl',
    function ($scope, $timeout, apiService) {
      $scope.valueOfBitcoin = 11300;
      $scope.currency1 = "Bitcoin";
      $scope.currency2 = "Ripple";
      $scope.market = "XRP/BTC";

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
          $scope.market1Data.bitcoin = parseFloat($scope.newBinance.data.XRP.available) + parseFloat($scope.newBinance.data.XRP.onOrder);
          $scope.market1Data.usd = parseFloat($scope.newBinance.data.BTC.available) + parseFloat($scope.newBinance.data.BTC.onOrder);

          $scope.newHitbtc = _.find($scope.newBalance, function (n) {
            return n.market == "Hitbtc";
          });

          $scope.market2Data = {};
          $scope.market2Data.bitcoin = parseFloat($scope.newHitbtc.data.XRP.cash);
          $scope.market2Data.usd = parseFloat($scope.newHitbtc.data.BTC.cash);

          $scope.totalUsd = $scope.market1Data.usd + $scope.market2Data.usd;
          $scope.totalBitcoin = $scope.market1Data.bitcoin + $scope.market2Data.bitcoin + 0.21;
          $scope.totalValueUsd = $scope.totalUsd + ($scope.totalBitcoin * $scope.valueOfBitcoin);
          $scope.totalValueBitcoin = $scope.totalValueUsd / $scope.valueOfBitcoin;
        });
      }
      getCurrentAmount();

      function getArbitrage() {
        apiService.getArbitrage(function (err, data) {
          $scope.arbitrage = data;
        });
      }
      getArbitrage();
      io.socket.on("RatioBuySell", function (data) {
        console.log(data);
        $scope.ratioBuySell = data;
        $scope.$apply();
      });
      io.socket.on("RatioSellBuy", function (data) {
        $scope.ratioSellBuy = data;
        $scope.$apply();
      });
      io.socket.on("Arbitrage", function (data) {
        $scope.arbitrageData = data;
        $scope.$apply();
      });

    })

  .controller('MarketlistsCtrl', function ($scope, $stateParams, apiService) {

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
  });
