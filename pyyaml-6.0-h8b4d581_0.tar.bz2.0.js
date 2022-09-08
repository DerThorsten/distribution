
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
      var PACKAGE_NAME = 'pyyaml-6.0-h8b4d581_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'pyyaml-6.0-h8b4d581_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "_yaml", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "PyYAML-6.0.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "yaml", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":97063,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1586,2574,3462,4245,5136,6183,6918,7992,8900,9809,10521,11329,11902,13113,14253,15199,16057,16946,17614,18362,19155,20053,20945,21923,22971,23751,24619,25567,26482,27242,28107,29023,29763,30617,31558,32264,33601,34866,35857,36597,37773,38955,39813,40621,41517,42543,43259,44171,45340,46075,46730,47729,48785,49733,50505,51504,52534,53427,54541,55480,56505,57721,58709,59762,60723,61363,62036,62778,63630,64554,65318,66496,67312,68370,69326,70249,71105,71965,72666,73587,74410,75432,76180,77009,78111,78986,79857,80771,81657,82591,83633,84257,84955,85892,86632,87548,88508,89061,89982,90886,91837,92755,93880,94679,95629,96501],"sizes":[1586,988,888,783,891,1047,735,1074,908,909,712,808,573,1211,1140,946,858,889,668,748,793,898,892,978,1048,780,868,948,915,760,865,916,740,854,941,706,1337,1265,991,740,1176,1182,858,808,896,1026,716,912,1169,735,655,999,1056,948,772,999,1030,893,1114,939,1025,1216,988,1053,961,640,673,742,852,924,764,1178,816,1058,956,923,856,860,701,921,823,1022,748,829,1102,875,871,914,886,934,1042,624,698,937,740,916,960,553,921,904,951,918,1125,799,950,872,562],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pyyaml-6.0-h8b4d581_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_pyyaml-6.0-h8b4d581_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/PyYAML-6.0.dist-info/direct_url.json", "start": 1402, "end": 1507}, {"filename": "/home/runner/env/lib/python3.10/site-packages/_yaml/__init__.py", "start": 0, "end": 1402}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/__init__.py", "start": 134893, "end": 147202}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/composer.py", "start": 18230, "end": 23113}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/constructor.py", "start": 172697, "end": 201336}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/cyaml.py", "start": 23113, "end": 26964}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/dumper.py", "start": 132056, "end": 134893}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/emitter.py", "start": 26964, "end": 69970}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/error.py", "start": 1507, "end": 4040}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/events.py", "start": 205501, "end": 207946}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/loader.py", "start": 216950, "end": 219011}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/nodes.py", "start": 72543, "end": 73983}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/parser.py", "start": 147202, "end": 172697}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/reader.py", "start": 125262, "end": 132056}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/representer.py", "start": 4040, "end": 18230}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/resolver.py", "start": 207946, "end": 216950}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/scanner.py", "start": 73983, "end": 125262}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/serializer.py", "start": 201336, "end": 205501}, {"filename": "/home/runner/env/lib/python3.10/site-packages/yaml/tokens.py", "start": 69970, "end": 72543}]});
  })();
