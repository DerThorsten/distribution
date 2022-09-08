
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
      var PACKAGE_NAME = 'cftime-1.6.0-py310he1922d0_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'cftime-1.6.0-py310he1922d0_0.tar.bz2.0.data';
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
        var compressedData = {"data":null,"cachedOffset":221644,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1285,2488,3945,5034,6050,7058,8066,9070,10083,11115,12318,13563,15044,16246,17576,19113,20617,22176,23290,24258,25283,26154,27332,28382,29320,30150,31096,32221,32922,33744,34939,36354,37787,39101,40317,41446,42675,43814,45220,46532,47918,49333,50845,52112,53526,54777,55901,57430,58552,59360,60614,61956,63123,64506,65893,67185,68008,69243,70534,72042,73417,74885,76243,77832,79350,80943,82127,83534,84899,86416,87852,89185,90478,91431,92780,94113,95484,96898,98404,99880,101200,102043,102881,104040,105382,106732,108170,109610,110875,112280,113688,115170,116207,117534,118846,120290,121615,122870,124085,125326,126825,128153,129344,130901,132321,133638,135162,136231,137413,138671,139857,141061,142412,143677,144917,146159,147513,148936,150067,151399,152856,154279,155667,157070,158258,159597,160771,162170,163669,164961,166313,167634,168891,170366,171874,173223,174640,175844,177159,178434,179548,180857,182190,183480,184905,186229,187477,188740,190092,191421,192727,194239,195374,196421,197661,198867,200305,201668,203015,204494,205753,206899,207956,209037,210001,210816,212090,213446,214932,216265,217669,219042,220400,221114,221139,221164],"sizes":[1285,1203,1457,1089,1016,1008,1008,1004,1013,1032,1203,1245,1481,1202,1330,1537,1504,1559,1114,968,1025,871,1178,1050,938,830,946,1125,701,822,1195,1415,1433,1314,1216,1129,1229,1139,1406,1312,1386,1415,1512,1267,1414,1251,1124,1529,1122,808,1254,1342,1167,1383,1387,1292,823,1235,1291,1508,1375,1468,1358,1589,1518,1593,1184,1407,1365,1517,1436,1333,1293,953,1349,1333,1371,1414,1506,1476,1320,843,838,1159,1342,1350,1438,1440,1265,1405,1408,1482,1037,1327,1312,1444,1325,1255,1215,1241,1499,1328,1191,1557,1420,1317,1524,1069,1182,1258,1186,1204,1351,1265,1240,1242,1354,1423,1131,1332,1457,1423,1388,1403,1188,1339,1174,1399,1499,1292,1352,1321,1257,1475,1508,1349,1417,1204,1315,1275,1114,1309,1333,1290,1425,1324,1248,1263,1352,1329,1306,1512,1135,1047,1240,1206,1438,1363,1347,1479,1259,1146,1057,1081,964,815,1274,1356,1486,1333,1404,1373,1358,714,25,25,480],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_cftime-1.6.0-py310he1922d0_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_cftime-1.6.0-py310he1922d0_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/cftime-1.6.0.dist-info/direct_url.json", "start": 361734, "end": 361839}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cftime/__init__.py", "start": 361093, "end": 361734}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cftime/_cftime.cpython-310.so", "start": 0, "end": 361093}]});
  })();
