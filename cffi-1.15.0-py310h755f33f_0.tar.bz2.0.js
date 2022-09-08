
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
      var PACKAGE_NAME = 'cffi-1.15.0-py310h755f33f_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'cffi-1.15.0-py310h755f33f_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "cffi-1.15.0.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "cffi", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":263367,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1379,2703,3893,5314,6370,7557,8750,10184,11641,12999,14511,16010,17448,19042,20450,22114,23788,25321,26981,28531,29997,31600,33183,34516,36068,37646,39042,40421,41952,43588,45111,46650,48030,49587,51273,52946,54552,55966,57386,59015,60499,62150,63718,65265,66701,68246,69460,71003,72417,73846,75179,76625,78078,79372,80709,82150,83661,85229,86746,88109,88798,89836,90964,91217,91242,91661,93002,94332,95482,96492,97417,98611,99792,100846,101831,102904,103878,104985,106137,107321,108306,109315,110366,111170,112182,112845,113624,114600,115555,116523,117503,118489,119444,120383,121467,122413,123450,124439,125447,126505,127701,128784,129993,131035,132171,133437,134635,135651,136898,138061,139322,140480,141569,142887,144066,145393,146516,147893,149023,150217,151309,152344,153294,154360,155638,156827,157821,158698,160009,161177,161988,162807,164020,165108,166134,167176,168192,169312,170369,171703,172639,173693,174623,175818,176909,177926,179001,180087,181161,182382,183471,184495,185593,186556,187636,188616,189853,191085,192078,193296,194178,195156,196233,197408,198448,199625,200618,201690,202874,204042,205042,206264,207267,208464,209676,211087,212250,213501,214742,216045,217272,218483,219812,220779,222050,223111,224150,225095,226182,227204,228210,229265,230369,231364,232353,233415,234433,235518,236376,236945,237554,238669,240040,241430,242380,243631,244908,246173,247278,248471,249495,250604,251578,252467,253636,254612,255649,256641,258035,259153,260265,261304,262184,263213],"sizes":[1379,1324,1190,1421,1056,1187,1193,1434,1457,1358,1512,1499,1438,1594,1408,1664,1674,1533,1660,1550,1466,1603,1583,1333,1552,1578,1396,1379,1531,1636,1523,1539,1380,1557,1686,1673,1606,1414,1420,1629,1484,1651,1568,1547,1436,1545,1214,1543,1414,1429,1333,1446,1453,1294,1337,1441,1511,1568,1517,1363,689,1038,1128,253,25,419,1341,1330,1150,1010,925,1194,1181,1054,985,1073,974,1107,1152,1184,985,1009,1051,804,1012,663,779,976,955,968,980,986,955,939,1084,946,1037,989,1008,1058,1196,1083,1209,1042,1136,1266,1198,1016,1247,1163,1261,1158,1089,1318,1179,1327,1123,1377,1130,1194,1092,1035,950,1066,1278,1189,994,877,1311,1168,811,819,1213,1088,1026,1042,1016,1120,1057,1334,936,1054,930,1195,1091,1017,1075,1086,1074,1221,1089,1024,1098,963,1080,980,1237,1232,993,1218,882,978,1077,1175,1040,1177,993,1072,1184,1168,1000,1222,1003,1197,1212,1411,1163,1251,1241,1303,1227,1211,1329,967,1271,1061,1039,945,1087,1022,1006,1055,1104,995,989,1062,1018,1085,858,569,609,1115,1371,1390,950,1251,1277,1265,1105,1193,1024,1109,974,889,1169,976,1037,992,1394,1118,1112,1039,880,1029,154],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_cffi-1.15.0-py310h755f33f_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_cffi-1.15.0-py310h755f33f_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/_cffi_backend.cpython-310.so", "start": 0, "end": 134592}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi-1.15.0.dist-info/direct_url.json", "start": 134592, "end": 134695}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/__init__.py", "start": 263148, "end": 263661}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/api.py", "start": 221084, "end": 263148}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/backend_ctypes.py", "start": 162256, "end": 204710}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/cffi_opcode.py", "start": 349997, "end": 355721}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/commontypes.py", "start": 368698, "end": 371387}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/cparser.py", "start": 414707, "end": 458938}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/error.py", "start": 134695, "end": 135572}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/ffiplatform.py", "start": 364652, "end": 368698}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/lock.py", "start": 220337, "end": 221084}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/model.py", "start": 263661, "end": 285429}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/pkgconfig.py", "start": 215963, "end": 220337}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/recompiler.py", "start": 285429, "end": 349997}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/setuptools_ext.py", "start": 355721, "end": 364652}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/vengine_cpy.py", "start": 371387, "end": 414707}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/vengine_gen.py", "start": 135572, "end": 162256}, {"filename": "/home/runner/env/lib/python3.10/site-packages/cffi/verifier.py", "start": 204710, "end": 215963}]});
  })();
