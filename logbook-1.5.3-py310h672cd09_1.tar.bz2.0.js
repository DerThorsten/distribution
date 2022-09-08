
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
      var PACKAGE_NAME = 'logbook-1.5.3-py310h672cd09_1.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'logbook-1.5.3-py310h672cd09_1.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "Logbook-1.5.3.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "logbook", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":130982,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1319,2595,3560,4771,6076,7166,8283,9466,10565,11610,12855,14053,15001,16384,17636,18906,19922,20907,22228,23509,24868,26136,27384,28658,29393,30495,31348,32389,33446,34711,35979,37340,38526,39846,41197,42493,43685,44895,46133,47304,48522,49533,50679,52062,53281,54480,55542,56820,58174,58902,59905,60576,61911,63042,64116,65075,66347,67384,68544,69456,70350,71520,72553,73505,74830,76113,77308,78597,79842,81058,82288,83541,84684,85969,87083,88166,89286,90713,91798,93192,94466,95808,97133,98429,99472,100742,101835,103115,104295,105263,106386,107725,108907,110059,111109,112349,112912,113801,115302,116416,117675,118924,119920,121063,122257,123319,124326,125421,126473,127887,129150,130412],"sizes":[1319,1276,965,1211,1305,1090,1117,1183,1099,1045,1245,1198,948,1383,1252,1270,1016,985,1321,1281,1359,1268,1248,1274,735,1102,853,1041,1057,1265,1268,1361,1186,1320,1351,1296,1192,1210,1238,1171,1218,1011,1146,1383,1219,1199,1062,1278,1354,728,1003,671,1335,1131,1074,959,1272,1037,1160,912,894,1170,1033,952,1325,1283,1195,1289,1245,1216,1230,1253,1143,1285,1114,1083,1120,1427,1085,1394,1274,1342,1325,1296,1043,1270,1093,1280,1180,968,1123,1339,1182,1152,1050,1240,563,889,1501,1114,1259,1249,996,1143,1194,1062,1007,1095,1052,1414,1263,1262,570],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_logbook-1.5.3-py310h672cd09_1.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_logbook-1.5.3-py310h672cd09_1.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/Logbook-1.5.3.dist-info/direct_url.json", "start": 0, "end": 106}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/__init__.py", "start": 107077, "end": 108849}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/__version__.py", "start": 21663, "end": 21685}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/_fallback.py", "start": 98965, "end": 107077}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/_termcolors.py", "start": 106, "end": 1244}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/base.py", "start": 27468, "end": 68812}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/compat.py", "start": 88588, "end": 98965}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/concurrency.py", "start": 108849, "end": 115106}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/handlers.py", "start": 159000, "end": 230534}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/helpers.py", "start": 1244, "end": 9628}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/more.py", "start": 68812, "end": 88588}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/notifiers.py", "start": 9628, "end": 21663}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/queues.py", "start": 134337, "end": 159000}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/ticketing.py", "start": 115106, "end": 134337}, {"filename": "/home/runner/env/lib/python3.10/site-packages/logbook/utils.py", "start": 21685, "end": 27468}]});
  })();
