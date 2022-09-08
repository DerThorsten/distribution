
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
      var PACKAGE_NAME = 'bokeh-2.4.2-py310h8b4d581_0.tar.bz2.4.data';
      var REMOTE_PACKAGE_BASE = 'bokeh-2.4.2-py310h8b4d581_0.tar.bz2.4.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "bokeh", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh", "util", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh", "server", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh/server", "static", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh/server/static", "js", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh/server/static/js", "compiler", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh", "sampledata", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh/sampledata", "_data", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "bokeh-2.4.2.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":53282,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1554,3089,4637,6196,7745,9319,10892,12448,14013,15571,17142,18696,20257,21835,23396,25001,26067,27676,29198,30625,31931,33525,35089,36431,37750,39155,40736,42330,43841,45387,46598,47558,48246,48761,49309,49844,50433,51095,51791,52374,53080],"sizes":[1554,1535,1548,1559,1549,1574,1573,1556,1565,1558,1571,1554,1561,1578,1561,1605,1066,1609,1522,1427,1306,1594,1564,1342,1319,1405,1581,1594,1511,1546,1211,960,688,515,548,535,589,662,696,583,706,202],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_bokeh-2.4.2-py310h8b4d581_0.tar.bz2.4.data');
      };
      Module['addRunDependency']('datafile_bokeh-2.4.2-py310h8b4d581_0.tar.bz2.4.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh-2.4.2.dist-info/direct_url.json", "start": 84102, "end": 84206}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/_sri.json", "start": 0, "end": 61109}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sampledata/_data/les_mis.json", "start": 63936, "end": 75472}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sampledata/_data/olympics2014.json", "start": 75472, "end": 84102}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/server/static/js/compiler/tsconfig.ext.json", "start": 62892, "end": 63936}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/util/sampledata.json", "start": 61109, "end": 62892}]});
  })();
