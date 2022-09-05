
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
      var PACKAGE_NAME = 'ipywidgets-7.7.1-py310h8bed8af_0.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'ipywidgets-7.7.1-py310h8bed8af_0.tar.bz2.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "ipywidgets", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/ipywidgets", "widgets", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "ipywidgets-7.7.1.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":113366,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1322,2254,3015,4332,5671,6878,8114,9453,10795,11862,12976,13990,14914,15943,17074,18069,19207,20606,21587,22616,23584,24808,25958,27252,28344,29469,30708,31738,33113,34340,35721,37072,38172,39320,40633,41625,42840,43771,44647,45886,47098,48299,49371,50737,51302,51905,53122,54479,55792,57016,58240,59626,60826,61769,63088,64170,65134,66085,67234,68293,69401,70410,71559,72758,73902,75045,76180,77511,78671,79788,81032,82131,83117,84184,85292,86449,87601,88679,89910,91225,92488,93823,95102,96247,97290,98204,99452,100318,101593,102873,104092,105368,106431,107738,109061,110331,111284,112457],"sizes":[1322,932,761,1317,1339,1207,1236,1339,1342,1067,1114,1014,924,1029,1131,995,1138,1399,981,1029,968,1224,1150,1294,1092,1125,1239,1030,1375,1227,1381,1351,1100,1148,1313,992,1215,931,876,1239,1212,1201,1072,1366,565,603,1217,1357,1313,1224,1224,1386,1200,943,1319,1082,964,951,1149,1059,1108,1009,1149,1199,1144,1143,1135,1331,1160,1117,1244,1099,986,1067,1108,1157,1152,1078,1231,1315,1263,1335,1279,1145,1043,914,1248,866,1275,1280,1219,1276,1063,1307,1323,1270,953,1173,909],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_ipywidgets-7.7.1-py310h8bed8af_0.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_ipywidgets-7.7.1-py310h8bed8af_0.tar.bz2.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets-7.7.1.dist-info/direct_url.json", "start": 202108, "end": 202217}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/__init__.py", "start": 870, "end": 2507}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/_version.py", "start": 0, "end": 870}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/embed.py", "start": 6069, "end": 17296}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/state.schema.json", "start": 2507, "end": 6069}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/view.schema.json", "start": 17296, "end": 17984}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/__init__.py", "start": 87373, "end": 88885}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/docutils.py", "start": 183197, "end": 183836}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/domwidget.py", "start": 200338, "end": 202108}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/interaction.py", "start": 161405, "end": 182390}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/trait_types.py", "start": 183836, "end": 192424}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/util.py", "start": 161078, "end": 161405}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/valuewidget.py", "start": 54549, "end": 55383}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget.py", "start": 105171, "end": 138962}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_bool.py", "start": 98981, "end": 101883}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_box.py", "start": 83461, "end": 87373}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_button.py", "start": 95347, "end": 98981}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_color.py", "start": 182390, "end": 183197}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_controller.py", "start": 55383, "end": 57703}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_core.py", "start": 52449, "end": 53071}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_date.py", "start": 82322, "end": 83461}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_description.py", "start": 53071, "end": 54549}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_float.py", "start": 147212, "end": 161078}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_int.py", "start": 36671, "end": 47462}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_layout.py", "start": 88885, "end": 95347}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_link.py", "start": 101883, "end": 105171}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_media.py", "start": 192424, "end": 200338}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_output.py", "start": 138962, "end": 144563}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_selection.py", "start": 57703, "end": 82322}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_selectioncontainer.py", "start": 144563, "end": 147212}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_string.py", "start": 47462, "end": 52449}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_style.py", "start": 33568, "end": 34127}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_templates.py", "start": 17984, "end": 33568}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_upload.py", "start": 34127, "end": 36671}]});
  })();
