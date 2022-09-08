
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
      var PACKAGE_NAME = 'scipy-1.8.1-py310h7c23efa_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'scipy-1.8.1-py310h7c23efa_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "scipy", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/scipy", "cluster", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":397823,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1284,2875,4205,5453,6580,7704,8873,9915,11122,12193,13314,14530,15566,16841,17848,19121,20603,21896,22934,23860,25045,26330,27679,28878,30275,31457,32573,33830,35110,36334,37508,38413,39771,40715,41782,42727,43953,45025,45920,47115,48409,49603,50673,51781,53068,54506,55947,57201,58213,59504,60710,62041,63275,64527,65802,67197,68538,69536,70565,71546,72733,73855,74842,75992,77193,78511,79634,80440,81727,82662,83963,85082,86522,87855,89110,90352,91355,92359,93577,94956,95755,96977,98163,99441,100472,101904,103423,104879,106325,107830,109192,110657,112010,113475,114975,116402,117810,119366,120772,122259,123722,125274,126732,128272,129736,131214,132630,134333,135829,137258,138775,140417,141969,143443,144965,146320,147791,149097,150564,151799,152964,154369,155606,156846,158408,159803,160940,162305,163634,164983,165968,167403,168892,170247,171900,173384,174944,176424,177907,179082,180440,181481,182779,184144,185510,186657,187526,188454,188984,190273,191564,192930,194009,195013,196015,197060,198222,199525,201196,202614,203930,205368,206772,208033,209543,211004,212612,214114,215726,217125,218336,219261,220347,221633,222727,223931,225192,225841,227235,228694,230144,231589,233066,234521,236021,237400,238818,239950,241395,242966,244552,245984,247511,248869,250450,251864,253506,254847,256292,257731,259253,260607,262068,263551,265078,266599,267933,269270,270893,272405,273680,275301,276915,278041,279423,280745,282083,283292,284723,286047,287472,288907,290281,291811,293108,294499,295863,297293,298860,300372,301643,302974,304431,305725,307145,308708,310131,311657,313039,314514,315933,317426,318914,320390,321758,322953,324184,325198,326368,327817,329301,330590,331608,332668,333661,334366,335137,336127,336937,337122,338075,339363,340689,341901,343133,344633,346096,347726,349010,350421,351809,353189,354588,355912,357313,358768,360381,361915,363478,364725,366027,367338,368892,370401,371960,373437,374870,376182,377323,377984,379306,380828,382301,383669,384961,386324,387699,389037,390279,391601,392758,394119,395453,396806],"sizes":[1284,1591,1330,1248,1127,1124,1169,1042,1207,1071,1121,1216,1036,1275,1007,1273,1482,1293,1038,926,1185,1285,1349,1199,1397,1182,1116,1257,1280,1224,1174,905,1358,944,1067,945,1226,1072,895,1195,1294,1194,1070,1108,1287,1438,1441,1254,1012,1291,1206,1331,1234,1252,1275,1395,1341,998,1029,981,1187,1122,987,1150,1201,1318,1123,806,1287,935,1301,1119,1440,1333,1255,1242,1003,1004,1218,1379,799,1222,1186,1278,1031,1432,1519,1456,1446,1505,1362,1465,1353,1465,1500,1427,1408,1556,1406,1487,1463,1552,1458,1540,1464,1478,1416,1703,1496,1429,1517,1642,1552,1474,1522,1355,1471,1306,1467,1235,1165,1405,1237,1240,1562,1395,1137,1365,1329,1349,985,1435,1489,1355,1653,1484,1560,1480,1483,1175,1358,1041,1298,1365,1366,1147,869,928,530,1289,1291,1366,1079,1004,1002,1045,1162,1303,1671,1418,1316,1438,1404,1261,1510,1461,1608,1502,1612,1399,1211,925,1086,1286,1094,1204,1261,649,1394,1459,1450,1445,1477,1455,1500,1379,1418,1132,1445,1571,1586,1432,1527,1358,1581,1414,1642,1341,1445,1439,1522,1354,1461,1483,1527,1521,1334,1337,1623,1512,1275,1621,1614,1126,1382,1322,1338,1209,1431,1324,1425,1435,1374,1530,1297,1391,1364,1430,1567,1512,1271,1331,1457,1294,1420,1563,1423,1526,1382,1475,1419,1493,1488,1476,1368,1195,1231,1014,1170,1449,1484,1289,1018,1060,993,705,771,990,810,185,953,1288,1326,1212,1232,1500,1463,1630,1284,1411,1388,1380,1399,1324,1401,1455,1613,1534,1563,1247,1302,1311,1554,1509,1559,1477,1433,1312,1141,661,1322,1522,1473,1368,1292,1363,1375,1338,1242,1322,1157,1361,1334,1353,1017],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_scipy-1.8.1-py310h7c23efa_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_scipy-1.8.1-py310h7c23efa_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/scipy/cluster/__init__.py", "start": 594031, "end": 594902}, {"filename": "/home/runner/env/lib/python3.10/site-packages/scipy/cluster/_hierarchy.cpython-310.so", "start": 304496, "end": 533059}, {"filename": "/home/runner/env/lib/python3.10/site-packages/scipy/cluster/_optimal_leaf_ordering.cpython-310.so", "start": 148439, "end": 304496}, {"filename": "/home/runner/env/lib/python3.10/site-packages/scipy/cluster/_vq.cpython-310.so", "start": 533059, "end": 593234}, {"filename": "/home/runner/env/lib/python3.10/site-packages/scipy/cluster/hierarchy.py", "start": 0, "end": 148439}, {"filename": "/home/runner/env/lib/python3.10/site-packages/scipy/cluster/setup.py", "start": 593234, "end": 594031}, {"filename": "/home/runner/env/lib/python3.10/site-packages/scipy/cluster/vq.py", "start": 594902, "end": 624152}]});
  })();
