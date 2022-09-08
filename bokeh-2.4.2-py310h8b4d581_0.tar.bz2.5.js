
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
      var PACKAGE_NAME = 'bokeh-2.4.2-py310h8b4d581_0.tar.bz2.5.data';
      var REMOTE_PACKAGE_BASE = 'bokeh-2.4.2-py310h8b4d581_0.tar.bz2.5.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh", "core", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh/core", "_templates", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh", "sphinxext", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext", "_templates", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh", "server", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/bokeh/server", "views", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":11068,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1376,2340,3794,5080,6445,7513,8474,9530,10428],"sizes":[1376,964,1454,1286,1365,1068,961,1056,898,640],"successes":[1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_bokeh-2.4.2-py310h8b4d581_0.tar.bz2.5.data');
      };
      Module['addRunDependency']('datafile_bokeh-2.4.2-py310h8b4d581_0.tar.bz2.5.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/autoload_request_tag.html", "start": 4403, "end": 5795}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/autoload_tag.html", "start": 49, "end": 863}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/css_resources.html", "start": 3789, "end": 4256}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/file.html", "start": 5795, "end": 7276}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/js_resources.html", "start": 7276, "end": 7860}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/macros.html", "start": 4256, "end": 4403}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/notebook_load.html", "start": 1220, "end": 3569}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/plot_div.html", "start": 863, "end": 1220}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/root_div.html", "start": 0, "end": 49}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/core/_templates/script_tag.html", "start": 3569, "end": 3789}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/server/views/app_index.html", "start": 12995, "end": 20028}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext/_templates/bokehjs_codepen_init.html", "start": 8724, "end": 11332}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext/_templates/bokehjs_content_epilogue.html", "start": 8341, "end": 8724}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext/_templates/bokehjs_content_prologue.html", "start": 12420, "end": 12515}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext/_templates/bokehjs_html_template.html", "start": 12515, "end": 12995}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext/_templates/color_detail.html", "start": 11332, "end": 11536}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext/_templates/palette_detail.html", "start": 12177, "end": 12420}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext/_templates/palette_group_detail.html", "start": 7860, "end": 8341}, {"filename": "/home/runner/env/lib/python3.10/site-packages/bokeh/sphinxext/_templates/sri_table.html", "start": 11536, "end": 12177}]});
  })();
