
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
      var PACKAGE_NAME = 'ipywidgets-8.0.1-py310h8bed8af_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'ipywidgets-8.0.1-py310h8bed8af_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "ipywidgets-8.0.1.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":127159,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1311,2287,3468,4872,6082,7309,8736,10019,11372,12472,13559,14313,15381,16399,17453,18512,19606,20816,22213,23581,24426,25336,26286,27547,28719,29993,30986,31785,33021,34159,35078,36259,37473,38605,39666,41009,42377,43516,44485,45849,46951,48206,49237,50153,51339,52622,53766,54845,55991,57419,57957,58563,59739,60754,62074,63057,64207,65485,66681,67887,69025,70326,71434,72325,73271,74356,75369,76438,77511,78637,79802,81026,82156,83402,84748,85764,86820,88103,89208,90416,91152,92047,93188,94377,95501,96593,97827,99174,100438,101738,103005,104161,105133,106085,107273,108197,109550,110913,112152,113375,114434,115507,116702,117806,119156,120403,121718,122791,124152,125138,126332],"sizes":[1311,976,1181,1404,1210,1227,1427,1283,1353,1100,1087,754,1068,1018,1054,1059,1094,1210,1397,1368,845,910,950,1261,1172,1274,993,799,1236,1138,919,1181,1214,1132,1061,1343,1368,1139,969,1364,1102,1255,1031,916,1186,1283,1144,1079,1146,1428,538,606,1176,1015,1320,983,1150,1278,1196,1206,1138,1301,1108,891,946,1085,1013,1069,1073,1126,1165,1224,1130,1246,1346,1016,1056,1283,1105,1208,736,895,1141,1189,1124,1092,1234,1347,1264,1300,1267,1156,972,952,1188,924,1353,1363,1239,1223,1059,1073,1195,1104,1350,1247,1315,1073,1361,986,1194,827],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_ipywidgets-8.0.1-py310h8bed8af_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_ipywidgets-8.0.1-py310h8bed8af_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets-8.0.1.dist-info/direct_url.json", "start": 228699, "end": 228813}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/__init__.py", "start": 610, "end": 2302}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/_version.py", "start": 0, "end": 610}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/embed.py", "start": 5185, "end": 16443}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/state.schema.json", "start": 2302, "end": 5185}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/view.schema.json", "start": 16443, "end": 17038}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/__init__.py", "start": 99383, "end": 101071}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/docutils.py", "start": 199167, "end": 199806}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/domwidget.py", "start": 226409, "end": 228699}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/interaction.py", "start": 178007, "end": 198360}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/trait_types.py", "start": 199806, "end": 214637}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/valuewidget.py", "start": 65842, "end": 66659}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget.py", "start": 120295, "end": 152139}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_bool.py", "start": 112259, "end": 116587}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_box.py", "start": 95652, "end": 99383}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_button.py", "start": 108138, "end": 112259}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_color.py", "start": 198360, "end": 199167}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_controller.py", "start": 66659, "end": 68979}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_core.py", "start": 62908, "end": 63530}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_date.py", "start": 93200, "end": 95652}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_datetime.py", "start": 222420, "end": 226409}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_description.py", "start": 63530, "end": 65842}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_float.py", "start": 162979, "end": 178007}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_int.py", "start": 40375, "end": 52500}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_layout.py", "start": 101071, "end": 108138}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_link.py", "start": 116587, "end": 120295}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_media.py", "start": 214637, "end": 222420}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_output.py", "start": 152139, "end": 158781}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_selection.py", "start": 68979, "end": 93200}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_selectioncontainer.py", "start": 158781, "end": 162979}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_string.py", "start": 52500, "end": 59410}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_style.py", "start": 35179, "end": 35738}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_tagsinput.py", "start": 59410, "end": 62908}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_templates.py", "start": 17038, "end": 32545}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_time.py", "start": 32545, "end": 35179}, {"filename": "/home/runner/env/lib/python3.10/site-packages/ipywidgets/widgets/widget_upload.py", "start": 35738, "end": 40375}]});
  })();
