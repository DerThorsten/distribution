
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
      var PACKAGE_NAME = 'pyerfa-2.0.0.1-py310he1922d0_0.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'pyerfa-2.0.0.1-py310he1922d0_0.tar.bz2.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "pyerfa-0.0.0.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "erfa", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":713997,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1527,2547,3691,5080,6306,7560,8980,10380,11836,13263,14489,15772,17111,18404,19487,20548,21937,23177,24596,26019,27199,28464,29644,30914,32190,33371,34623,35913,37077,38315,39548,40611,41941,43196,44453,45665,47032,48455,49679,51025,52201,53416,54667,55846,57102,58271,59349,60632,61489,62776,63989,65181,66447,67685,68778,70198,71496,72884,74155,75416,76675,77897,79310,80534,81822,83063,84346,85677,86929,88120,89401,90829,92217,93570,94942,96283,97476,98705,99995,101302,102478,103901,105291,106657,107810,109210,110429,111749,113163,114557,115764,117023,118445,119843,121191,122360,123837,125152,126535,127891,129200,130476,131737,132754,134119,135489,136941,138232,139395,140734,142067,143304,144592,145929,147376,148650,149918,151005,152449,153519,154648,155822,156853,157991,159134,160198,161434,162603,163676,165030,166420,167630,168927,170114,171368,172766,174003,175265,176598,177830,179129,180382,181586,182839,184107,185347,186674,187856,189147,190407,191608,192860,194263,195516,196821,198174,199500,200711,201812,203067,204398,205734,206887,208112,209507,210743,212072,213356,214666,216029,217405,218730,220123,221517,222899,224278,225702,227040,228398,229653,230972,232197,233380,234648,236025,237296,238526,239841,241200,242467,243785,245200,246333,247509,248663,249888,251184,252403,253554,254731,255873,257097,258275,259538,260937,262219,263505,264837,266163,267576,268844,270267,271547,272864,274124,275373,276786,278064,279501,280724,282083,283406,284700,286105,287427,288664,289895,291154,292510,293767,294990,296346,297702,298906,300189,301528,302836,304114,305474,306775,308097,309534,310848,312189,313659,314955,316285,317577,318884,320303,321542,322902,324291,325483,326816,328020,329361,330708,331967,333312,334671,335974,337399,338489,339921,341258,342258,343504,344856,346044,347331,348397,349587,350880,352032,353201,354532,355888,357237,358550,359815,361189,362441,363879,365108,366400,367646,368990,370329,371699,372885,374151,375460,376772,378083,379398,380844,381755,382954,384444,385483,386761,388192,389707,390832,392327,393597,394823,396233,397620,399019,400383,401795,403186,404378,405761,407006,408250,409448,410822,412172,413676,415024,416396,417814,419104,420415,421595,422856,424096,425346,426607,427918,429084,430249,431534,432695,433995,435320,436668,437740,438872,440212,441363,442502,443473,444243,445087,445803,446694,447634,448486,449752,450880,452053,453239,454212,455180,456239,457133,457924,458886,459856,460884,461875,462893,463922,464800,466247,467614,469232,470321,471530,472798,473585,474205,474855,475564,476181,476818,477445,478087,478676,479385,480092,480767,481470,482150,482847,483565,484359,485847,487196,488332,489443,490698,491513,492413,493584,494917,496208,496863,497793,498604,499626,500287,501263,502174,502981,503931,504703,505281,506210,507323,508525,509012,510197,510978,512021,513107,514241,515275,516861,518272,519686,521221,522730,524296,525478,526908,528137,529740,531296,532458,533947,535506,536930,538411,539991,541449,543063,544208,545704,547038,548554,549663,550449,551362,552099,552831,554092,555675,557723,559764,561817,563801,565687,567727,569737,571739,573384,574927,576975,579030,581078,583126,585174,587216,589264,591312,593367,595423,597471,599502,601544,603561,605517,607535,609590,611632,613680,615728,617665,619557,621325,622873,624244,625320,626260,627143,627996,628818,629586,630324,631106,631843,632534,633256,633908,634603,635303,635986,636727,637356,638011,638658,639314,639950,640624,641303,641999,642938,643807,644689,645608,646570,647431,648256,649143,649923,650707,651439,652132,652854,653618,654346,655114,655909,656682,657425,658099,658723,659598,660650,661691,662640,663509,664306,665018,666626,667790,668914,669821,670766,671752,672898,674125,675401,676659,677859,679001,679597,680254,680831,681390,682052,682655,683255,683889,684557,685181,685877,686521,687148,687804,688393,689045,689665,690372,692420,694468,696185,697467,698664,699783,700819,701755,702709,703705,704458,705132,706200,707222,708205,709176,710061,710843,711491,712030,712614,713627],"sizes":[1527,1020,1144,1389,1226,1254,1420,1400,1456,1427,1226,1283,1339,1293,1083,1061,1389,1240,1419,1423,1180,1265,1180,1270,1276,1181,1252,1290,1164,1238,1233,1063,1330,1255,1257,1212,1367,1423,1224,1346,1176,1215,1251,1179,1256,1169,1078,1283,857,1287,1213,1192,1266,1238,1093,1420,1298,1388,1271,1261,1259,1222,1413,1224,1288,1241,1283,1331,1252,1191,1281,1428,1388,1353,1372,1341,1193,1229,1290,1307,1176,1423,1390,1366,1153,1400,1219,1320,1414,1394,1207,1259,1422,1398,1348,1169,1477,1315,1383,1356,1309,1276,1261,1017,1365,1370,1452,1291,1163,1339,1333,1237,1288,1337,1447,1274,1268,1087,1444,1070,1129,1174,1031,1138,1143,1064,1236,1169,1073,1354,1390,1210,1297,1187,1254,1398,1237,1262,1333,1232,1299,1253,1204,1253,1268,1240,1327,1182,1291,1260,1201,1252,1403,1253,1305,1353,1326,1211,1101,1255,1331,1336,1153,1225,1395,1236,1329,1284,1310,1363,1376,1325,1393,1394,1382,1379,1424,1338,1358,1255,1319,1225,1183,1268,1377,1271,1230,1315,1359,1267,1318,1415,1133,1176,1154,1225,1296,1219,1151,1177,1142,1224,1178,1263,1399,1282,1286,1332,1326,1413,1268,1423,1280,1317,1260,1249,1413,1278,1437,1223,1359,1323,1294,1405,1322,1237,1231,1259,1356,1257,1223,1356,1356,1204,1283,1339,1308,1278,1360,1301,1322,1437,1314,1341,1470,1296,1330,1292,1307,1419,1239,1360,1389,1192,1333,1204,1341,1347,1259,1345,1359,1303,1425,1090,1432,1337,1000,1246,1352,1188,1287,1066,1190,1293,1152,1169,1331,1356,1349,1313,1265,1374,1252,1438,1229,1292,1246,1344,1339,1370,1186,1266,1309,1312,1311,1315,1446,911,1199,1490,1039,1278,1431,1515,1125,1495,1270,1226,1410,1387,1399,1364,1412,1391,1192,1383,1245,1244,1198,1374,1350,1504,1348,1372,1418,1290,1311,1180,1261,1240,1250,1261,1311,1166,1165,1285,1161,1300,1325,1348,1072,1132,1340,1151,1139,971,770,844,716,891,940,852,1266,1128,1173,1186,973,968,1059,894,791,962,970,1028,991,1018,1029,878,1447,1367,1618,1089,1209,1268,787,620,650,709,617,637,627,642,589,709,707,675,703,680,697,718,794,1488,1349,1136,1111,1255,815,900,1171,1333,1291,655,930,811,1022,661,976,911,807,950,772,578,929,1113,1202,487,1185,781,1043,1086,1134,1034,1586,1411,1414,1535,1509,1566,1182,1430,1229,1603,1556,1162,1489,1559,1424,1481,1580,1458,1614,1145,1496,1334,1516,1109,786,913,737,732,1261,1583,2048,2041,2053,1984,1886,2040,2010,2002,1645,1543,2048,2055,2048,2048,2048,2042,2048,2048,2055,2056,2048,2031,2042,2017,1956,2018,2055,2042,2048,2048,1937,1892,1768,1548,1371,1076,940,883,853,822,768,738,782,737,691,722,652,695,700,683,741,629,655,647,656,636,674,679,696,939,869,882,919,962,861,825,887,780,784,732,693,722,764,728,768,795,773,743,674,624,875,1052,1041,949,869,797,712,1608,1164,1124,907,945,986,1146,1227,1276,1258,1200,1142,596,657,577,559,662,603,600,634,668,624,696,644,627,656,589,652,620,707,2048,2048,1717,1282,1197,1119,1036,936,954,996,753,674,1068,1022,983,971,885,782,648,539,584,1013,370],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,0,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pyerfa-2.0.0.1-py310he1922d0_0.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_pyerfa-2.0.0.1-py310he1922d0_0.tar.bz2.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/__init__.py", "start": 13807, "end": 14240}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/_version.py", "start": 13660, "end": 13807}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/core.py", "start": 16289, "end": 754176}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/helpers.py", "start": 105, "end": 13660}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/ufunc.cpython-310.so", "start": 754176, "end": 1210949}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/version.py", "start": 14240, "end": 16289}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyerfa-0.0.0.dist-info/direct_url.json", "start": 0, "end": 105}]});
  })();
