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
      getDataPerDay: function (callback) {
        // var adminurl = "http://localhost:1337/api/";
        $http.post(adminurl + "Balance/getDataPerDay").then(function (data) {
          callback(data.data.data);
        });
        // callback([{
        //   "number": 49,
        //   "date": "2018-04-25T10:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae052cd370a316cf7a31149",
        //     "createdAt": "2018-04-25T10:05:01.139Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.00004491",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "74934.85300000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae052cd370a316cf7a3114a",
        //     "createdAt": "2018-04-25T10:05:01.359Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.487855453",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "11000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 50,
        //   "date": "2018-04-25T11:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae060dcaa514106dcfb08cb",
        //     "createdAt": "2018-04-25T11:05:00.257Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.02957133",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "70913.79700000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae060dcaa514106dcfb08cc",
        //     "createdAt": "2018-04-25T11:05:00.850Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.448901033",
        //         "reserved": "0.029509480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 51,
        //   "date": "2018-04-25T12:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae06eec6e58ee1f7af47e5d",
        //     "createdAt": "2018-04-25T12:05:00.818Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.00000307",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "74890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae06eed6e58ee1f7af47e5e",
        //     "createdAt": "2018-04-25T12:05:01.051Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.478763601",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 52,
        //   "date": "2018-04-25T13:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae07cfc8a41f03819ad2245",
        //     "createdAt": "2018-04-25T13:05:00.858Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.00000307",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "74890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae07cfc8a41f03819ad2246",
        //     "createdAt": "2018-04-25T13:05:00.864Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.557371461",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "3000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 53,
        //   "date": "2018-04-25T14:05:02.759Z",
        //   "market2": {
        //     "_id": "5ae08b0da4b26d5093a1ce1f",
        //     "createdAt": "2018-04-25T14:05:01.419Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.479579241",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae08b0da4b26d5093a1ce1e",
        //     "createdAt": "2018-04-25T14:05:01.167Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.00000307",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "74890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 54,
        //   "date": "2018-04-25T15:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae0991d71a5436917a6516c",
        //     "createdAt": "2018-04-25T15:05:01.207Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae0991d71a5436917a6516d",
        //     "createdAt": "2018-04-25T15:05:01.445Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 55,
        //   "date": "2018-04-25T16:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae0a72cc01c4d02f2b53577",
        //     "createdAt": "2018-04-25T16:05:00.854Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae0a72cc01c4d02f2b53578",
        //     "createdAt": "2018-04-25T16:05:00.951Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 56,
        //   "date": "2018-04-25T17:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae0b53cb9b8201b7bbe9a5f",
        //     "createdAt": "2018-04-25T17:05:00.849Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae0b53db9b8201b7bbe9a60",
        //     "createdAt": "2018-04-25T17:05:01.116Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 57,
        //   "date": "2018-04-25T18:05:02.759Z",
        //   "market2": {
        //     "_id": "5ae0c34c65670d33fc813233",
        //     "createdAt": "2018-04-25T18:05:00.969Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae0c34c65670d33fc813232",
        //     "createdAt": "2018-04-25T18:05:00.733Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 58,
        //   "date": "2018-04-25T19:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae0d15c5dca1d4c8b1bb606",
        //     "createdAt": "2018-04-25T19:05:00.328Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae0d15c5dca1d4c8b1bb607",
        //     "createdAt": "2018-04-25T19:05:00.531Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 59,
        //   "date": "2018-04-25T20:05:02.759Z",
        //   "market2": {
        //     "_id": "5ae0df6c35608d6508175c7f",
        //     "createdAt": "2018-04-25T20:05:00.794Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae0df6c35608d6508175c7e",
        //     "createdAt": "2018-04-25T20:05:00.398Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 60,
        //   "date": "2018-04-25T21:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae0ed7c2b4dbc7d79e131cc",
        //     "createdAt": "2018-04-25T21:05:00.971Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae0ed7d2b4dbc7d79e131cd",
        //     "createdAt": "2018-04-25T21:05:01.222Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 61,
        //   "date": "2018-04-25T22:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae0fb8dc26496175d7e8feb",
        //     "createdAt": "2018-04-25T22:05:01.086Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae0fb8dc26496175d7e8fec",
        //     "createdAt": "2018-04-25T22:05:01.353Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 62,
        //   "date": "2018-04-25T23:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae1099dfbf1ab3011bfa1e3",
        //     "createdAt": "2018-04-25T23:05:01.150Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1099dfbf1ab3011bfa1e4",
        //     "createdAt": "2018-04-25T23:05:01.462Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 63,
        //   "date": "2018-04-26T00:05:02.759Z",
        //   "market2": {
        //     "_id": "5ae117ac225b16494349f327",
        //     "createdAt": "2018-04-26T00:05:00.502Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.389008761",
        //         "reserved": "0.090570480"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "13000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae117ac225b16494349f326",
        //     "createdAt": "2018-04-26T00:05:00.348Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.09075223",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62890.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 64,
        //   "date": "2018-04-26T01:05:02.759Z",
        //   "market2": {
        //     "_id": "5ae125bdbc5d6b61c663d4f0",
        //     "createdAt": "2018-04-26T01:05:01.082Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.335193159",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "32000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae125bcbc5d6b61c663d4ef",
        //     "createdAt": "2018-04-26T01:05:00.780Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.14496523",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "55887.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 65,
        //   "date": "2018-04-26T02:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae133cdb04ce77a49d5d336",
        //     "createdAt": "2018-04-26T02:05:01.013Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.08922523",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "62880.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae133ccb04ce77a49d5d335",
        //     "createdAt": "2018-04-26T02:05:00.982Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.391192295",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "25000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 66,
        //   "date": "2018-04-26T03:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae141dc9d98b614193a7686",
        //     "createdAt": "2018-04-26T03:05:00.771Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.28550931",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "37875.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae141dc9d98b614193a7687",
        //     "createdAt": "2018-04-26T03:05:00.961Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.195603155",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "50000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 67,
        //   "date": "2018-04-26T04:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae14fed5383fe2c8e43f957",
        //     "createdAt": "2018-04-26T04:05:01.107Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.28550931",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "37875.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae14fed5383fe2c8e43f958",
        //     "createdAt": "2018-04-26T04:05:01.329Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.195603155",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "50000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 68,
        //   "date": "2018-04-26T05:05:02.759Z",
        //   "market1": {
        //     "_id": "5ae15dfc9107574525e0aeb2",
        //     "createdAt": "2018-04-26T05:05:00.480Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.34914561",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "29875.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae15dfc9107574525e0aeb3",
        //     "createdAt": "2018-04-26T05:05:00.715Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.132079695",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "58000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 69,
        //   "date": "2018-04-26T06:05:02.757Z",
        //   "market2": {
        //     "_id": "5ae16c0ddadabb5da74673dc",
        //     "createdAt": "2018-04-26T06:05:01.043Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.014448335",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "73000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae16c0ddadabb5da74673dd",
        //     "createdAt": "2018-04-26T06:05:01.835Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.46707756",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "14875.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 70,
        //   "date": "2018-04-26T07:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae17a1c0381367700b3e086",
        //     "createdAt": "2018-04-26T07:05:00.816Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.47486976",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "13875.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae17a1d0381367700b3e087",
        //     "createdAt": "2018-04-26T07:05:01.079Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.006649115",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "74000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 71,
        //   "date": "2018-04-26T08:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae1882c5d82a510d250bef0",
        //     "createdAt": "2018-04-26T08:05:00.467Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.38939976",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "24864.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1882c5d82a510d250bef1",
        //     "createdAt": "2018-04-26T08:05:00.726Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.092689139",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "63000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 72,
        //   "date": "2018-04-26T09:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae1963ccd97c62951847c40",
        //     "createdAt": "2018-04-26T09:05:00.622Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48051159",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12849.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1963ccd97c62951847c41",
        //     "createdAt": "2018-04-26T09:05:00.877Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.003072521",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 73,
        //   "date": "2018-04-26T10:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae1a44cf72a4741dbb1d129",
        //     "createdAt": "2018-04-26T10:05:00.372Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48051159",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12849.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1a44cf72a4741dbb1d12a",
        //     "createdAt": "2018-04-26T10:05:00.599Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.003072521",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 74,
        //   "date": "2018-04-26T11:05:02.754Z",
        //   "market2": {
        //     "_id": "5ae1b25ce5f9665a553fd87b",
        //     "createdAt": "2018-04-26T11:05:00.883Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.157318121",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "55000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae1b25ce5f9665a553fd87a",
        //     "createdAt": "2018-04-26T11:05:00.679Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.32651159",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "32829.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 75,
        //   "date": "2018-04-26T12:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae1c06c2c8d1672c27baa93",
        //     "createdAt": "2018-04-26T12:05:00.476Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.32651159",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "32829.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1c06c2c8d1672c27baa94",
        //     "createdAt": "2018-04-26T12:05:00.716Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.157318121",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "55000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 76,
        //   "date": "2018-04-26T13:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae1ce7c0e34b10ca4e2b354",
        //     "createdAt": "2018-04-26T13:05:00.362Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48175619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12829.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1ce7c0e34b10ca4e2b355",
        //     "createdAt": "2018-04-26T13:05:00.652Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.002163121",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 77,
        //   "date": "2018-04-26T14:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae1dc8cd6f918253d005a1c",
        //     "createdAt": "2018-04-26T14:05:00.754Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48175619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12829.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1dc8dd6f918253d005a1d",
        //     "createdAt": "2018-04-26T14:05:01.022Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.002163121",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 78,
        //   "date": "2018-04-26T15:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae1ea9d1a2c663decf7751e",
        //     "createdAt": "2018-04-26T15:05:01.115Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48175619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12829.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1ea9d1a2c663decf7751f",
        //     "createdAt": "2018-04-26T15:05:01.341Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.002163121",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 79,
        //   "date": "2018-04-26T16:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae1f8acec3a0f5668a5c793",
        //     "createdAt": "2018-04-26T16:05:00.603Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48175619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12829.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae1f8adec3a0f5668a5c794",
        //     "createdAt": "2018-04-26T16:05:01.005Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.002163121",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 80,
        //   "date": "2018-04-26T17:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae206bd2c72846ed6468301",
        //     "createdAt": "2018-04-26T17:05:01.166Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48175619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12829.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae206be2c72846ed6468302",
        //     "createdAt": "2018-04-26T17:05:02.404Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.002163121",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 81,
        //   "date": "2018-04-26T18:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae214cca4442708b3726620",
        //     "createdAt": "2018-04-26T18:05:00.616Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48175619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12829.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae214cca4442708b3726621",
        //     "createdAt": "2018-04-26T18:05:00.661Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.002163121",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 82,
        //   "date": "2018-04-26T19:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae222dccc080021d208d692",
        //     "createdAt": "2018-04-26T19:05:00.887Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.10495619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "60781.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae222ddcc080021d208d693",
        //     "createdAt": "2018-04-26T19:05:01.114Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.380050885",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "27000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 83,
        //   "date": "2018-04-26T20:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae230ec5bc7f83a76b23b70",
        //     "createdAt": "2018-04-26T20:05:00.602Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.03427619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "69772.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae230ec5bc7f83a76b23b71",
        //     "createdAt": "2018-04-26T20:05:00.836Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.450955950",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "18000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 84,
        //   "date": "2018-04-26T21:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae23efc3040a65302ed0656",
        //     "createdAt": "2018-04-26T21:05:00.975Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.03427619",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "69772.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae23efc3040a65302ed0657",
        //     "createdAt": "2018-04-26T21:05:00.994Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.450955950",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "18000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 85,
        //   "date": "2018-04-26T22:05:02.754Z",
        //   "market1": {
        //     "_id": "5ae24d0c45f3356b8a652618",
        //     "createdAt": "2018-04-26T22:05:00.684Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.04218827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "68772.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae24d0d45f3356b8a652619",
        //     "createdAt": "2018-04-26T22:05:01.018Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.443058060",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "19000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 86,
        //   "date": "2018-04-26T23:05:02.753Z",
        //   "market2": {
        //     "_id": "5ae25b1c2d5e940585b6979f",
        //     "createdAt": "2018-04-26T23:05:00.955Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae25b1c2d5e940585b6979e",
        //     "createdAt": "2018-04-26T23:05:00.670Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 87,
        //   "date": "2018-04-27T00:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2692cca93c91e1e6dbeb4",
        //     "createdAt": "2018-04-27T00:05:00.785Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2692dca93c91e1e6dbeb5",
        //     "createdAt": "2018-04-27T00:05:01.083Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 88,
        //   "date": "2018-04-27T01:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2773c4336f936c07723d2",
        //     "createdAt": "2018-04-27T01:05:00.459Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2773c4336f936c07723d3",
        //     "createdAt": "2018-04-27T01:05:00.719Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 89,
        //   "date": "2018-04-27T02:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2854d96a3f44f55200713",
        //     "createdAt": "2018-04-27T02:05:01.242Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2854d96a3f44f55200714",
        //     "createdAt": "2018-04-27T02:05:01.456Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 90,
        //   "date": "2018-04-27T03:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2935cdadbc567f1b56f89",
        //     "createdAt": "2018-04-27T03:05:00.485Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2935cdadbc567f1b56f8a",
        //     "createdAt": "2018-04-27T03:05:00.718Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 91,
        //   "date": "2018-04-27T04:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2a16db3d7ee01bfa3364f",
        //     "createdAt": "2018-04-27T04:05:01.072Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2a16db3d7ee01bfa33650",
        //     "createdAt": "2018-04-27T04:05:01.303Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 92,
        //   "date": "2018-04-27T05:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2af7c5b062b1a86db1e09",
        //     "createdAt": "2018-04-27T05:05:00.659Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2af7c5b062b1a86db1e08",
        //     "createdAt": "2018-04-27T05:05:00.647Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 93,
        //   "date": "2018-04-27T06:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2bd8c8546c7332c7030e6",
        //     "createdAt": "2018-04-27T06:05:00.765Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2bd8c8546c7332c7030e7",
        //     "createdAt": "2018-04-27T06:05:00.779Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 94,
        //   "date": "2018-04-27T07:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2cb9cc913704cc5809029",
        //     "createdAt": "2018-04-27T07:05:00.801Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.01853827",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "71769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2cb9dc913704cc580902a",
        //     "createdAt": "2018-04-27T07:05:01.064Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.466774320",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "16000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 95,
        //   "date": "2018-04-27T08:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2d9ac26fa6a659a97d101",
        //     "createdAt": "2018-04-27T08:05:00.270Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.20051611",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "48769.81600000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2d9ac26fa6a659a97d102",
        //     "createdAt": "2018-04-27T08:05:00.471Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.285122850",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "39000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 96,
        //   "date": "2018-04-27T09:05:02.753Z",
        //   "market2": {
        //     "_id": "5ae2e7bc8f61c67ebc991fcb",
        //     "createdAt": "2018-04-27T09:05:00.992Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.001471218",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae2e7bc8f61c67ebc991fca",
        //     "createdAt": "2018-04-27T09:05:00.760Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48513665",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12757.64900000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 97,
        //   "date": "2018-04-27T10:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae2f5ccd1683b1ada2c815d",
        //     "createdAt": "2018-04-27T10:05:00.233Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48513665",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12757.64900000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae2f5ccd1683b1ada2c815e",
        //     "createdAt": "2018-04-27T10:05:00.476Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.001471218",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 98,
        //   "date": "2018-04-27T11:05:02.753Z",
        //   "market2": {
        //     "_id": "5ae303dc4799b03549cc62cd",
        //     "createdAt": "2018-04-27T11:05:00.802Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.001471218",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   },
        //   "market1": {
        //     "_id": "5ae303dc4799b03549cc62cc",
        //     "createdAt": "2018-04-27T11:05:00.743Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48513665",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12757.64900000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 99,
        //   "date": "2018-04-27T12:05:02.753Z",
        //   "market1": {
        //     "_id": "5ae311ed95bcff4dd4b70896",
        //     "createdAt": "2018-04-27T12:05:01.386Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48513665",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12757.64900000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae311ed95bcff4dd4b70897",
        //     "createdAt": "2018-04-27T12:05:01.422Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.001471218",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }, {
        //   "number": 100,
        //   "date": "2018-04-27T13:05:02.752Z",
        //   "market1": {
        //     "_id": "5ae31ffc284b2a664e745920",
        //     "createdAt": "2018-04-27T13:05:00.438Z",
        //     "market": "Binance",
        //     "data": {
        //       "BTC": {
        //         "available": "0.48513665",
        //         "onOrder": "0.00000000"
        //       },
        //       "TRX": {
        //         "available": "12757.64900000",
        //         "onOrder": "0.00000000"
        //       }
        //     }
        //   },
        //   "market2": {
        //     "_id": "5ae31ffc284b2a664e745921",
        //     "createdAt": "2018-04-27T13:05:00.710Z",
        //     "market": "Hitbtc",
        //     "data": {
        //       "BTC": {
        //         "currency_code": "BTC",
        //         "cash": "0.001471218",
        //         "reserved": "0"
        //       },
        //       "TRX": {
        //         "currency_code": "TRX",
        //         "cash": "75000.00000000",
        //         "reserved": "0"
        //       }
        //     }
        //   }
        // }]);
      },
      // This is a demo Service for POST Method.
    };
  });
