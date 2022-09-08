
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
      var PACKAGE_NAME = 'zarr-2.10.3-h8bed8af_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'zarr-2.10.3-h8bed8af_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "zarr", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/zarr", "_storage", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "zarr-0.0.0.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":208287,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1281,2543,3617,4788,5838,6846,7701,8715,9549,10580,11728,12787,13950,15070,15883,16405,16872,18070,19291,20390,21406,22732,23964,25052,26133,27280,28305,29614,30917,31956,32893,34077,35195,36313,37442,38550,39642,40810,41911,42929,43976,45058,46149,47030,48034,49247,50384,51734,52498,53435,54425,55845,57023,57809,58764,59737,60771,61679,62669,63396,64440,65512,66625,68067,69208,70247,71370,72679,73570,74641,75969,77266,78092,78968,80307,81665,82929,84085,85036,86351,87561,88511,89562,90862,92018,93269,94642,95760,96878,97935,99264,100683,101851,103022,104346,105612,106569,107645,108668,109739,110984,112020,113205,114311,115557,116820,118319,119613,120911,122062,123263,124446,125668,126796,127796,129081,130167,131371,132382,133627,134674,135963,137029,138111,139251,139967,141290,142569,143851,145114,146276,147395,148650,149804,151023,151835,152957,154105,155403,156746,158150,159525,160741,161735,162724,163742,164694,165878,166989,167919,169130,170122,171190,172255,173376,174481,175711,176927,178116,179131,180308,181452,182383,183509,184695,185773,186998,187890,188954,189941,191034,192005,193069,194267,195494,196532,197662,198858,199966,201124,202128,203403,204760,205906,206974,207913],"sizes":[1281,1262,1074,1171,1050,1008,855,1014,834,1031,1148,1059,1163,1120,813,522,467,1198,1221,1099,1016,1326,1232,1088,1081,1147,1025,1309,1303,1039,937,1184,1118,1118,1129,1108,1092,1168,1101,1018,1047,1082,1091,881,1004,1213,1137,1350,764,937,990,1420,1178,786,955,973,1034,908,990,727,1044,1072,1113,1442,1141,1039,1123,1309,891,1071,1328,1297,826,876,1339,1358,1264,1156,951,1315,1210,950,1051,1300,1156,1251,1373,1118,1118,1057,1329,1419,1168,1171,1324,1266,957,1076,1023,1071,1245,1036,1185,1106,1246,1263,1499,1294,1298,1151,1201,1183,1222,1128,1000,1285,1086,1204,1011,1245,1047,1289,1066,1082,1140,716,1323,1279,1282,1263,1162,1119,1255,1154,1219,812,1122,1148,1298,1343,1404,1375,1216,994,989,1018,952,1184,1111,930,1211,992,1068,1065,1121,1105,1230,1216,1189,1015,1177,1144,931,1126,1186,1078,1225,892,1064,987,1093,971,1064,1198,1227,1038,1130,1196,1108,1158,1004,1275,1357,1146,1068,939,374],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_zarr-2.10.3-h8bed8af_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_zarr-2.10.3-h8bed8af_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/zarr-0.0.0.dist-info/direct_url.json", "start": 381379, "end": 381482}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/__init__.py", "start": 126827, "end": 127925}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/_storage/__init__.py", "start": 381379, "end": 381379}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/_storage/absstore.py", "start": 374127, "end": 381379}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/attrs.py", "start": 236994, "end": 240863}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/codecs.py", "start": 236836, "end": 236994}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/convenience.py", "start": 247819, "end": 288995}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/core.py", "start": 288995, "end": 374127}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/creation.py", "start": 43298, "end": 63612}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/errors.py", "start": 41449, "end": 43298}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/hierarchy.py", "start": 1191, "end": 41449}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/indexing.py", "start": 63612, "end": 95879}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/meta.py", "start": 240863, "end": 247675}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/meta_v1.py", "start": 127925, "end": 129580}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/n5.py", "start": 95879, "end": 126827}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/storage.py", "start": 129580, "end": 217140}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/sync.py", "start": 0, "end": 1191}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/util.py", "start": 217140, "end": 236836}, {"filename": "/home/runner/env/lib/python3.10/site-packages/zarr/version.py", "start": 247675, "end": 247819}]});
  })();
