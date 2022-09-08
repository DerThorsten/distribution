
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
      var PACKAGE_NAME = 'patsy-0.5.2-h8b4d581_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'patsy-0.5.2-h8b4d581_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "patsy", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "patsy-0.5.2.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":498092,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1634,2880,4364,5675,7105,8396,9653,10981,12132,13506,14621,15936,17383,18506,19688,20949,22698,24247,26087,27907,29714,31441,33195,34757,36464,38224,39975,41617,43327,45040,46619,48461,50276,52064,53798,55422,57062,58822,60539,62224,63858,65569,67408,69249,71091,72946,74674,76383,78143,79864,81706,83505,85300,87137,88843,90571,92265,93961,95812,97629,99483,101257,103011,104716,106439,108273,110084,111891,113649,115432,117023,118327,119593,120723,121973,123558,125073,126213,127405,128330,129722,130990,132253,133271,134497,135854,136961,137888,138590,139354,140649,141745,142652,143728,144875,146030,147481,148676,149898,151367,152880,154204,155745,156849,157901,158863,160070,161341,162677,164193,166050,167886,169724,171579,173432,175273,177137,178952,180755,182635,184412,186216,188096,189928,191796,193662,195512,197385,199224,200962,202846,204654,206491,208333,210208,212037,213915,215758,217592,219455,221279,223095,224961,226739,228555,230415,232251,234130,235974,237829,239699,241529,243338,245183,246989,248726,250581,252419,254281,256107,257934,259792,261625,263474,265292,267119,268954,270799,272603,274392,276197,277981,279780,281610,283407,284910,286351,287798,288824,289663,290815,291921,292496,293980,295070,296010,297101,298268,299210,300162,301194,302070,303173,304281,305225,306232,307066,308434,309481,310543,311553,312811,314252,315547,316875,318091,319381,320609,321457,322336,323228,324635,325834,326943,327908,328888,329569,330501,331671,333135,334428,335611,336744,337606,338775,339889,340975,341734,342523,343682,345104,346437,347623,348552,350010,351167,352345,353435,354265,355276,356373,357291,358477,359538,360289,361157,362139,363039,363907,365058,365924,366987,367944,369175,370087,371549,372667,373734,374998,376480,377857,379047,380322,381474,382263,383607,384781,385707,386616,387622,388601,389470,390546,391464,392410,393159,394107,395099,396172,397098,397966,398689,399771,400660,401592,402601,403587,404419,405658,406929,407882,408776,410174,411339,412760,414292,415542,416669,417854,419100,420598,421939,423070,423866,424983,425665,426771,427853,429064,430490,432012,433222,434444,435298,436303,437764,438924,439969,441281,442411,443570,444433,445458,446629,448033,449290,450457,451830,452926,454225,455145,455861,456651,457514,458754,460156,461531,462791,463778,464941,466316,467678,468744,470015,471395,472710,474376,475407,476401,477528,478709,479919,481227,482393,483575,484602,485983,487285,488805,490057,490978,492269,493449,494741,495900,496895,497638],"sizes":[1634,1246,1484,1311,1430,1291,1257,1328,1151,1374,1115,1315,1447,1123,1182,1261,1749,1549,1840,1820,1807,1727,1754,1562,1707,1760,1751,1642,1710,1713,1579,1842,1815,1788,1734,1624,1640,1760,1717,1685,1634,1711,1839,1841,1842,1855,1728,1709,1760,1721,1842,1799,1795,1837,1706,1728,1694,1696,1851,1817,1854,1774,1754,1705,1723,1834,1811,1807,1758,1783,1591,1304,1266,1130,1250,1585,1515,1140,1192,925,1392,1268,1263,1018,1226,1357,1107,927,702,764,1295,1096,907,1076,1147,1155,1451,1195,1222,1469,1513,1324,1541,1104,1052,962,1207,1271,1336,1516,1857,1836,1838,1855,1853,1841,1864,1815,1803,1880,1777,1804,1880,1832,1868,1866,1850,1873,1839,1738,1884,1808,1837,1842,1875,1829,1878,1843,1834,1863,1824,1816,1866,1778,1816,1860,1836,1879,1844,1855,1870,1830,1809,1845,1806,1737,1855,1838,1862,1826,1827,1858,1833,1849,1818,1827,1835,1845,1804,1789,1805,1784,1799,1830,1797,1503,1441,1447,1026,839,1152,1106,575,1484,1090,940,1091,1167,942,952,1032,876,1103,1108,944,1007,834,1368,1047,1062,1010,1258,1441,1295,1328,1216,1290,1228,848,879,892,1407,1199,1109,965,980,681,932,1170,1464,1293,1183,1133,862,1169,1114,1086,759,789,1159,1422,1333,1186,929,1458,1157,1178,1090,830,1011,1097,918,1186,1061,751,868,982,900,868,1151,866,1063,957,1231,912,1462,1118,1067,1264,1482,1377,1190,1275,1152,789,1344,1174,926,909,1006,979,869,1076,918,946,749,948,992,1073,926,868,723,1082,889,932,1009,986,832,1239,1271,953,894,1398,1165,1421,1532,1250,1127,1185,1246,1498,1341,1131,796,1117,682,1106,1082,1211,1426,1522,1210,1222,854,1005,1461,1160,1045,1312,1130,1159,863,1025,1171,1404,1257,1167,1373,1096,1299,920,716,790,863,1240,1402,1375,1260,987,1163,1375,1362,1066,1271,1380,1315,1666,1031,994,1127,1181,1210,1308,1166,1182,1027,1381,1302,1520,1252,921,1291,1180,1292,1159,995,743,454],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_patsy-0.5.2-h8b4d581_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_patsy-0.5.2-h8b4d581_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/patsy-0.5.2.dist-info/direct_url.json", "start": 752333, "end": 752437}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/__init__.py", "start": 413302, "end": 416809}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/build.py", "start": 495631, "end": 538389}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/builtins.py", "start": 614174, "end": 617305}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/categorical.py", "start": 733307, "end": 752333}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/compat.py", "start": 222526, "end": 224515}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/compat_ordereddict.py", "start": 605004, "end": 614174}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/constraint.py", "start": 375260, "end": 395540}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/contrasts.py", "start": 471470, "end": 495631}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/desc.py", "start": 448995, "end": 471470}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/design_info.py", "start": 645783, "end": 696475}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/eval.py", "start": 416809, "end": 448995}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/highlevel.py", "start": 718591, "end": 733307}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/infix_parser.py", "start": 708811, "end": 718591}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/mgcv_cubic_splines.py", "start": 164668, "end": 209773}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/missing.py", "start": 153088, "end": 164668}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/origin.py", "start": 217936, "end": 222526}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/parse_formula.py", "start": 403558, "end": 413302}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/redundancy.py", "start": 697330, "end": 707988}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/splines.py", "start": 357733, "end": 375260}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/state.py", "start": 598135, "end": 605004}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/test_build.py", "start": 538389, "end": 569414}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/test_highlevel.py", "start": 569414, "end": 598135}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/test_regressions.py", "start": 696475, "end": 697330}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/test_splines_bs_data.py", "start": 0, "end": 144006}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/test_splines_crs_data.py", "start": 224515, "end": 357733}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/test_state.py", "start": 395540, "end": 403558}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/tokens.py", "start": 209773, "end": 217936}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/user_util.py", "start": 144006, "end": 153088}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/util.py", "start": 617305, "end": 645783}, {"filename": "/home/runner/env/lib/python3.10/site-packages/patsy/version.py", "start": 707988, "end": 708811}]});
  })();
