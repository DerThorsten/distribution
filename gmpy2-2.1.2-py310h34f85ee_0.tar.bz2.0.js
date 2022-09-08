
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
      var PACKAGE_NAME = 'gmpy2-2.1.2-py310h34f85ee_0.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'gmpy2-2.1.2-py310h34f85ee_0.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "gmpy2-2.1.2.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "gmpy2", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":940345,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1469,2799,3461,3847,4824,6313,7688,9099,10491,11953,13088,13917,15280,16661,17928,19138,20267,21401,23097,24298,25456,26655,27877,29108,30341,31550,32782,34004,35231,36456,37683,38825,40121,41190,42431,43774,45259,46749,48159,49426,50705,51876,53205,54477,55887,57275,58644,59652,60954,62192,63386,64574,65890,67198,68561,69690,70690,71881,73115,74284,75571,76977,78011,79524,80633,81828,82947,83922,85134,86559,88005,89142,90529,91736,92984,94142,95338,96032,96791,97796,98519,99758,100862,102169,103341,104548,105534,106320,107175,108419,109479,110573,111660,112296,113453,114394,115554,116682,117489,118491,119382,120786,122371,123381,124298,124957,125987,126970,128134,129266,130285,131484,132605,133752,134857,136131,137424,138603,139769,141121,142273,143359,144416,145644,146934,148211,149440,150908,152054,153611,154938,156118,157597,158908,160429,161594,162481,163769,165023,166249,167532,168864,169902,170975,172280,173368,174431,175638,177046,178461,179790,180982,182307,183493,184631,185759,186878,188257,189565,190913,192180,193604,194913,196058,197308,198195,199229,200386,201488,202612,203935,205082,206313,207428,208743,209976,211223,212379,213589,214886,216111,217470,218701,219748,221019,222280,223529,224774,226108,227268,228467,229796,231116,232445,233859,235058,236335,237641,238991,240288,241742,242865,244330,245737,247122,248455,249717,251038,252372,253612,254763,256072,257342,258518,259845,261052,262260,263493,264697,266038,267304,268699,269903,271207,272655,273974,275388,276810,278045,279261,280605,282041,283182,284230,285588,286686,288062,289453,290769,292038,293424,294690,295907,297111,298469,299335,300464,301913,303317,304629,305950,307377,308791,310126,311567,312829,314145,315089,316508,317813,319102,320432,321914,323295,324809,326207,327631,329041,330328,331698,333052,334496,335826,337002,338085,339261,340597,341588,342945,344359,345718,347154,348195,349431,350786,352201,353496,354628,355668,357159,358070,359113,360548,361707,362798,364204,365523,366843,368128,369540,370997,372438,373799,375065,376383,377320,378616,379916,381028,382415,383671,385023,386257,387470,388706,389799,391042,392181,393486,394421,395488,396860,398150,399517,400878,402146,403470,404866,406129,407552,408841,410059,411463,412781,414117,415414,416662,418005,419419,420820,422054,423345,424766,426136,427514,428701,430055,431445,432918,434191,435647,437040,438307,439519,440667,442090,443291,444751,445960,447339,448660,449988,451210,452540,454004,455128,456104,457346,458499,459583,460918,462122,463500,464743,466140,467558,468917,470426,471864,472971,474114,475439,476740,477823,478983,480217,481600,482771,484166,485629,487130,488567,489985,491203,492566,493966,495295,496450,497842,499170,500462,501769,503110,504471,505737,506829,508112,509532,510892,512275,513571,514709,515853,516879,518071,519354,520607,521887,522760,523993,525334,526665,527713,528972,530181,531310,532712,534112,535292,536375,537710,538932,540250,541602,542604,543880,545259,546626,547816,549174,550498,551867,553034,554307,555588,556734,557931,559142,560559,561887,563204,564613,565760,567065,568351,569606,570995,572346,573662,574885,576121,577460,578814,580229,581393,582614,583801,585069,586178,587541,588888,590242,591485,592782,594135,595433,596727,597988,599230,600356,601732,602899,604116,605089,606291,607490,608855,610183,611322,612321,613580,614836,615737,616738,618062,619376,620629,621841,623006,624187,625446,626660,628015,629392,630563,631954,633253,634514,635856,637152,638424,639649,640944,642148,643438,644692,645851,647011,648249,649215,650202,651522,652863,654243,655479,656652,657773,659014,660216,661321,662493,663841,665148,666369,667522,668927,670087,671418,672751,674086,675433,676601,677896,679191,680263,681648,682959,684407,685720,686974,688348,689464,690653,691978,693082,694282,695444,696624,697688,698781,699878,700913,702069,703384,704444,705588,706623,707824,709115,710092,711268,712705,713846,715108,716102,717282,718458,719755,720823,722142,723340,724595,725856,727017,728302,729335,730361,731504,732520,733547,734652,735660,736644,737808,738666,739739,740520,741204,741624,742405,743329,743744,744175,744556,745261,745654,746009,747086,748109,749058,749975,751129,752169,753271,754277,755394,756311,757206,758197,759187,760060,761151,762228,763293,764386,765686,766888,768099,769285,770510,771732,773020,774234,775532,776831,778127,779432,780670,781938,783067,784358,785636,786895,788027,789353,790463,791605,792749,793858,795011,796309,797508,798646,799873,801155,802254,803401,804463,805684,806472,807709,808943,810278,811653,813095,814353,815596,816380,817725,818986,820237,821479,822708,823949,825345,826347,827098,828038,829338,830581,831848,833093,834264,835612,836764,838045,839347,840474,841657,842851,843735,844538,845310,846588,848049,848987,849498,850706,852127,853422,854311,855352,856275,857198,858018,859020,860381,861638,862986,864043,865382,866756,867736,868766,869798,870882,871873,872924,874243,875540,876640,877711,878945,880081,881169,882452,883650,884894,885818,886980,888252,889364,890512,891600,892972,894936,896243,898165,900197,902153,904116,906164,908212,910260,912308,914355,916394,918429,920473,922507,924554,926589,928612,930660,931349,932425,933940,935230,936778,938290,938872,940325],"sizes":[1469,1330,662,386,977,1489,1375,1411,1392,1462,1135,829,1363,1381,1267,1210,1129,1134,1696,1201,1158,1199,1222,1231,1233,1209,1232,1222,1227,1225,1227,1142,1296,1069,1241,1343,1485,1490,1410,1267,1279,1171,1329,1272,1410,1388,1369,1008,1302,1238,1194,1188,1316,1308,1363,1129,1000,1191,1234,1169,1287,1406,1034,1513,1109,1195,1119,975,1212,1425,1446,1137,1387,1207,1248,1158,1196,694,759,1005,723,1239,1104,1307,1172,1207,986,786,855,1244,1060,1094,1087,636,1157,941,1160,1128,807,1002,891,1404,1585,1010,917,659,1030,983,1164,1132,1019,1199,1121,1147,1105,1274,1293,1179,1166,1352,1152,1086,1057,1228,1290,1277,1229,1468,1146,1557,1327,1180,1479,1311,1521,1165,887,1288,1254,1226,1283,1332,1038,1073,1305,1088,1063,1207,1408,1415,1329,1192,1325,1186,1138,1128,1119,1379,1308,1348,1267,1424,1309,1145,1250,887,1034,1157,1102,1124,1323,1147,1231,1115,1315,1233,1247,1156,1210,1297,1225,1359,1231,1047,1271,1261,1249,1245,1334,1160,1199,1329,1320,1329,1414,1199,1277,1306,1350,1297,1454,1123,1465,1407,1385,1333,1262,1321,1334,1240,1151,1309,1270,1176,1327,1207,1208,1233,1204,1341,1266,1395,1204,1304,1448,1319,1414,1422,1235,1216,1344,1436,1141,1048,1358,1098,1376,1391,1316,1269,1386,1266,1217,1204,1358,866,1129,1449,1404,1312,1321,1427,1414,1335,1441,1262,1316,944,1419,1305,1289,1330,1482,1381,1514,1398,1424,1410,1287,1370,1354,1444,1330,1176,1083,1176,1336,991,1357,1414,1359,1436,1041,1236,1355,1415,1295,1132,1040,1491,911,1043,1435,1159,1091,1406,1319,1320,1285,1412,1457,1441,1361,1266,1318,937,1296,1300,1112,1387,1256,1352,1234,1213,1236,1093,1243,1139,1305,935,1067,1372,1290,1367,1361,1268,1324,1396,1263,1423,1289,1218,1404,1318,1336,1297,1248,1343,1414,1401,1234,1291,1421,1370,1378,1187,1354,1390,1473,1273,1456,1393,1267,1212,1148,1423,1201,1460,1209,1379,1321,1328,1222,1330,1464,1124,976,1242,1153,1084,1335,1204,1378,1243,1397,1418,1359,1509,1438,1107,1143,1325,1301,1083,1160,1234,1383,1171,1395,1463,1501,1437,1418,1218,1363,1400,1329,1155,1392,1328,1292,1307,1341,1361,1266,1092,1283,1420,1360,1383,1296,1138,1144,1026,1192,1283,1253,1280,873,1233,1341,1331,1048,1259,1209,1129,1402,1400,1180,1083,1335,1222,1318,1352,1002,1276,1379,1367,1190,1358,1324,1369,1167,1273,1281,1146,1197,1211,1417,1328,1317,1409,1147,1305,1286,1255,1389,1351,1316,1223,1236,1339,1354,1415,1164,1221,1187,1268,1109,1363,1347,1354,1243,1297,1353,1298,1294,1261,1242,1126,1376,1167,1217,973,1202,1199,1365,1328,1139,999,1259,1256,901,1001,1324,1314,1253,1212,1165,1181,1259,1214,1355,1377,1171,1391,1299,1261,1342,1296,1272,1225,1295,1204,1290,1254,1159,1160,1238,966,987,1320,1341,1380,1236,1173,1121,1241,1202,1105,1172,1348,1307,1221,1153,1405,1160,1331,1333,1335,1347,1168,1295,1295,1072,1385,1311,1448,1313,1254,1374,1116,1189,1325,1104,1200,1162,1180,1064,1093,1097,1035,1156,1315,1060,1144,1035,1201,1291,977,1176,1437,1141,1262,994,1180,1176,1297,1068,1319,1198,1255,1261,1161,1285,1033,1026,1143,1016,1027,1105,1008,984,1164,858,1073,781,684,420,781,924,415,431,381,705,393,355,1077,1023,949,917,1154,1040,1102,1006,1117,917,895,991,990,873,1091,1077,1065,1093,1300,1202,1211,1186,1225,1222,1288,1214,1298,1299,1296,1305,1238,1268,1129,1291,1278,1259,1132,1326,1110,1142,1144,1109,1153,1298,1199,1138,1227,1282,1099,1147,1062,1221,788,1237,1234,1335,1375,1442,1258,1243,784,1345,1261,1251,1242,1229,1241,1396,1002,751,940,1300,1243,1267,1245,1171,1348,1152,1281,1302,1127,1183,1194,884,803,772,1278,1461,938,511,1208,1421,1295,889,1041,923,923,820,1002,1361,1257,1348,1057,1339,1374,980,1030,1032,1084,991,1051,1319,1297,1100,1071,1234,1136,1088,1283,1198,1244,924,1162,1272,1112,1148,1088,1372,1964,1307,1922,2032,1956,1963,2048,2048,2048,2048,2047,2039,2035,2044,2034,2047,2035,2023,2048,689,1076,1515,1290,1548,1512,582,1453,20],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_gmpy2-2.1.2-py310h34f85ee_0.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_gmpy2-2.1.2-py310h34f85ee_0.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/gmpy2-2.1.2.dist-info/direct_url.json", "start": 0, "end": 109}, {"filename": "/home/runner/env/lib/python3.10/site-packages/gmpy2/__init__.py", "start": 109, "end": 490}, {"filename": "/home/runner/env/lib/python3.10/site-packages/gmpy2/gmpy2.cpython-310.so", "start": 490, "end": 1561294}]});
  })();