
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
      var PACKAGE_NAME = 'nlopt-2.7.0-hc610fd7_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'nlopt-2.7.0-hc610fd7_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "nlopt-2.7.0.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "nlopt", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":328791,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1241,2174,3434,4555,5778,6801,7763,8324,8751,10143,11410,12499,13819,15188,16485,17784,18861,20003,21281,22333,23059,23825,24471,25880,26922,28220,29531,30729,31905,33405,34904,36172,37750,38748,40263,41661,43144,44683,46067,47570,49124,50593,52287,53834,55240,56728,58201,59580,60992,62510,63875,65348,66602,68122,69735,71037,72387,73899,75264,76662,78223,79636,80975,82196,83456,84928,86493,88037,89623,91116,92684,94070,95475,97127,98272,99806,101263,102352,103557,105095,106719,108201,109740,111204,112761,114298,115886,117300,118857,120195,121577,123101,124583,125933,127404,128787,130294,131661,133285,134808,136307,137667,139136,140527,141933,143282,144792,146250,147658,149047,150396,151947,153641,155158,156530,157605,159026,160617,161931,163266,164658,166026,167528,168998,170358,171814,173304,174801,176266,177434,178851,180006,181270,182711,184162,185783,187029,188485,189648,190552,191909,193095,194527,195860,197094,198223,199402,200602,201871,203370,204663,205235,206725,208167,209008,210261,211392,213077,214294,215637,216882,218005,219249,220665,221886,223442,224484,226011,227425,228441,229911,231060,232156,233325,234380,235541,236939,238215,239533,240860,242171,243094,244434,245806,246641,247711,249105,250425,252084,253453,254861,255690,257147,258515,259595,261000,262035,263463,264727,265935,267334,268643,269428,269756,270229,270651,271094,271555,272034,272470,273332,274448,275724,276360,276894,277381,278225,278379,278683,278982,279327,279674,280487,282535,284583,284611,284639,285311,286107,287166,288242,289490,290866,292267,293729,295140,296626,298111,299573,301084,302490,304020,305385,306928,308254,309938,311153,312948,314506,315507,317438,317579,319574,320938,321961,322633,322732,323115,324341,325053,325556,326435,327316,327837,328441],"sizes":[1241,933,1260,1121,1223,1023,962,561,427,1392,1267,1089,1320,1369,1297,1299,1077,1142,1278,1052,726,766,646,1409,1042,1298,1311,1198,1176,1500,1499,1268,1578,998,1515,1398,1483,1539,1384,1503,1554,1469,1694,1547,1406,1488,1473,1379,1412,1518,1365,1473,1254,1520,1613,1302,1350,1512,1365,1398,1561,1413,1339,1221,1260,1472,1565,1544,1586,1493,1568,1386,1405,1652,1145,1534,1457,1089,1205,1538,1624,1482,1539,1464,1557,1537,1588,1414,1557,1338,1382,1524,1482,1350,1471,1383,1507,1367,1624,1523,1499,1360,1469,1391,1406,1349,1510,1458,1408,1389,1349,1551,1694,1517,1372,1075,1421,1591,1314,1335,1392,1368,1502,1470,1360,1456,1490,1497,1465,1168,1417,1155,1264,1441,1451,1621,1246,1456,1163,904,1357,1186,1432,1333,1234,1129,1179,1200,1269,1499,1293,572,1490,1442,841,1253,1131,1685,1217,1343,1245,1123,1244,1416,1221,1556,1042,1527,1414,1016,1470,1149,1096,1169,1055,1161,1398,1276,1318,1327,1311,923,1340,1372,835,1070,1394,1320,1659,1369,1408,829,1457,1368,1080,1405,1035,1428,1264,1208,1399,1309,785,328,473,422,443,461,479,436,862,1116,1276,636,534,487,844,154,304,299,345,347,813,2048,2048,28,28,672,796,1059,1076,1248,1376,1401,1462,1411,1486,1485,1462,1511,1406,1530,1365,1543,1326,1684,1215,1795,1558,1001,1931,141,1995,1364,1023,672,99,383,1226,712,503,879,881,521,604,350],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_nlopt-2.7.0-hc610fd7_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_nlopt-2.7.0-hc610fd7_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/nlopt-2.7.0.dist-info/direct_url.json", "start": 0, "end": 104}, {"filename": "/home/runner/env/lib/python3.10/site-packages/nlopt/__init__.py", "start": 528000, "end": 528044}, {"filename": "/home/runner/env/lib/python3.10/site-packages/nlopt/_nlopt.cpython-310.so", "start": 104, "end": 528000}, {"filename": "/home/runner/env/lib/python3.10/site-packages/nlopt/nlopt.py", "start": 528044, "end": 543622}]});
  })();
