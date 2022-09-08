
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
      var PACKAGE_NAME = 'regex-2022.1.18-py310h6d2fff6_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'regex-2022.1.18-py310h6d2fff6_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "regex", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "regex-2022.1.18.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":452686,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1348,2381,3771,4742,5884,7243,8407,9240,10290,11323,12464,13705,14815,16141,17474,18803,20196,21659,23068,24427,25604,26575,27255,28340,29302,30183,31172,32196,33230,34188,35076,36167,37275,38340,39357,40418,41583,42385,43477,44756,45614,46658,48000,49014,49835,50901,51899,52835,53768,54676,55588,56743,57849,59026,59929,60852,61801,62913,63881,64891,65867,66881,67740,68745,69810,70956,72013,72940,73971,75030,76152,77072,77946,78800,79821,80840,82027,82835,83551,84456,85613,86770,87997,89243,90439,91571,92353,93064,93518,94374,95134,95875,96645,97395,98014,98699,99317,99956,100517,101043,101735,102413,103492,104452,105468,106160,106792,107647,107951,108325,109073,109788,110432,110993,111688,112351,112993,113577,114265,115025,115885,116304,116791,117486,118080,118862,119848,120539,121115,121905,122653,123574,124108,124825,125638,126390,126966,127673,128442,129337,130269,131356,132357,133389,134344,135074,135820,136612,137244,137921,138649,139425,140233,141010,141723,142357,142984,143575,144390,145194,146042,146980,148093,149109,149834,150640,151415,151979,152668,153601,154347,154744,155868,156790,157696,158471,159472,160281,161028,161627,162341,162622,163561,164780,165703,166735,167768,168579,168975,169312,170058,171391,172455,173411,174693,176027,177231,178385,179410,180402,181469,182535,183625,184704,185788,186860,187929,189007,190084,191167,192363,193718,194795,196098,197635,199136,200559,201955,203619,205099,206708,207659,209043,210166,211306,212552,213659,214916,215904,217092,218489,219578,221162,222581,224102,225115,226543,227697,229151,230140,231640,232954,234308,235545,236727,238039,238897,240345,241639,242797,243949,245044,246023,247006,248013,248967,250030,251529,252567,253598,254970,256240,257485,258674,259773,260892,262226,263555,264896,266217,267305,268761,270221,271370,272926,274490,275757,277219,278505,279789,281215,282542,284152,285796,287220,288015,288950,290024,291496,292790,294133,295605,297195,298723,300212,301656,302775,303612,304463,305261,306388,307237,308405,309289,309943,311018,312054,312734,313428,314080,314754,315353,315809,316467,317192,317472,317665,317852,318039,318231,318412,318604,318788,318960,319146,319336,319525,319728,320139,321115,321817,322268,322976,323564,324018,324252,324977,325791,326363,326843,327216,327654,328556,329469,330205,331077,331930,332778,333573,334325,335129,335933,336595,337456,338290,339522,340200,341076,342464,343014,343667,344337,344924,345443,346282,347114,348341,349489,349699,350499,351228,351784,352342,352800,353333,353763,354392,354850,355479,356070,356542,357078,357290,357705,357927,359005,359779,360676,361976,362618,363461,364566,365320,366165,366607,367856,368415,369297,370389,370819,371094,371631,371967,372561,373520,374559,374901,375533,376535,377803,379014,379733,380499,381485,382085,382860,383753,384452,385458,385615,386358,386716,387424,388182,388370,389062,389823,390742,391664,392470,392994,393955,394652,395335,396018,396866,397616,398458,399247,399896,400728,401444,402236,403060,404056,404785,405535,406221,406939,407418,408001,408788,409347,409822,410379,410926,411477,412021,412679,413439,414004,414579,415092,415652,416209,416718,417283,418005,418820,419589,420400,421149,421943,422631,423313,423779,424853,425503,426215,426979,427704,428398,429168,430031,431028,431612,432503,433323,434144,435017,436127,436978,439026,441074,443122,444990,446856,448748,450705,452465],"sizes":[1348,1033,1390,971,1142,1359,1164,833,1050,1033,1141,1241,1110,1326,1333,1329,1393,1463,1409,1359,1177,971,680,1085,962,881,989,1024,1034,958,888,1091,1108,1065,1017,1061,1165,802,1092,1279,858,1044,1342,1014,821,1066,998,936,933,908,912,1155,1106,1177,903,923,949,1112,968,1010,976,1014,859,1005,1065,1146,1057,927,1031,1059,1122,920,874,854,1021,1019,1187,808,716,905,1157,1157,1227,1246,1196,1132,782,711,454,856,760,741,770,750,619,685,618,639,561,526,692,678,1079,960,1016,692,632,855,304,374,748,715,644,561,695,663,642,584,688,760,860,419,487,695,594,782,986,691,576,790,748,921,534,717,813,752,576,707,769,895,932,1087,1001,1032,955,730,746,792,632,677,728,776,808,777,713,634,627,591,815,804,848,938,1113,1016,725,806,775,564,689,933,746,397,1124,922,906,775,1001,809,747,599,714,281,939,1219,923,1032,1033,811,396,337,746,1333,1064,956,1282,1334,1204,1154,1025,992,1067,1066,1090,1079,1084,1072,1069,1078,1077,1083,1196,1355,1077,1303,1537,1501,1423,1396,1664,1480,1609,951,1384,1123,1140,1246,1107,1257,988,1188,1397,1089,1584,1419,1521,1013,1428,1154,1454,989,1500,1314,1354,1237,1182,1312,858,1448,1294,1158,1152,1095,979,983,1007,954,1063,1499,1038,1031,1372,1270,1245,1189,1099,1119,1334,1329,1341,1321,1088,1456,1460,1149,1556,1564,1267,1462,1286,1284,1426,1327,1610,1644,1424,795,935,1074,1472,1294,1343,1472,1590,1528,1489,1444,1119,837,851,798,1127,849,1168,884,654,1075,1036,680,694,652,674,599,456,658,725,280,193,187,187,192,181,192,184,172,186,190,189,203,411,976,702,451,708,588,454,234,725,814,572,480,373,438,902,913,736,872,853,848,795,752,804,804,662,861,834,1232,678,876,1388,550,653,670,587,519,839,832,1227,1148,210,800,729,556,558,458,533,430,629,458,629,591,472,536,212,415,222,1078,774,897,1300,642,843,1105,754,845,442,1249,559,882,1092,430,275,537,336,594,959,1039,342,632,1002,1268,1211,719,766,986,600,775,893,699,1006,157,743,358,708,758,188,692,761,919,922,806,524,961,697,683,683,848,750,842,789,649,832,716,792,824,996,729,750,686,718,479,583,787,559,475,557,547,551,544,658,760,565,575,513,560,557,509,565,722,815,769,811,749,794,688,682,466,1074,650,712,764,725,694,770,863,997,584,891,820,821,873,1110,851,2048,2048,2048,1868,1866,1892,1957,1760,221],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_regex-2022.1.18-py310h6d2fff6_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_regex-2022.1.18-py310h6d2fff6_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/regex-2022.1.18.dist-info/direct_url.json", "start": 1024489, "end": 1024595}, {"filename": "/home/runner/env/lib/python3.10/site-packages/regex/__init__.py", "start": 172799, "end": 172864}, {"filename": "/home/runner/env/lib/python3.10/site-packages/regex/_regex.cpython-310.so", "start": 391282, "end": 1024489}, {"filename": "/home/runner/env/lib/python3.10/site-packages/regex/_regex_core.py", "start": 32544, "end": 172799}, {"filename": "/home/runner/env/lib/python3.10/site-packages/regex/regex.py", "start": 0, "end": 32544}, {"filename": "/home/runner/env/lib/python3.10/site-packages/regex/test_regex.py", "start": 172864, "end": 391282}]});
  })();
