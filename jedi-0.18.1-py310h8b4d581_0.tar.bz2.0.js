
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
      var PACKAGE_NAME = 'jedi-0.18.1-py310h8b4d581_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'jedi-0.18.1-py310h8b4d581_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "jedi", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/jedi", "plugins", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/jedi", "api", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/jedi/api", "refactoring", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/jedi", "inference", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/jedi/inference", "value", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/jedi/inference", "compiled", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled", "subprocess", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/jedi/inference", "gradual", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "jedi-0.18.1.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":443175,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1342,2669,3906,4923,6191,7464,8905,10089,11364,12587,13683,14980,16202,17755,19146,20416,21627,22577,23733,24898,25967,27157,28426,29660,30743,31943,33308,34359,35563,36758,37812,38932,39990,41182,42331,43484,44583,45653,47006,48045,49042,50116,51389,52728,53871,54815,55844,56971,58218,59444,60779,62119,63381,64665,65713,66893,68044,68891,70208,71547,72848,73932,74975,76246,77792,79146,80369,81618,82915,84021,85312,86518,87783,88936,90131,91042,92396,93675,95211,96342,97488,98750,100012,101214,102076,103254,104540,105707,106945,108138,109419,110569,111456,112593,113721,114947,116113,117303,118421,119470,120672,121715,122755,123968,125157,126281,127584,128679,129881,131099,132318,133499,134911,136235,137510,138685,139854,141259,142678,143764,144934,146137,147330,148455,149633,150917,152103,153283,154310,155542,156566,157572,158686,159828,161284,162485,163713,164991,166047,166968,167884,168871,169849,170922,172222,173612,174721,175929,176868,177958,179174,180283,181444,182479,183429,184507,185876,187277,188572,189891,191124,192203,193470,194767,196049,197077,198333,199535,200672,201918,203221,204131,205247,206333,207676,208881,210139,211326,212582,213770,214862,215985,217165,218322,219583,220845,222273,223429,224511,225859,227181,228527,229569,230882,232093,233244,234341,235482,236577,237546,238760,239936,241302,242440,243510,244532,245690,246899,247943,249118,250289,251672,252947,254207,255516,256974,258554,259695,260838,262098,263207,264282,265455,266459,267789,268839,270034,270968,272083,273353,274685,275659,276646,277974,279271,280566,281691,282763,283731,284941,286134,287351,288205,289324,290698,291849,292979,294179,295149,296373,297502,298587,299767,300958,302108,303441,304676,305664,306776,307893,308932,310193,311218,312464,313468,314501,315771,316948,318023,318908,320050,321158,322395,323580,324788,325809,326794,327899,329005,330179,331316,332460,333658,334959,336067,337346,338448,339584,340948,342024,343278,344222,345323,346314,347253,348455,349707,350838,351883,352986,354330,355458,356576,357733,359262,360455,361682,362932,364261,365381,366281,367338,368521,369702,370852,371949,373184,374019,375103,376206,377240,378292,379241,380299,381665,382884,384118,385291,386462,387749,389070,390260,391681,392865,393954,395061,396229,397258,398492,399829,400997,402197,403400,404627,405729,406927,407938,408988,410101,411193,412257,413267,414455,415558,416681,417871,418946,419970,420926,422156,423182,424439,425643,426822,427999,429198,430375,431666,432744,433978,434995,436200,437452,438431,439393,440546,441602,442602],"sizes":[1342,1327,1237,1017,1268,1273,1441,1184,1275,1223,1096,1297,1222,1553,1391,1270,1211,950,1156,1165,1069,1190,1269,1234,1083,1200,1365,1051,1204,1195,1054,1120,1058,1192,1149,1153,1099,1070,1353,1039,997,1074,1273,1339,1143,944,1029,1127,1247,1226,1335,1340,1262,1284,1048,1180,1151,847,1317,1339,1301,1084,1043,1271,1546,1354,1223,1249,1297,1106,1291,1206,1265,1153,1195,911,1354,1279,1536,1131,1146,1262,1262,1202,862,1178,1286,1167,1238,1193,1281,1150,887,1137,1128,1226,1166,1190,1118,1049,1202,1043,1040,1213,1189,1124,1303,1095,1202,1218,1219,1181,1412,1324,1275,1175,1169,1405,1419,1086,1170,1203,1193,1125,1178,1284,1186,1180,1027,1232,1024,1006,1114,1142,1456,1201,1228,1278,1056,921,916,987,978,1073,1300,1390,1109,1208,939,1090,1216,1109,1161,1035,950,1078,1369,1401,1295,1319,1233,1079,1267,1297,1282,1028,1256,1202,1137,1246,1303,910,1116,1086,1343,1205,1258,1187,1256,1188,1092,1123,1180,1157,1261,1262,1428,1156,1082,1348,1322,1346,1042,1313,1211,1151,1097,1141,1095,969,1214,1176,1366,1138,1070,1022,1158,1209,1044,1175,1171,1383,1275,1260,1309,1458,1580,1141,1143,1260,1109,1075,1173,1004,1330,1050,1195,934,1115,1270,1332,974,987,1328,1297,1295,1125,1072,968,1210,1193,1217,854,1119,1374,1151,1130,1200,970,1224,1129,1085,1180,1191,1150,1333,1235,988,1112,1117,1039,1261,1025,1246,1004,1033,1270,1177,1075,885,1142,1108,1237,1185,1208,1021,985,1105,1106,1174,1137,1144,1198,1301,1108,1279,1102,1136,1364,1076,1254,944,1101,991,939,1202,1252,1131,1045,1103,1344,1128,1118,1157,1529,1193,1227,1250,1329,1120,900,1057,1183,1181,1150,1097,1235,835,1084,1103,1034,1052,949,1058,1366,1219,1234,1173,1171,1287,1321,1190,1421,1184,1089,1107,1168,1029,1234,1337,1168,1200,1203,1227,1102,1198,1011,1050,1113,1092,1064,1010,1188,1103,1123,1190,1075,1024,956,1230,1026,1257,1204,1179,1177,1199,1177,1291,1078,1234,1017,1205,1252,979,962,1153,1056,1000,573],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_jedi-0.18.1-py310h8b4d581_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_jedi-0.18.1-py310h8b4d581_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/jedi-0.18.1.dist-info/direct_url.json", "start": 774828, "end": 774931}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/__init__.py", "start": 12131, "end": 13617}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/__main__.py", "start": 28043, "end": 29993}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/_compatibility.py", "start": 668, "end": 1586}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/__init__.py", "start": 128590, "end": 159861}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/classes.py", "start": 165381, "end": 195018}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/completion.py", "start": 195018, "end": 222209}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/completion_cache.py", "start": 164427, "end": 165381}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/environment.py", "start": 224624, "end": 241580}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/errors.py", "start": 103821, "end": 105074}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/exceptions.py", "start": 241580, "end": 242571}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/file_name.py", "start": 122970, "end": 128590}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/helpers.py", "start": 84877, "end": 103821}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/interpreter.py", "start": 222209, "end": 224624}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/keywords.py", "start": 121687, "end": 122970}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/project.py", "start": 105074, "end": 121687}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/refactoring/__init__.py", "start": 256504, "end": 265324}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/refactoring/extract.py", "start": 242571, "end": 256504}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/replstartup.py", "start": 159861, "end": 160811}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/api/strings.py", "start": 160811, "end": 164427}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/cache.py", "start": 29993, "end": 33667}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/common.py", "start": 0, "end": 668}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/debug.py", "start": 8627, "end": 12131}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/file_io.py", "start": 6290, "end": 8627}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/__init__.py", "start": 441642, "end": 450083}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/analysis.py", "start": 337974, "end": 345737}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/arguments.py", "start": 478754, "end": 490972}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/base_value.py", "start": 450083, "end": 468304}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/cache.py", "start": 511580, "end": 515771}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled/__init__.py", "start": 626419, "end": 629070}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled/access.py", "start": 629070, "end": 647512}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled/getattr_static.py", "start": 668038, "end": 671900}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled/mixed.py", "start": 615064, "end": 626419}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled/subprocess/__init__.py", "start": 680566, "end": 694056}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled/subprocess/__main__.py", "start": 694056, "end": 695223}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled/subprocess/functions.py", "start": 671900, "end": 680566}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/compiled/value.py", "start": 647512, "end": 668038}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/context.py", "start": 280709, "end": 297873}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/docstring_utils.py", "start": 331889, "end": 332648}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/docstrings.py", "start": 431818, "end": 441642}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/dynamic_params.py", "start": 323767, "end": 331889}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/filters.py", "start": 419325, "end": 431818}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/finder.py", "start": 332648, "end": 337974}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/flow_analysis.py", "start": 270183, "end": 274766}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/__init__.py", "start": 736674, "end": 736817}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/annotation.py", "start": 740956, "end": 756888}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/base.py", "start": 696370, "end": 711924}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/conversion.py", "start": 729073, "end": 736674}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/generics.py", "start": 756888, "end": 760032}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/stub_value.py", "start": 771499, "end": 774828}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/type_var.py", "start": 736817, "end": 740956}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/typeshed.py", "start": 760032, "end": 771499}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/typing.py", "start": 711924, "end": 729073}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/gradual/utils.py", "start": 695223, "end": 696370}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/helpers.py", "start": 274766, "end": 280709}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/imports.py", "start": 391311, "end": 414393}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/lazy_value.py", "start": 499058, "end": 500725}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/names.py", "start": 297873, "end": 321061}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/param.py", "start": 468304, "end": 478754}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/parser_cache.py", "start": 490972, "end": 491163}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/recursion.py", "start": 414393, "end": 419325}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/references.py", "start": 500725, "end": 511580}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/signature.py", "start": 265324, "end": 270183}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/star_args.py", "start": 491163, "end": 499058}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/syntax_tree.py", "start": 345737, "end": 381093}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/sys_path.py", "start": 381093, "end": 391311}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/utils.py", "start": 321061, "end": 323767}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/__init__.py", "start": 571806, "end": 572222}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/decorator.py", "start": 572222, "end": 573429}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/dynamic_arrays.py", "start": 590114, "end": 597640}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/function.py", "start": 597640, "end": 615064}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/instance.py", "start": 549295, "end": 571806}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/iterable.py", "start": 523889, "end": 547194}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/klass.py", "start": 573429, "end": 590114}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/module.py", "start": 515771, "end": 523889}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/inference/value/namespace.py", "start": 547194, "end": 549295}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/parser_utils.py", "start": 13617, "end": 24517}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/plugins/__init__.py", "start": 41704, "end": 43149}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/plugins/django.py", "start": 73982, "end": 84877}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/plugins/flask.py", "start": 43149, "end": 44065}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/plugins/pytest.py", "start": 33667, "end": 41397}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/plugins/registry.py", "start": 41397, "end": 41704}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/plugins/stdlib.py", "start": 44065, "end": 73982}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/settings.py", "start": 24517, "end": 28043}, {"filename": "/home/runner/env/lib/python3.10/site-packages/jedi/utils.py", "start": 1586, "end": 6290}]});
  })();
