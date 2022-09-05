
  var Module = typeof globalThis.EmscriptenForgeModule !== 'undefined' ? globalThis.EmscriptenForgeModule : {};

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'cytoolz-0.11.2-h672cd09_0.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'cytoolz-0.11.2-h672cd09_0.tar.bz2.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;

      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];
      var PACKAGE_UUID = metadata['package_uuid'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['empackSetStatus']) Module['empackSetStatus']('Downloading',PACKAGE_NAME,loaded,total);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "home", true, true);
Module['FS_createPath']("/home", "runner", true, true);
Module['FS_createPath']("/home/runner", "env", true, true);
Module['FS_createPath']("/home/runner/env", "lib", true, true);
Module['FS_createPath']("/home/runner/env/lib", "python3.10", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10", "site-packages", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "cytoolz", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/cytoolz", "curried", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "cytoolz-0.11.2.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":383806,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1254,2540,3822,5134,6256,7239,8790,10346,11513,12775,14284,15783,17111,18512,19718,20674,21946,23328,24512,25511,26615,27967,28724,29915,31046,31690,32917,34455,35761,37134,38372,39776,41058,42463,43808,45273,46646,48038,49435,50523,51887,53439,54987,56483,57914,59224,59946,60993,62397,63758,65070,65593,66655,67863,69135,70320,71340,72426,73551,74736,75645,76963,78420,79623,80783,81965,83007,84015,85024,86031,87049,88123,89319,90463,91582,92702,93835,95141,95874,96525,97229,97901,98689,99336,100045,100692,101270,102174,103042,103887,104733,105776,106547,107237,107958,108689,109331,109957,110655,111258,111949,112786,113901,115432,116722,118253,119535,120981,122325,123663,125094,126598,128092,129525,130801,131637,132416,133663,135153,136618,138102,139562,140955,142397,143061,144281,145472,146921,148380,149821,151320,152668,154148,155598,156929,158376,159628,160624,161839,162935,164067,165398,166835,168113,169512,170863,172206,173631,175191,176706,178102,179472,180960,182420,183821,185108,186633,187744,189000,190208,191576,192998,194320,195567,196599,197150,197696,199070,200418,201897,203244,204716,206256,207004,208450,209592,210889,212450,213897,215138,216027,217047,217611,218054,218783,219609,220850,222182,223608,224841,226237,227488,228637,229690,230586,231652,232932,234126,235166,236248,237283,237858,238372,238634,239226,239951,240647,241333,242556,243631,245038,246254,247564,248958,249255,249400,250773,252088,253456,254682,255778,256781,257788,258794,259999,261212,262429,263363,264118,265120,266381,267216,268187,268930,269817,271198,272774,274024,275447,276866,278146,279266,280553,281981,283451,284849,286225,287665,289041,290165,291580,292738,294289,295854,297086,298439,299784,301336,302751,304244,305675,306932,308115,309687,311105,312461,313790,315062,316491,317868,319340,320738,321896,323260,324694,326004,327462,328898,330219,331637,332916,334194,335043,336229,337715,339210,340674,342062,343406,344651,345645,346785,348144,349280,350676,352064,353228,354669,355718,356766,357722,358327,359461,360779,361918,362929,363307,364068,365062,366307,367536,368966,370163,371592,373078,374414,375569,377059,378500,379968,381154,382383,383341],"sizes":[1254,1286,1282,1312,1122,983,1551,1556,1167,1262,1509,1499,1328,1401,1206,956,1272,1382,1184,999,1104,1352,757,1191,1131,644,1227,1538,1306,1373,1238,1404,1282,1405,1345,1465,1373,1392,1397,1088,1364,1552,1548,1496,1431,1310,722,1047,1404,1361,1312,523,1062,1208,1272,1185,1020,1086,1125,1185,909,1318,1457,1203,1160,1182,1042,1008,1009,1007,1018,1074,1196,1144,1119,1120,1133,1306,733,651,704,672,788,647,709,647,578,904,868,845,846,1043,771,690,721,731,642,626,698,603,691,837,1115,1531,1290,1531,1282,1446,1344,1338,1431,1504,1494,1433,1276,836,779,1247,1490,1465,1484,1460,1393,1442,664,1220,1191,1449,1459,1441,1499,1348,1480,1450,1331,1447,1252,996,1215,1096,1132,1331,1437,1278,1399,1351,1343,1425,1560,1515,1396,1370,1488,1460,1401,1287,1525,1111,1256,1208,1368,1422,1322,1247,1032,551,546,1374,1348,1479,1347,1472,1540,748,1446,1142,1297,1561,1447,1241,889,1020,564,443,729,826,1241,1332,1426,1233,1396,1251,1149,1053,896,1066,1280,1194,1040,1082,1035,575,514,262,592,725,696,686,1223,1075,1407,1216,1310,1394,297,145,1373,1315,1368,1226,1096,1003,1007,1006,1205,1213,1217,934,755,1002,1261,835,971,743,887,1381,1576,1250,1423,1419,1280,1120,1287,1428,1470,1398,1376,1440,1376,1124,1415,1158,1551,1565,1232,1353,1345,1552,1415,1493,1431,1257,1183,1572,1418,1356,1329,1272,1429,1377,1472,1398,1158,1364,1434,1310,1458,1436,1321,1418,1279,1278,849,1186,1486,1495,1464,1388,1344,1245,994,1140,1359,1136,1396,1388,1164,1441,1049,1048,956,605,1134,1318,1139,1011,378,761,994,1245,1229,1430,1197,1429,1486,1336,1155,1490,1441,1468,1186,1229,958,465],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_cytoolz-0.11.2-h672cd09_0.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_cytoolz-0.11.2-h672cd09_0.tar.bz2.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz-0.11.2.dist-info/direct_url.json", "start": 662301, "end": 662407}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/__init__.py", "start": 32319, "end": 32790}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/_signatures.py", "start": 628047, "end": 632403}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/_version.py", "start": 32267, "end": 32319}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/compatibility.py", "start": 442223, "end": 443220}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/curried/__init__.py", "start": 659067, "end": 661951}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/curried/exceptions.py", "start": 661951, "end": 662301}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/curried/operator.py", "start": 658565, "end": 659067}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/dicttoolz.cpython-310.so", "start": 32790, "end": 123959}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/functoolz.cpython-310.so", "start": 443220, "end": 628047}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/itertoolz.cpython-310.so", "start": 123959, "end": 442223}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/recipes.cpython-310.so", "start": 0, "end": 32267}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cytoolz/utils.cpython-310.so", "start": 632403, "end": 658565}]});
  })();
