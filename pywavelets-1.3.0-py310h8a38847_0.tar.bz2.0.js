
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
      var PACKAGE_NAME = 'pywavelets-1.3.0-py310h8a38847_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'pywavelets-1.3.0-py310h8a38847_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "PyWavelets-1.3.0.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "pywt", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pywt", "data", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pywt", "_extensions", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":1027851,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1060,2200,3494,4820,6192,7584,9022,10384,11615,12885,14284,15644,16857,17582,18924,20311,21598,22916,24245,25378,26461,27517,28945,30271,31493,32894,34192,35427,36687,38069,39449,40600,42071,43441,44933,46358,47775,49294,50539,51794,53148,54551,55837,57056,58239,59265,60531,61651,62969,64398,65823,67205,68537,69796,71171,72266,73667,74781,75943,77130,78113,79358,80578,81375,82692,83958,85265,86533,87749,88894,89950,91078,92226,93608,95214,96762,98146,99401,100488,101590,102734,103864,104796,105860,106899,108101,109232,110352,111536,112851,114124,115479,116760,117896,119108,120332,121642,122899,124113,125274,126687,127881,128990,130496,131455,132537,133644,135064,135994,137050,138545,139802,141126,141994,143337,144426,145436,146447,147570,148573,149649,151047,152525,154052,155508,156944,158155,159555,161172,162620,164296,165855,166982,168251,169449,170799,172236,173416,174736,176281,177511,178977,180564,182172,183653,185214,186748,188228,189569,190475,191461,192699,193872,194731,195605,197028,198401,199710,201077,202363,203675,205015,206373,207787,209243,210700,212214,213573,215019,216144,217424,218961,220497,221972,223445,225009,226622,227994,229320,230950,232474,233714,235324,236848,237939,239205,240559,242005,243517,244905,246340,247773,249167,250613,252038,253555,254984,255685,257134,258511,259616,260712,262064,263489,264196,265657,267036,268427,269787,271227,272596,273943,275404,276780,278174,279619,280898,281737,283145,284596,286139,287307,288348,289160,290512,291725,292856,293814,294740,295962,297177,298254,299247,300365,301400,302598,303786,304818,305905,306924,307907,309155,310422,311646,313020,314272,315663,316982,318367,319803,321255,322426,323608,324891,326275,327408,328838,330079,331313,332355,333575,334942,336352,337904,339939,341979,344036,346084,348132,350180,352228,354276,356318,358372,360420,362461,364509,366557,368605,370653,372281,373391,374415,375494,376349,377587,377612,378905,380198,381420,382283,383671,384867,385923,386939,387949,388956,389969,390988,391996,393089,394201,395276,396647,398063,399429,400972,402293,403696,404999,406211,407631,409076,410349,411702,412986,414434,415602,417124,418588,420045,421425,422837,424232,425661,427057,428573,430019,431402,432797,434252,435953,437454,439028,440535,441746,443053,444520,446020,447334,448688,450042,451402,452871,454294,455505,456275,457468,458706,459368,460407,461270,462673,463705,464594,465403,466546,467283,467975,468728,469556,470324,471095,471812,472552,473235,473937,474711,475590,476484,477982,479482,480922,482366,483867,485256,486519,487687,489110,490645,492150,493578,495021,496489,497911,499318,500726,502256,503704,504916,506469,508015,509247,510584,511962,513466,514818,516276,517624,519036,520534,521914,523438,524965,526572,528089,529644,531215,532370,533439,534224,535559,536780,537941,538845,539802,541021,542196,543214,544214,545299,546295,547484,548676,549754,550872,551917,552898,554066,555300,556479,557835,559117,560508,561782,563176,564651,566081,567220,568334,569651,571037,572191,573556,574696,576069,577184,577728,578789,580136,581524,582862,584138,585418,586786,588314,589377,590193,591739,593767,595807,597861,599909,601957,604005,606053,608101,610150,612197,614245,616289,618346,620395,622443,624491,626292,627416,628528,629621,630414,631544,632617,633577,634621,635575,636715,637928,639067,639092,639865,641146,642470,643394,644703,645724,646727,647887,648957,650147,651427,652352,653652,654711,655912,657336,658814,660045,661278,662484,663678,665111,666408,667916,668814,670112,671359,672742,674167,675535,676977,678452,679945,681399,682898,684211,685254,686704,688331,689931,691384,692849,694423,695853,697286,698817,700327,701783,703224,704678,706187,707643,708869,710460,711987,713532,715030,716432,717735,719366,720925,722450,723885,725335,726579,728082,729537,730715,731750,732688,733722,734986,736127,737266,738169,739000,740350,741637,742825,743980,744988,745971,747281,748382,749420,750410,751460,752407,753541,754741,756075,757382,758750,760012,761404,762826,764266,765543,766716,767989,769287,770654,771688,773002,774462,775762,776810,778161,779572,781384,783434,785476,787527,789575,791623,793671,795719,797767,799801,801855,803912,805956,808008,810056,812104,814152,815590,816667,817732,818665,819874,820289,821545,822845,823920,825150,826284,827289,828297,829454,830505,831576,832895,834446,835877,836947,838214,839554,841013,842552,844059,845535,847036,848570,850214,851813,853346,854883,856240,857124,858248,859391,860788,861646,862907,864271,865728,867168,868692,870070,871608,872730,874017,875470,876881,878490,879989,881456,882928,884475,886038,887440,888860,890170,891808,893346,894529,896128,897643,898891,900269,901577,902975,904006,905422,906852,908211,909607,910627,912051,913532,914806,916162,917267,918658,920093,921360,922790,923984,925299,926627,927889,929388,930823,931678,932772,934237,935723,936922,937905,938795,939885,941171,942216,943292,944242,945143,946459,947735,949045,950202,951156,952195,953478,954621,955802,956731,957789,958809,959997,961171,962611,963874,965239,966477,967927,969359,970752,972001,973206,974511,975792,977101,978217,979474,980920,982281,983351,984717,986171,987819,989857,991907,993961,996009,998057,1000105,1002153,1004201,1006246,1008297,1010345,1012381,1014431,1016479,1018527,1020575,1022290,1023388,1024435,1025477,1026355,1027826],"sizes":[1060,1140,1294,1326,1372,1392,1438,1362,1231,1270,1399,1360,1213,725,1342,1387,1287,1318,1329,1133,1083,1056,1428,1326,1222,1401,1298,1235,1260,1382,1380,1151,1471,1370,1492,1425,1417,1519,1245,1255,1354,1403,1286,1219,1183,1026,1266,1120,1318,1429,1425,1382,1332,1259,1375,1095,1401,1114,1162,1187,983,1245,1220,797,1317,1266,1307,1268,1216,1145,1056,1128,1148,1382,1606,1548,1384,1255,1087,1102,1144,1130,932,1064,1039,1202,1131,1120,1184,1315,1273,1355,1281,1136,1212,1224,1310,1257,1214,1161,1413,1194,1109,1506,959,1082,1107,1420,930,1056,1495,1257,1324,868,1343,1089,1010,1011,1123,1003,1076,1398,1478,1527,1456,1436,1211,1400,1617,1448,1676,1559,1127,1269,1198,1350,1437,1180,1320,1545,1230,1466,1587,1608,1481,1561,1534,1480,1341,906,986,1238,1173,859,874,1423,1373,1309,1367,1286,1312,1340,1358,1414,1456,1457,1514,1359,1446,1125,1280,1537,1536,1475,1473,1564,1613,1372,1326,1630,1524,1240,1610,1524,1091,1266,1354,1446,1512,1388,1435,1433,1394,1446,1425,1517,1429,701,1449,1377,1105,1096,1352,1425,707,1461,1379,1391,1360,1440,1369,1347,1461,1376,1394,1445,1279,839,1408,1451,1543,1168,1041,812,1352,1213,1131,958,926,1222,1215,1077,993,1118,1035,1198,1188,1032,1087,1019,983,1248,1267,1224,1374,1252,1391,1319,1385,1436,1452,1171,1182,1283,1384,1133,1430,1241,1234,1042,1220,1367,1410,1552,2035,2040,2057,2048,2048,2048,2048,2048,2042,2054,2048,2041,2048,2048,2048,2048,1628,1110,1024,1079,855,1238,25,1293,1293,1222,863,1388,1196,1056,1016,1010,1007,1013,1019,1008,1093,1112,1075,1371,1416,1366,1543,1321,1403,1303,1212,1420,1445,1273,1353,1284,1448,1168,1522,1464,1457,1380,1412,1395,1429,1396,1516,1446,1383,1395,1455,1701,1501,1574,1507,1211,1307,1467,1500,1314,1354,1354,1360,1469,1423,1211,770,1193,1238,662,1039,863,1403,1032,889,809,1143,737,692,753,828,768,771,717,740,683,702,774,879,894,1498,1500,1440,1444,1501,1389,1263,1168,1423,1535,1505,1428,1443,1468,1422,1407,1408,1530,1448,1212,1553,1546,1232,1337,1378,1504,1352,1458,1348,1412,1498,1380,1524,1527,1607,1517,1555,1571,1155,1069,785,1335,1221,1161,904,957,1219,1175,1018,1000,1085,996,1189,1192,1078,1118,1045,981,1168,1234,1179,1356,1282,1391,1274,1394,1475,1430,1139,1114,1317,1386,1154,1365,1140,1373,1115,544,1061,1347,1388,1338,1276,1280,1368,1528,1063,816,1546,2028,2040,2054,2048,2048,2048,2048,2048,2049,2047,2048,2044,2057,2049,2048,2048,1801,1124,1112,1093,793,1130,1073,960,1044,954,1140,1213,1139,25,773,1281,1324,924,1309,1021,1003,1160,1070,1190,1280,925,1300,1059,1201,1424,1478,1231,1233,1206,1194,1433,1297,1508,898,1298,1247,1383,1425,1368,1442,1475,1493,1454,1499,1313,1043,1450,1627,1600,1453,1465,1574,1430,1433,1531,1510,1456,1441,1454,1509,1456,1226,1591,1527,1545,1498,1402,1303,1631,1559,1525,1435,1450,1244,1503,1455,1178,1035,938,1034,1264,1141,1139,903,831,1350,1287,1188,1155,1008,983,1310,1101,1038,990,1050,947,1134,1200,1334,1307,1368,1262,1392,1422,1440,1277,1173,1273,1298,1367,1034,1314,1460,1300,1048,1351,1411,1812,2050,2042,2051,2048,2048,2048,2048,2048,2034,2054,2057,2044,2052,2048,2048,2048,1438,1077,1065,933,1209,415,1256,1300,1075,1230,1134,1005,1008,1157,1051,1071,1319,1551,1431,1070,1267,1340,1459,1539,1507,1476,1501,1534,1644,1599,1533,1537,1357,884,1124,1143,1397,858,1261,1364,1457,1440,1524,1378,1538,1122,1287,1453,1411,1609,1499,1467,1472,1547,1563,1402,1420,1310,1638,1538,1183,1599,1515,1248,1378,1308,1398,1031,1416,1430,1359,1396,1020,1424,1481,1274,1356,1105,1391,1435,1267,1430,1194,1315,1328,1262,1499,1435,855,1094,1465,1486,1199,983,890,1090,1286,1045,1076,950,901,1316,1276,1310,1157,954,1039,1283,1143,1181,929,1058,1020,1188,1174,1440,1263,1365,1238,1450,1432,1393,1249,1205,1305,1281,1309,1116,1257,1446,1361,1070,1366,1454,1648,2038,2050,2054,2048,2048,2048,2048,2048,2045,2051,2048,2036,2050,2048,2048,2048,1715,1098,1047,1042,878,1471,25],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,1,1,0,0,0,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pywavelets-1.3.0-py310h8a38847_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_pywavelets-1.3.0-py310h8a38847_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/PyWavelets-1.3.0.dist-info/direct_url.json", "start": 0, "end": 114}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/__init__.py", "start": 82607, "end": 83700}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_c99_config.py", "start": 210590, "end": 210670}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_cwt.py", "start": 58015, "end": 65730}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_doc_utils.py", "start": 40749, "end": 46572}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_dwt.py", "start": 193363, "end": 210590}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_extensions/__init__.py", "start": 1002441, "end": 1002441}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_extensions/_cwt.cpython-310.so", "start": 1002441, "end": 1271299}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_extensions/_dwt.cpython-310.so", "start": 225784, "end": 587891}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_extensions/_pywt.cpython-310.so", "start": 587891, "end": 1002441}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_extensions/_swt.cpython-310.so", "start": 1271299, "end": 1583010}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_functions.py", "start": 88746, "end": 95745}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_mra.py", "start": 65730, "end": 80094}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_multidim.py", "start": 46572, "end": 58015}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_multilevel.py", "start": 99229, "end": 156393}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_pytest.py", "start": 80094, "end": 82607}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_pytesttester.py", "start": 83843, "end": 88746}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_swt.py", "start": 8907, "end": 40749}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_thresholding.py", "start": 114, "end": 8907}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_utils.py", "start": 95745, "end": 99229}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/_wavelet_packets.py", "start": 156626, "end": 193363}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/conftest.py", "start": 83700, "end": 83843}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/data/__init__.py", "start": 220146, "end": 220242}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/data/_readers.py", "start": 220867, "end": 225784}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/data/_wavelab_signals.py", "start": 210670, "end": 220146}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/data/create_dat.py", "start": 220242, "end": 220867}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pywt/version.py", "start": 156393, "end": 156626}]});
  })();
