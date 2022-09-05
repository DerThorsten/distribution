
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
      var PACKAGE_NAME = 'cftime-1.6.0-py310h8a38847_0.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'cftime-1.6.0-py310h8a38847_0.tar.bz2.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "cftime", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "cftime-1.6.0.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":220364,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1274,2486,3912,4993,6002,7011,8018,9020,10030,11074,12267,13570,15043,16330,17582,19031,20501,22008,23188,24118,25091,26028,27210,28293,29203,30028,30959,32098,32789,33634,34819,36247,37573,39115,40208,41446,42795,44082,45556,46905,48265,49710,50915,52193,53510,54885,56352,57170,58252,59426,60709,62086,63502,64898,66299,67287,68527,69754,71235,72700,74137,75438,77032,78515,79849,81242,82718,84109,85622,87035,88385,89775,90814,92244,93520,94890,96285,97865,99185,100008,100842,102225,103685,105175,106563,107834,109239,110688,112052,113453,114953,115874,117283,118633,120030,121373,122573,123890,125260,126645,128045,129441,130994,132414,133871,135012,136248,137525,138879,140138,141488,142810,144106,145529,146711,148162,149585,150764,152174,153647,155063,156453,157913,159176,160464,161659,163017,164490,165872,167293,168480,169893,171297,172791,174168,175539,176913,178249,179473,180699,181939,183182,184507,185737,187108,188582,189946,191271,192765,194009,195167,196339,197371,198763,200119,201494,202861,204268,205392,206485,207582,208652,209226,210511,211871,213299,214705,216102,217451,218810,219827,219852,219877],"sizes":[1274,1212,1426,1081,1009,1009,1007,1002,1010,1044,1193,1303,1473,1287,1252,1449,1470,1507,1180,930,973,937,1182,1083,910,825,931,1139,691,845,1185,1428,1326,1542,1093,1238,1349,1287,1474,1349,1360,1445,1205,1278,1317,1375,1467,818,1082,1174,1283,1377,1416,1396,1401,988,1240,1227,1481,1465,1437,1301,1594,1483,1334,1393,1476,1391,1513,1413,1350,1390,1039,1430,1276,1370,1395,1580,1320,823,834,1383,1460,1490,1388,1271,1405,1449,1364,1401,1500,921,1409,1350,1397,1343,1200,1317,1370,1385,1400,1396,1553,1420,1457,1141,1236,1277,1354,1259,1350,1322,1296,1423,1182,1451,1423,1179,1410,1473,1416,1390,1460,1263,1288,1195,1358,1473,1382,1421,1187,1413,1404,1494,1377,1371,1374,1336,1224,1226,1240,1243,1325,1230,1371,1474,1364,1325,1494,1244,1158,1172,1032,1392,1356,1375,1367,1407,1124,1093,1097,1070,574,1285,1360,1428,1406,1397,1349,1359,1017,25,25,487],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_cftime-1.6.0-py310h8a38847_0.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_cftime-1.6.0-py310h8a38847_0.tar.bz2.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/cftime-1.6.0.dist-info/direct_url.json", "start": 356050, "end": 356160}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cftime/__init__.py", "start": 355409, "end": 356050}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cftime/_cftime.cpython-310.so", "start": 0, "end": 355409}]});
  })();
