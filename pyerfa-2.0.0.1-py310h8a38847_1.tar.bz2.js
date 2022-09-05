
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
      var PACKAGE_NAME = 'pyerfa-2.0.0.1-py310h8a38847_1.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'pyerfa-2.0.0.1-py310h8a38847_1.tar.bz2.data';
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
        var compressedData = {"data":null,"cachedOffset":713977,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1524,2544,3686,5072,6296,7547,8970,10371,11827,13250,14474,15756,17102,18396,19476,20542,21932,23170,24585,26010,27194,28458,29641,30912,32188,33373,34621,35904,37069,38307,39543,40605,41931,43186,44448,45656,47016,48444,49670,51017,52193,53407,54657,55820,57077,58245,59330,60604,61456,62746,63959,65152,66417,67657,68750,70170,71468,72858,74133,75397,76656,77878,79288,80511,81803,83039,84320,85651,86910,88096,89375,90800,92185,93542,94912,96253,97442,98675,99966,101275,102450,103869,105259,106628,107784,109184,110396,111712,113119,114512,115726,116980,118402,119797,121145,122313,123775,125089,126478,127832,129139,130421,131686,132705,134071,135442,136893,138184,139345,140684,142009,143244,144536,145881,147326,148596,149865,150951,152395,153476,154609,155781,156811,157937,159079,160146,161375,162545,163621,164967,166356,167559,168858,170054,171304,172709,173948,175209,176542,177775,179079,180340,181543,182799,184065,185303,186630,187815,189110,190365,191565,192812,194211,195464,196773,198124,199443,200651,201751,203009,204345,205678,206826,208047,209449,210693,212029,213318,214625,215986,217361,218683,220074,221465,222847,224231,225658,227000,228358,229613,230930,232159,233314,234579,235959,237236,238470,239783,241139,242409,243731,245143,246275,247451,248609,249836,251132,252354,253508,254680,255822,257040,258226,259490,260890,262174,263452,264782,266110,267521,268790,270218,271488,272809,274067,275311,276727,278009,279450,280672,282029,283349,284643,286048,287368,288606,289833,291096,292455,293714,294940,296295,297635,298841,300129,301465,302776,304062,305417,306725,308048,309488,310800,312139,313612,314910,316240,317531,318845,320263,321501,322862,324259,325450,326783,327997,329339,330690,331959,333304,334668,335971,337392,338489,339915,341251,342255,343499,344855,346049,347333,348400,349586,350876,352019,353184,354518,355878,357231,358544,359805,361173,362421,363859,365089,366386,367629,368973,370316,371682,372856,374122,375435,376749,378060,379374,380836,381746,382940,384428,385467,386743,388179,389691,390820,392315,393582,394811,396226,397611,399006,400371,401785,403178,404374,405760,407010,408254,409453,410822,412173,413670,415025,416398,417816,419108,420424,421598,422857,424101,425350,426602,427913,429079,430249,431536,432701,434006,435334,436674,437749,438878,440220,441371,442506,443477,444252,445099,445815,446701,447633,448487,449755,450876,452047,453232,454209,455174,456241,457139,457933,458897,459862,460888,461877,462890,463918,464796,466254,467617,469233,470325,471532,472796,473587,474200,474854,475562,476178,476813,477438,478075,478660,479369,480072,480752,481455,482132,482829,483546,484336,485818,487166,488298,489409,490668,491479,492380,493546,494877,496173,496830,497764,498576,499596,500257,501238,502153,502959,503910,504680,505246,506176,507290,508488,508975,510155,510935,511983,513069,514200,515236,516821,518235,519646,521178,522709,524271,525449,526878,528104,529707,531267,532430,533921,535481,536900,538385,539960,541414,543030,544179,545674,547004,548516,549625,550417,551334,552072,552799,554059,555637,557685,559725,561779,563764,565648,567688,569697,571699,573347,574888,576936,578984,581032,583080,585128,587170,589225,591273,593329,595377,597425,599459,601497,603519,605478,607491,609539,611582,613633,615681,617619,619511,621274,622822,624192,625270,626208,627095,627946,628768,629537,630280,631063,631802,632491,633208,633862,634544,635246,635937,636681,637312,637967,638604,639255,639894,640560,641249,641959,642903,643771,644653,645575,646529,647390,648205,649086,649866,650657,651386,652081,652802,653566,654288,655057,655848,656620,657371,658041,658661,659532,660581,661623,662587,663464,664270,664978,666583,667746,668871,669782,670719,671705,672854,674083,675365,676621,677826,678975,679577,680229,680805,681361,682018,682619,683215,683862,684523,685147,685843,686487,687114,687774,688367,689012,689624,690326,692374,694422,696140,697424,698625,699743,700782,701718,702677,703671,704428,705100,706167,707189,708172,709143,710026,710807,711463,712010,712592,713605],"sizes":[1524,1020,1142,1386,1224,1251,1423,1401,1456,1423,1224,1282,1346,1294,1080,1066,1390,1238,1415,1425,1184,1264,1183,1271,1276,1185,1248,1283,1165,1238,1236,1062,1326,1255,1262,1208,1360,1428,1226,1347,1176,1214,1250,1163,1257,1168,1085,1274,852,1290,1213,1193,1265,1240,1093,1420,1298,1390,1275,1264,1259,1222,1410,1223,1292,1236,1281,1331,1259,1186,1279,1425,1385,1357,1370,1341,1189,1233,1291,1309,1175,1419,1390,1369,1156,1400,1212,1316,1407,1393,1214,1254,1422,1395,1348,1168,1462,1314,1389,1354,1307,1282,1265,1019,1366,1371,1451,1291,1161,1339,1325,1235,1292,1345,1445,1270,1269,1086,1444,1081,1133,1172,1030,1126,1142,1067,1229,1170,1076,1346,1389,1203,1299,1196,1250,1405,1239,1261,1333,1233,1304,1261,1203,1256,1266,1238,1327,1185,1295,1255,1200,1247,1399,1253,1309,1351,1319,1208,1100,1258,1336,1333,1148,1221,1402,1244,1336,1289,1307,1361,1375,1322,1391,1391,1382,1384,1427,1342,1358,1255,1317,1229,1155,1265,1380,1277,1234,1313,1356,1270,1322,1412,1132,1176,1158,1227,1296,1222,1154,1172,1142,1218,1186,1264,1400,1284,1278,1330,1328,1411,1269,1428,1270,1321,1258,1244,1416,1282,1441,1222,1357,1320,1294,1405,1320,1238,1227,1263,1359,1259,1226,1355,1340,1206,1288,1336,1311,1286,1355,1308,1323,1440,1312,1339,1473,1298,1330,1291,1314,1418,1238,1361,1397,1191,1333,1214,1342,1351,1269,1345,1364,1303,1421,1097,1426,1336,1004,1244,1356,1194,1284,1067,1186,1290,1143,1165,1334,1360,1353,1313,1261,1368,1248,1438,1230,1297,1243,1344,1343,1366,1174,1266,1313,1314,1311,1314,1462,910,1194,1488,1039,1276,1436,1512,1129,1495,1267,1229,1415,1385,1395,1365,1414,1393,1196,1386,1250,1244,1199,1369,1351,1497,1355,1373,1418,1292,1316,1174,1259,1244,1249,1252,1311,1166,1170,1287,1165,1305,1328,1340,1075,1129,1342,1151,1135,971,775,847,716,886,932,854,1268,1121,1171,1185,977,965,1067,898,794,964,965,1026,989,1013,1028,878,1458,1363,1616,1092,1207,1264,791,613,654,708,616,635,625,637,585,709,703,680,703,677,697,717,790,1482,1348,1132,1111,1259,811,901,1166,1331,1296,657,934,812,1020,661,981,915,806,951,770,566,930,1114,1198,487,1180,780,1048,1086,1131,1036,1585,1414,1411,1532,1531,1562,1178,1429,1226,1603,1560,1163,1491,1560,1419,1485,1575,1454,1616,1149,1495,1330,1512,1109,792,917,738,727,1260,1578,2048,2040,2054,1985,1884,2040,2009,2002,1648,1541,2048,2048,2048,2048,2048,2042,2055,2048,2056,2048,2048,2034,2038,2022,1959,2013,2048,2043,2051,2048,1938,1892,1763,1548,1370,1078,938,887,851,822,769,743,783,739,689,717,654,682,702,691,744,631,655,637,651,639,666,689,710,944,868,882,922,954,861,815,881,780,791,729,695,721,764,722,769,791,772,751,670,620,871,1049,1042,964,877,806,708,1605,1163,1125,911,937,986,1149,1229,1282,1256,1205,1149,602,652,576,556,657,601,596,647,661,624,696,644,627,660,593,645,612,702,2048,2048,1718,1284,1201,1118,1039,936,959,994,757,672,1067,1022,983,971,883,781,656,547,582,1013,372],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,1,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pyerfa-2.0.0.1-py310h8a38847_1.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_pyerfa-2.0.0.1-py310h8a38847_1.tar.bz2.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/__init__.py", "start": 13812, "end": 14245}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/_version.py", "start": 13665, "end": 13812}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/core.py", "start": 16294, "end": 754181}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/helpers.py", "start": 110, "end": 13665}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/ufunc.cpython-310.so", "start": 754181, "end": 1210954}, {"filename": "/home/runner/env/lib/python3.10/site-packages/erfa/version.py", "start": 14245, "end": 16294}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pyerfa-0.0.0.dist-info/direct_url.json", "start": 0, "end": 110}]});
  })();
