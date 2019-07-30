var socketObj = {};
var socket;
angular
  .module("starter.controllers", [])

  .controller("AppCtrl", function($scope, $ionicModal, $timeout) {})
  .controller("HomeCtrl", function(
    $scope,
    $ionicModal,
    $timeout,
    $state,
    apiService
  ) {
    $scope.changeScript = function(script) {
      apiService.setScript(script, function() {
        $state.go("app.marketstatus");
      });
    };
    // $scope.currentScript = apiService.getScript();
  })
  .controller("MarketStatusCtrl", function($scope, $timeout, apiService) {
    $scope.currentScript = apiService.getScript();
    io.sails.url = $scope.currentScript.url;

    socket = io.sails.connect();

    $scope.currency1 = $scope.currentScript.currency1;
    $scope.currency2 = $scope.currentScript.currency2;
    $scope.currencyShortName1 = $scope.currentScript.currencyShortName1;
    $scope.currencyShortName2 = $scope.currentScript.currencyShortName2;
    $scope.market = $scope.currencyShortName2 + "/" + $scope.currencyShortName1;

    $scope.minQuantity = $scope.currentScript.minQuantity;

    $scope.initialCurrency1 = $scope.currentScript.initialCurrency1;
    $scope.initialCurrency2 = $scope.currentScript.initialCurrency2;

    $scope.market1Currency1 = $scope.currentScript.market1Currency1;
    $scope.market1Currency2 = $scope.currentScript.market1Currency2;

    $scope.market2Currency1 = $scope.currentScript.market2Currency1;
    $scope.market2Currency2 = $scope.currentScript.market2Currency2;

    $scope.finalCurrency1 =
      $scope.currentScript.market1Currency1 +
      $scope.currentScript.market2Currency1;
    $scope.finalCurrency2 =
      $scope.currentScript.market1Currency2 +
      $scope.currentScript.market2Currency2;

    $scope.initialDateMoment = moment(
      $scope.currentScript.initialDate,
      "MM-DD-YYYY"
    );
    $scope.currentDateMoment = moment();
    var days = moment().diff($scope.initialDateMoment, "days");
    $scope.days = days;
    var daysInYear = 365;
    $scope.initialDate = $scope.initialDateMoment.toDate();
    $scope.currentDate = $scope.currentDateMoment.toDate();

    socket.on("market-rates", function(marketData) {
      getCurrentAmount(marketData);
    });

    function getCurrentAmount(data) {
      $scope.market = data;
      $scope.growth1 = $scope.finalCurrency1 / $scope.initialCurrency1 - 1;
      $scope.growth2 = $scope.finalCurrency2 / $scope.initialCurrency2 - 1;
      $scope.annualizedGrowth1 = ($scope.growth1 * daysInYear) / days;
      $scope.annualizedGrowth2 = ($scope.growth2 * daysInYear) / days;

      $scope.buySellRatio = data.market1.bid / data.market2.ask;
      $scope.sellBuyRatio = data.market2.bid / data.market1.ask;
      $scope.$apply();
    }
  })

  .controller("MarketlistsCtrl", function(
    $scope,
    $stateParams,
    apiService,
    $state
  ) {
    // socket.close();
    $scope.currentScript = apiService.getScript();
    $scope.currency1 = $scope.currentScript.currency1;
    $scope.currency2 = $scope.currentScript.currency2;
    $scope.currencyShortName2 = $scope.currentScript.currencyShortName1;
    $scope.currencyShortName1 = $scope.currentScript.currencyShortName2;
    $scope.market = $scope.currencyShortName2 + "/" + $scope.currencyShortName1;

    $scope.initialRipple = $scope.currentScript.initialCurrency1;
    $scope.initialBitcoin = $scope.currentScript.initialCurrency2;

    $scope.initial = function() {
      $scope.pageNo = 0;
      $scope.processes = [];
      $scope.$broadcast("scroll.infiniteScrollComplete");
    };
    $scope.initial();
    $scope.differenceTime = function(process) {
      var difference = moment(process.updatedAt).diff(
        moment(process.createdAt),
        "second"
      );
      return difference;
    };
    $scope.moreDataCanBeLoaded = function() {
      return true;
      // console.log("More Data");
    };
    $scope.loadMoreData = function() {
      apiService.searchProcess(++$scope.pageNo, function(data) {
        $scope.processes = _.concat($scope.processes, data.results);
        _.each($scope.processes, function(n) {
          if (n.transaction2.response.avgPrice) {
            if (n.processType == "BuySell") {
              n.ratio =
                parseFloat(n.transaction2.response.avgPrice) /
                parseFloat(n.transaction1.rate);
            } else {
              n.ratio =
                parseFloat(n.transaction1.rate) /
                parseFloat(n.transaction2.response.avgPrice);
            }
          }
          if (
            n.transaction2.market == "Hitbtc" &&
            n.transaction2.status == "Completed"
          ) {
            n.transaction2.rate = n.transaction2.response.avgPrice;
          }
        });
        if (data.results.length == 20) {
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }
      });
    };
    $scope.doRefresh = function() {
      $scope.initial();
      $scope.loadMoreData();
      $scope.$broadcast("scroll.refreshComplete");
    };
    $scope.checkTransaction1 = function(transaction) {
      if (
        transaction.status == "Pending" ||
        transaction.status == "Cancelled"
      ) {
        apiService.cancelTransaction1(transaction._id, function() {});
      }
    };
    $scope.checkTransaction2 = function(transaction) {
      if (
        transaction.status == "Pending" ||
        transaction.status == "Cancelled"
      ) {
        apiService.cancelTransaction2(transaction._id, function() {});
      }
    };
  })
  .controller("GrowthCtrl", function(
    $scope,
    $ionicModal,
    $timeout,
    apiService
  ) {
    function generateGraph(data) {
      console.log(data.length);
      $scope.labels = [];
      var script1Arr = [];
      var script2Arr = [];
      _.each(data, function(n) {
        // if (moment(n.date).isAfter("2018-04-25T12:18:54.539Z")) {
        $scope.labels.push(moment(n.date).format("H:mm, D MMM"));
        var script1Val =
          parseFloat(n.market1.data.STORM.available) +
          parseFloat(n.market2.data.STORM.cash);
        script1Arr.push(script1Val);
        var script2Val =
          parseFloat(n.market1.data.BTC.available) +
          parseFloat(n.market2.data.BTC.cash);
        script2Arr.push(script2Val);
        // }
      });

      $scope.series = ["STORM", "BTC"];
      $scope.data = [script1Arr, script2Arr];

      var color1 = "#488aff";
      var color2 = "#32db64";

      $scope.datasetOverride = [
        {
          yAxisID: "y-axis-1",
          borderColor: color1,
          backgroundColor: color1 + "10",
          pointBackgroundColor: color1,
          pointHoverBackgroundColor: color1
        },
        {
          yAxisID: "y-axis-2",
          borderColor: color2,
          backgroundColor: color2 + "10",
          pointBackgroundColor: color2,
          pointHoverBackgroundColor: color2
        }
      ];
      $scope.options = {
        events: ["click", "touch"],
        maintainAspectRatio: true,
        responsiveAnimationDuration: 1000,
        scales: {
          yAxes: [
            {
              id: "y-axis-1",
              type: "linear",
              display: true,
              position: "left"
            },
            {
              id: "y-axis-2",
              type: "linear",
              display: true,
              position: "right"
            }
          ]
        }
      };
    }

    apiService.getDataPerDay(generateGraph);
  });
