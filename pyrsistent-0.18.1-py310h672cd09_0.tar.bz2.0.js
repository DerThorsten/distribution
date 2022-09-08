
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
      var PACKAGE_NAME = 'pyrsistent-0.18.1-py310h672cd09_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'pyrsistent-0.18.1-py310h672cd09_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "pyrsistent", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "pyrsistent-0.18.1.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":87891,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1427,2784,4152,5498,6865,8377,9809,11069,11442,11467,12314,13623,14878,15898,17142,18074,19186,20309,21398,22569,23717,24973,26282,27553,28538,29373,30706,32342,33458,34715,35869,36988,38160,39083,40333,41625,42804,43987,44864,46029,47263,48403,49569,50492,51651,52663,53842,55277,56517,57607,58705,60030,61283,62362,63307,64494,65506,66651,68000,69103,70468,71580,72498,73360,74315,75442,76693,77577,78930,80272,81488,82683,84023,85338,86595,87593],"sizes":[1427,1357,1368,1346,1367,1512,1432,1260,373,25,847,1309,1255,1020,1244,932,1112,1123,1089,1171,1148,1256,1309,1271,985,835,1333,1636,1116,1257,1154,1119,1172,923,1250,1292,1179,1183,877,1165,1234,1140,1166,923,1159,1012,1179,1435,1240,1090,1098,1325,1253,1079,945,1187,1012,1145,1349,1103,1365,1112,918,862,955,1127,1251,884,1353,1342,1216,1195,1340,1315,1257,998,298],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pyrsistent-0.18.1-py310h672cd09_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_pyrsistent-0.18.1-py310h672cd09_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/_pyrsistent_version.py", "start": 21307, "end": 21330}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pvectorc.cpython-310.so", "start": 0, "end": 21307}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent-0.18.1.dist-info/direct_url.json", "start": 155954, "end": 156063}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/__init__.py", "start": 81585, "end": 83064}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_checked_types.py", "start": 21330, "end": 39702}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_field_common.py", "start": 69622, "end": 81585}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_helpers.py", "start": 120460, "end": 123692}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_immutable.py", "start": 141588, "end": 145122}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_pbag.py", "start": 47995, "end": 54725}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_pclass.py", "start": 59920, "end": 69622}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_pdeque.py", "start": 123692, "end": 135895}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_plist.py", "start": 39702, "end": 47995}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_pmap.py", "start": 105758, "end": 120460}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_precord.py", "start": 148922, "end": 155954}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_pset.py", "start": 135895, "end": 141588}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_pvector.py", "start": 83064, "end": 105758}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_toolz.py", "start": 54725, "end": 58153}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/_transformations.py", "start": 145122, "end": 148922}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyrsistent/typing.py", "start": 58153, "end": 59920}]});
  })();
