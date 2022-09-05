
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
      var PACKAGE_NAME = 'traits-6.3.2-py310h672cd09_0.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'traits-6.3.2-py310h672cd09_0.tar.bz2.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "traits-6.3.2.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "traits", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/traits", "testing", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/traits", "observation", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/traits", "examples", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/traits/examples", "introduction", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/traits", "adaptation", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/traits", "etsconfig", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/traits", "util", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":561839,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1431,2565,3774,4726,5978,7347,8580,9509,10416,11692,12640,13445,14181,15095,16194,17435,18416,19379,20758,21729,22972,24124,25313,26464,27599,28377,29384,30428,31094,31963,32742,33822,35129,36210,37489,38567,39603,40738,42028,43466,44715,45704,46728,48104,49210,50270,51453,52565,53726,54686,55593,56543,57705,58747,59698,61129,62240,63208,64225,65476,66725,68020,69354,70551,71902,73090,74224,75179,76160,77353,78540,79628,80653,81781,82784,83888,85087,85877,86883,87981,88932,90002,91012,91839,93171,94331,95533,96723,97758,98877,100186,101526,102961,104061,105070,106306,107344,108549,109553,110475,111666,112858,113565,114843,115952,117033,117749,118700,119674,120709,121791,123042,124317,125728,126938,128081,129325,130605,131839,132878,133833,134746,135898,136870,137973,139210,140400,141773,143098,144035,145292,146572,147758,148870,150022,151204,152366,153592,154807,155974,156870,158035,159188,160373,161461,162508,163468,164708,165970,167178,168112,169237,170304,171390,172501,173277,174046,175079,176325,177500,178491,179592,180662,181591,182773,183902,184991,186206,187416,188302,189531,190572,191368,192244,193209,194046,195331,196640,197729,199014,200514,201728,203147,204467,205579,207057,208240,209501,210923,212245,213439,214693,215935,216978,218208,219319,220553,221898,223076,224290,225546,226747,227674,228577,229891,231204,232313,233497,234530,235936,237128,238463,239609,240869,241838,242952,243960,245077,246101,246921,247571,248637,249335,250409,251328,252402,253462,254629,255852,256926,258155,259305,260543,261587,262762,263692,264746,265869,266795,267484,268399,269313,270648,271849,272954,274050,275431,276566,277722,278772,279816,281067,282163,283231,284489,285711,286887,287971,288971,290084,291362,292637,293865,295081,296318,297500,298618,299655,300810,302056,303261,304540,305604,306846,307592,308589,309786,310846,311950,313159,314414,315695,316906,317866,319022,320132,321261,322066,322787,324308,325675,326920,328232,329611,331107,332500,333603,334881,336271,337456,338826,340122,341557,342954,344215,345383,346743,347778,348927,350098,351296,352242,353500,354817,355981,357333,358705,359779,361169,362503,363700,364887,366130,367378,368328,369406,370693,371947,373220,374226,375419,376698,377849,378830,379825,380955,382092,383199,384273,385337,386411,387476,388741,389989,391043,392214,393020,394109,395342,396463,397584,398623,399640,400706,401673,403117,404417,405462,406549,407641,408870,410071,410957,411801,412278,412736,413158,413645,415010,416501,417752,418909,419990,421332,422495,423508,424848,426010,427040,428236,429580,430756,432007,433005,434250,435633,436927,437940,438886,440253,441161,442198,443422,444686,446032,447407,448748,449759,450740,452053,452755,453775,455209,456341,457299,458457,459654,460710,461741,462959,464011,464932,465880,466729,467642,468794,469804,470683,471977,473187,474272,475302,476704,477856,478625,479728,481002,482314,483453,484508,485676,486648,487961,489280,490669,492002,493417,494915,496304,497609,498873,500255,501511,502885,504343,505911,507162,508589,509728,511276,512501,513701,514751,515674,516704,517934,519082,520134,521411,522680,523764,524758,525700,526944,527918,529112,530226,531288,532504,533629,534815,536354,537748,538661,539846,540873,541853,543220,544398,545557,546818,548120,549341,550628,551948,553229,554503,555677,557161,558496,559751,561039],"sizes":[1431,1134,1209,952,1252,1369,1233,929,907,1276,948,805,736,914,1099,1241,981,963,1379,971,1243,1152,1189,1151,1135,778,1007,1044,666,869,779,1080,1307,1081,1279,1078,1036,1135,1290,1438,1249,989,1024,1376,1106,1060,1183,1112,1161,960,907,950,1162,1042,951,1431,1111,968,1017,1251,1249,1295,1334,1197,1351,1188,1134,955,981,1193,1187,1088,1025,1128,1003,1104,1199,790,1006,1098,951,1070,1010,827,1332,1160,1202,1190,1035,1119,1309,1340,1435,1100,1009,1236,1038,1205,1004,922,1191,1192,707,1278,1109,1081,716,951,974,1035,1082,1251,1275,1411,1210,1143,1244,1280,1234,1039,955,913,1152,972,1103,1237,1190,1373,1325,937,1257,1280,1186,1112,1152,1182,1162,1226,1215,1167,896,1165,1153,1185,1088,1047,960,1240,1262,1208,934,1125,1067,1086,1111,776,769,1033,1246,1175,991,1101,1070,929,1182,1129,1089,1215,1210,886,1229,1041,796,876,965,837,1285,1309,1089,1285,1500,1214,1419,1320,1112,1478,1183,1261,1422,1322,1194,1254,1242,1043,1230,1111,1234,1345,1178,1214,1256,1201,927,903,1314,1313,1109,1184,1033,1406,1192,1335,1146,1260,969,1114,1008,1117,1024,820,650,1066,698,1074,919,1074,1060,1167,1223,1074,1229,1150,1238,1044,1175,930,1054,1123,926,689,915,914,1335,1201,1105,1096,1381,1135,1156,1050,1044,1251,1096,1068,1258,1222,1176,1084,1000,1113,1278,1275,1228,1216,1237,1182,1118,1037,1155,1246,1205,1279,1064,1242,746,997,1197,1060,1104,1209,1255,1281,1211,960,1156,1110,1129,805,721,1521,1367,1245,1312,1379,1496,1393,1103,1278,1390,1185,1370,1296,1435,1397,1261,1168,1360,1035,1149,1171,1198,946,1258,1317,1164,1352,1372,1074,1390,1334,1197,1187,1243,1248,950,1078,1287,1254,1273,1006,1193,1279,1151,981,995,1130,1137,1107,1074,1064,1074,1065,1265,1248,1054,1171,806,1089,1233,1121,1121,1039,1017,1066,967,1444,1300,1045,1087,1092,1229,1201,886,844,477,458,422,487,1365,1491,1251,1157,1081,1342,1163,1013,1340,1162,1030,1196,1344,1176,1251,998,1245,1383,1294,1013,946,1367,908,1037,1224,1264,1346,1375,1341,1011,981,1313,702,1020,1434,1132,958,1158,1197,1056,1031,1218,1052,921,948,849,913,1152,1010,879,1294,1210,1085,1030,1402,1152,769,1103,1274,1312,1139,1055,1168,972,1313,1319,1389,1333,1415,1498,1389,1305,1264,1382,1256,1374,1458,1568,1251,1427,1139,1548,1225,1200,1050,923,1030,1230,1148,1052,1277,1269,1084,994,942,1244,974,1194,1114,1062,1216,1125,1186,1539,1394,913,1185,1027,980,1367,1178,1159,1261,1302,1221,1287,1320,1281,1274,1174,1484,1335,1255,1288,800],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_traits-6.3.2-py310h672cd09_0.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_traits-6.3.2-py310h672cd09_0.tar.bz2.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/traits-6.3.2.dist-info/direct_url.json", "start": 0, "end": 105}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/__init__.py", "start": 186128, "end": 186943}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/adaptation/__init__.py", "start": 931589, "end": 932026}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/adaptation/adaptation_error.py", "start": 924085, "end": 924683}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/adaptation/adaptation_manager.py", "start": 932026, "end": 947497}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/adaptation/adaptation_offer.py", "start": 926561, "end": 931589}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/adaptation/adapter.py", "start": 924683, "end": 925722}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/adaptation/api.py", "start": 925722, "end": 926561}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/api.py", "start": 173542, "end": 177707}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/base_trait_handler.py", "start": 379215, "end": 385584}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/constants.py", "start": 3303, "end": 9848}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/ctrait.py", "start": 177707, "end": 186128}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/ctraits.cpython-310.so", "start": 593096, "end": 642734}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/editor_factories.py", "start": 82774, "end": 88582}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/etsconfig/__init__.py", "start": 947955, "end": 948484}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/etsconfig/api.py", "start": 947497, "end": 947955}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/etsconfig/etsconfig.py", "start": 948484, "end": 965066}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/__init__.py", "start": 883770, "end": 884177}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/_etsdemo_info.py", "start": 882750, "end": 883770}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/introduction/0_introduction.py", "start": 920087, "end": 924085}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/introduction/1_validation.py", "start": 908648, "end": 915203}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/introduction/2_initialization.py", "start": 890070, "end": 896171}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/introduction/3_observation.py", "start": 884177, "end": 890070}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/introduction/4_properties.py", "start": 896171, "end": 902607}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/introduction/5_documentation.py", "start": 902607, "end": 908648}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/examples/introduction/6_visualization.py", "start": 915203, "end": 920087}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/has_traits.py", "start": 229042, "end": 369016}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/interface_checker.py", "start": 206624, "end": 212505}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/__init__.py", "start": 802157, "end": 802157}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_anytrait_filter.py", "start": 802157, "end": 802872}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_dict_change_event.py", "start": 803913, "end": 806360}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_dict_item_observer.py", "start": 875442, "end": 882246}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_filtered_trait_observer.py", "start": 764001, "end": 770334}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_generated_parser.py", "start": 668558, "end": 754099}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_has_traits_helpers.py", "start": 871276, "end": 875442}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_i_notifier.py", "start": 779238, "end": 780858}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_i_observer.py", "start": 789473, "end": 796957}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_list_change_event.py", "start": 787487, "end": 789473}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_list_item_observer.py", "start": 832269, "end": 839198}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_metadata_filter.py", "start": 754099, "end": 755775}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_named_trait_observer.py", "start": 857254, "end": 864452}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_observe.py", "start": 864452, "end": 870432}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_observer_change_notifier.py", "start": 770334, "end": 777450}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_observer_graph.py", "start": 806360, "end": 810068}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_set_change_event.py", "start": 810068, "end": 811714}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_set_item_observer.py", "start": 811714, "end": 818330}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_testing.py", "start": 796957, "end": 801249}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_trait_added_observer.py", "start": 823966, "end": 832269}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_trait_change_event.py", "start": 777450, "end": 779238}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/_trait_event_notifier.py", "start": 755775, "end": 764001}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/api.py", "start": 801249, "end": 802157}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/events.py", "start": 870432, "end": 871276}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/exception_handling.py", "start": 783932, "end": 787487}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/exceptions.py", "start": 882246, "end": 882750}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/expression.py", "start": 839198, "end": 857254}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/i_observable.py", "start": 802872, "end": 803913}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/observe.py", "start": 780858, "end": 783932}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/observation/parsing.py", "start": 818330, "end": 823966}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/testing/__init__.py", "start": 643284, "end": 643853}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/testing/api.py", "start": 642734, "end": 643284}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/testing/doctest_tools.py", "start": 643853, "end": 645983}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/testing/nose_tools.py", "start": 665706, "end": 668558}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/testing/optional_dependencies.py", "start": 645983, "end": 647885}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/testing/unittest_tools.py", "start": 647885, "end": 665706}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_base.py", "start": 369016, "end": 379215}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_converters.py", "start": 428330, "end": 432695}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_dict_object.py", "start": 155804, "end": 173542}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_errors.py", "start": 105, "end": 3303}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_factory.py", "start": 186943, "end": 189191}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_handler.py", "start": 79787, "end": 82774}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_handlers.py", "start": 385584, "end": 428330}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_list_object.py", "start": 128429, "end": 155804}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_notifiers.py", "start": 88582, "end": 113552}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_numeric.py", "start": 113552, "end": 128429}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_set_object.py", "start": 212505, "end": 229042}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_type.py", "start": 189191, "end": 206624}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/trait_types.py", "start": 432695, "end": 592329}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/traits.py", "start": 9848, "end": 36535}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/traits_listener.py", "start": 36535, "end": 79787}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/__init__.py", "start": 988572, "end": 989036}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/_traitsui_helpers.py", "start": 989036, "end": 990231}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/api.py", "start": 981011, "end": 981535}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/async_trait_wait.py", "start": 965066, "end": 967516}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/camel_case.py", "start": 1006625, "end": 1008999}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/clean_strings.py", "start": 999949, "end": 1004018}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/deprecated.py", "start": 998939, "end": 999949}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/event_tracer.py", "start": 967516, "end": 978369}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/home_directory.py", "start": 1005433, "end": 1006625}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/import_symbol.py", "start": 1004018, "end": 1005433}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/resource.py", "start": 990231, "end": 997668}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/toposort.py", "start": 997668, "end": 998939}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/trait_documenter.py", "start": 981535, "end": 988572}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/util/weakiddict.py", "start": 978369, "end": 981011}, {"filename": "/home/runner/env/lib/python3.10/site-packages/traits/version.py", "start": 592329, "end": 593096}]});
  })();
