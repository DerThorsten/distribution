
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
      var PACKAGE_NAME = 'setuptools-63.4.2-py310h8bed8af_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'setuptools-63.4.2-py310h8bed8af_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "pkg_resources", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources", "_vendor", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor", "jaraco", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco", "text", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor", "packaging", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor", "importlib_resources", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor", "more_itertools", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor", "pyparsing", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing", "diagram", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pkg_resources", "extern", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":473748,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1319,2631,4103,5326,6605,7949,9089,10111,11325,12490,13767,15074,16107,17398,18517,19775,20943,22169,23273,24421,25798,27182,28469,29517,30531,31498,32806,34101,35319,36373,37467,38677,39934,41009,42244,43574,44751,45926,47179,48431,49662,50898,51929,53245,54444,55620,56710,57819,59152,60438,61667,63044,64461,65624,66853,68249,69251,70741,71985,73316,74544,75896,77185,78476,79861,81221,82094,83219,84397,85675,86890,88030,89314,90659,91918,93151,94409,95678,96888,97994,99514,100936,101959,103222,104274,105440,106733,107891,108844,110300,111580,112909,113997,115118,116347,117277,118454,119850,121263,122586,123677,124901,126025,127278,128405,129486,130720,131603,132750,133573,134752,135636,136576,137820,139024,140004,141155,142205,143396,144255,145720,147154,148219,149562,150864,152063,153288,153927,155326,156367,157134,158330,159557,160757,162051,163077,164149,165222,166377,167501,168519,169752,171068,172405,173617,174981,176198,177230,178445,179500,180834,182314,183470,184582,185804,186881,188138,189473,190879,192051,193236,194591,195837,197124,198393,199253,200418,201768,203057,204358,205638,206911,208190,209502,210631,212042,213299,214216,215141,216161,217495,218517,219823,220821,222060,223391,224776,225910,226980,228273,229451,230812,231961,233300,234524,235713,237055,238081,239332,240575,241960,243094,244341,245447,246721,248076,249179,250442,251541,252892,254243,255492,256767,258173,259482,260702,261777,263097,264425,265501,266372,267443,268532,269865,271165,272529,273835,275185,276522,277865,279110,280473,281848,283169,284464,285194,286296,287600,288984,290169,291189,292379,293452,294642,296094,297213,298077,298875,299634,300714,301935,303051,303905,305078,306221,307231,308424,309552,310822,311969,312640,313864,315245,316597,317713,319339,320789,322008,323105,324282,325308,326300,327516,328761,329591,330456,331515,332518,333561,334671,336357,337472,338677,339934,341297,342467,343575,344837,346083,347381,348805,349871,351131,352140,352974,353948,355086,356158,357450,358737,360118,361353,362279,363588,364800,366085,366844,367806,368654,369078,370313,371388,372501,373685,374798,376033,377210,378248,379468,380331,381596,382838,383967,385186,386180,387294,388552,389641,390887,392022,392883,393876,395045,396406,397292,398546,399514,400293,401550,402777,404007,405150,406043,407029,408135,409039,409965,411202,412240,413341,414455,415558,416741,417736,418866,420008,420965,422091,422974,424083,425254,426552,427833,429114,430515,431599,432754,434014,435322,436479,437512,438939,439918,441264,442178,443241,444487,445674,446906,448106,449303,450630,451910,453183,454552,455421,456648,457949,459321,460774,462084,463450,464723,465871,466992,468279,469519,470474,471445,472649],"sizes":[1319,1312,1472,1223,1279,1344,1140,1022,1214,1165,1277,1307,1033,1291,1119,1258,1168,1226,1104,1148,1377,1384,1287,1048,1014,967,1308,1295,1218,1054,1094,1210,1257,1075,1235,1330,1177,1175,1253,1252,1231,1236,1031,1316,1199,1176,1090,1109,1333,1286,1229,1377,1417,1163,1229,1396,1002,1490,1244,1331,1228,1352,1289,1291,1385,1360,873,1125,1178,1278,1215,1140,1284,1345,1259,1233,1258,1269,1210,1106,1520,1422,1023,1263,1052,1166,1293,1158,953,1456,1280,1329,1088,1121,1229,930,1177,1396,1413,1323,1091,1224,1124,1253,1127,1081,1234,883,1147,823,1179,884,940,1244,1204,980,1151,1050,1191,859,1465,1434,1065,1343,1302,1199,1225,639,1399,1041,767,1196,1227,1200,1294,1026,1072,1073,1155,1124,1018,1233,1316,1337,1212,1364,1217,1032,1215,1055,1334,1480,1156,1112,1222,1077,1257,1335,1406,1172,1185,1355,1246,1287,1269,860,1165,1350,1289,1301,1280,1273,1279,1312,1129,1411,1257,917,925,1020,1334,1022,1306,998,1239,1331,1385,1134,1070,1293,1178,1361,1149,1339,1224,1189,1342,1026,1251,1243,1385,1134,1247,1106,1274,1355,1103,1263,1099,1351,1351,1249,1275,1406,1309,1220,1075,1320,1328,1076,871,1071,1089,1333,1300,1364,1306,1350,1337,1343,1245,1363,1375,1321,1295,730,1102,1304,1384,1185,1020,1190,1073,1190,1452,1119,864,798,759,1080,1221,1116,854,1173,1143,1010,1193,1128,1270,1147,671,1224,1381,1352,1116,1626,1450,1219,1097,1177,1026,992,1216,1245,830,865,1059,1003,1043,1110,1686,1115,1205,1257,1363,1170,1108,1262,1246,1298,1424,1066,1260,1009,834,974,1138,1072,1292,1287,1381,1235,926,1309,1212,1285,759,962,848,424,1235,1075,1113,1184,1113,1235,1177,1038,1220,863,1265,1242,1129,1219,994,1114,1258,1089,1246,1135,861,993,1169,1361,886,1254,968,779,1257,1227,1230,1143,893,986,1106,904,926,1237,1038,1101,1114,1103,1183,995,1130,1142,957,1126,883,1109,1171,1298,1281,1281,1401,1084,1155,1260,1308,1157,1033,1427,979,1346,914,1063,1246,1187,1232,1200,1197,1327,1280,1273,1369,869,1227,1301,1372,1453,1310,1366,1273,1148,1121,1287,1240,955,971,1204,1099],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_setuptools-63.4.2-py310h8bed8af_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_setuptools-63.4.2-py310h8bed8af_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/__init__.py", "start": 0, "end": 108568}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/__init__.py", "start": 141694, "end": 141694}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/appdirs.py", "start": 116993, "end": 141694}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/__init__.py", "start": 282572, "end": 283078}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_adapters.py", "start": 285914, "end": 290418}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_common.py", "start": 290418, "end": 293159}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_compat.py", "start": 275980, "end": 278686}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_itertools.py", "start": 296725, "end": 297609}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_legacy.py", "start": 272486, "end": 275980}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/abc.py", "start": 278686, "end": 282572}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/readers.py", "start": 293159, "end": 296725}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/simple.py", "start": 283078, "end": 285914}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco/__init__.py", "start": 147114, "end": 147114}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco/context.py", "start": 141694, "end": 147114}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco/functools.py", "start": 147114, "end": 160629}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco/text/__init__.py", "start": 160629, "end": 176155}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/more_itertools/__init__.py", "start": 430178, "end": 430261}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/more_itertools/more.py", "start": 297609, "end": 430178}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/more_itertools/recipes.py", "start": 430261, "end": 448671}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/__about__.py", "start": 176155, "end": 176816}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/__init__.py", "start": 198146, "end": 198643}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/_manylinux.py", "start": 241627, "end": 253115}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/_musllinux.py", "start": 198643, "end": 203021}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/_structures.py", "start": 181016, "end": 182447}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/markers.py", "start": 203021, "end": 211517}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/requirements.py", "start": 253115, "end": 257821}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/specifiers.py", "start": 211517, "end": 241627}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/tags.py", "start": 182447, "end": 198146}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/utils.py", "start": 176816, "end": 181016}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/version.py", "start": 257821, "end": 272486}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/__init__.py", "start": 543290, "end": 552449}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/actions.py", "start": 536864, "end": 543290}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/common.py", "start": 448671, "end": 461607}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/core.py", "start": 572656, "end": 785966}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/diagram/__init__.py", "start": 794989, "end": 818657}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/exceptions.py", "start": 785966, "end": 794989}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/helpers.py", "start": 461607, "end": 500736}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/results.py", "start": 511523, "end": 536864}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/testing.py", "start": 559254, "end": 572656}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/unicode.py", "start": 500736, "end": 511523}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/util.py", "start": 552449, "end": 559254}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/_vendor/zipp.py", "start": 108568, "end": 116993}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pkg_resources/extern/__init__.py", "start": 818657, "end": 821083}]});
  })();
