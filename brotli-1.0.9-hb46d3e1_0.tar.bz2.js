
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
      var PACKAGE_NAME = 'brotli-1.0.9-hb46d3e1_0.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'brotli-1.0.9-hb46d3e1_0.tar.bz2.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "Brotli-1.0.9.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":1094038,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1703,3243,4633,6306,7935,9124,10303,11466,12681,14279,15421,16795,18232,19742,20868,22383,23668,25076,26386,27883,29186,30414,31630,32932,34163,35387,36680,37922,39146,40437,41685,42933,44446,45938,47325,48859,50415,51984,53450,54974,56473,57889,59397,60917,62478,64017,65534,67008,68485,69959,71463,72977,74451,76014,77383,78869,80326,81654,82478,83804,85424,87055,88388,89920,91509,92564,93530,94572,95308,96966,98560,100022,101282,102862,104502,105953,107546,108680,109699,111349,112781,114464,116030,117640,118909,120403,121921,123465,124983,126632,128279,129909,131511,132365,134013,135112,136763,137773,139074,140613,142113,143741,145287,146803,148091,149455,150858,152542,154020,155274,156847,158347,159694,161015,161888,163132,164435,165873,166511,167907,169293,170583,172076,173299,174721,176022,177252,178432,179651,180908,182238,183422,184501,185645,187006,187042,187828,188876,189938,190094,190699,191760,192859,194032,195073,196062,196895,197817,198734,199606,200394,201327,202166,202980,203821,204736,205682,206475,207376,208249,209085,210000,210915,211777,212595,213454,214377,215146,216027,216966,217804,218675,219529,220390,221196,222012,222861,223928,225004,226046,227077,228120,229226,230244,231282,232342,233394,234461,235473,236542,237646,238729,239768,240770,242085,243332,244629,245953,247195,248510,249719,250998,252219,253505,254814,256060,257306,258573,259866,261127,262409,263631,264925,266108,267416,268722,270001,271278,272556,273835,275107,276341,277599,278852,280183,281649,283697,285754,287802,289850,291906,293954,296011,298059,300107,302155,304203,306260,308308,310356,312404,314452,316509,318557,320605,322653,324701,326749,328797,330845,332901,334949,337004,339052,341109,343157,345205,347253,349310,351367,353415,355463,357511,359559,361616,363671,365719,367776,369833,371890,373946,375994,378042,380090,382138,384186,386241,388289,390337,392385,394433,396489,398537,400585,402633,404690,406738,408612,410187,411455,412439,414495,416530,418537,420566,422526,424511,426558,428591,430641,432474,434364,436313,438291,440267,442245,444181,446153,448081,449984,451903,453697,455570,457479,459374,461332,462978,464816,466690,468563,470417,472142,473917,475757,477596,479368,481093,482844,484599,486367,488117,489675,491052,492847,494582,496328,498026,499660,501278,502900,504492,506025,507664,509381,511003,512529,514087,515616,517220,518603,520183,521689,523278,524720,525914,527203,528785,530166,531837,533298,534522,536096,537524,538651,540144,541702,543139,544549,545962,547288,548701,550397,551734,553005,554638,556199,557577,558945,560449,561879,563210,564949,566473,567889,569510,570853,571781,573303,574834,576269,577745,579550,580845,582170,583935,585420,586406,587686,589036,590420,591941,593341,594849,596195,597770,599242,600715,602320,603441,604757,606014,607177,608507,609728,610938,612272,613457,614709,615997,617187,618816,620283,621736,623283,624747,626413,627918,629533,630974,632578,634077,635499,637042,638502,640143,641651,643269,644711,646290,647658,649096,650681,652164,653604,655096,656092,657171,658473,660135,661522,663207,664842,665905,666817,667874,668721,670359,671931,673321,674552,676103,677818,679121,680803,682433,684011,685526,687249,688654,690362,691742,693332,694719,696395,698028,699691,701168,702876,703982,705673,706893,708620,710096,711819,713340,714604,715883,717355,718727,720409,721911,723609,725060,726403,727736,729159,730441,731888,733338,734674,736009,737557,738807,740029,741526,742753,743965,745305,746504,747600,748627,749763,751118,752756,753908,755163,757211,759241,761274,763294,765258,767265,769285,771339,773387,775170,777055,779021,781001,782971,784950,786885,788862,790749,792669,794567,796326,798197,800134,802026,803956,805601,807458,809306,811166,812938,814727,816526,818328,820151,821941,823737,825459,827199,828968,830712,832173,833610,835409,837162,838917,840623,842274,843919,845520,847133,848679,850326,852029,853676,855147,856704,858227,859803,861114,862730,864046,865368,866808,867518,867784,868831,869879,870546,870638,871700,872752,873559,875364,876110,877035,877908,878762,879692,880485,881379,882193,883086,883896,884798,885721,886618,887450,888305,889199,890064,890997,891871,892748,893554,894467,895283,896143,897090,897994,898825,899719,900542,901378,902154,903052,904018,905028,906085,907107,908156,909209,910274,911347,912373,913451,914496,915555,916638,917727,918828,919860,921033,922081,923367,924628,925941,927247,928481,929761,931044,932226,933496,934796,936096,937312,938597,939871,941116,942401,943670,944908,946150,947407,948741,949986,951266,952577,953856,955125,956347,957616,958852,960129,961398,963329,965377,967425,969473,971521,973569,975617,977665,979713,981761,983809,985857,987905,989953,992001,994049,996106,998163,1000220,1002268,1004316,1006364,1008412,1010460,1012517,1014565,1016613,1018670,1020718,1022766,1024814,1026869,1028917,1030974,1033022,1035070,1037118,1039166,1041214,1043262,1045310,1047367,1049422,1051470,1053526,1055574,1057622,1059679,1061727,1063775,1065823,1067880,1069937,1071985,1074033,1076081,1078129,1080177,1082225,1084273,1086321,1088369,1089961,1091296,1092486,1093572],"sizes":[1703,1540,1390,1673,1629,1189,1179,1163,1215,1598,1142,1374,1437,1510,1126,1515,1285,1408,1310,1497,1303,1228,1216,1302,1231,1224,1293,1242,1224,1291,1248,1248,1513,1492,1387,1534,1556,1569,1466,1524,1499,1416,1508,1520,1561,1539,1517,1474,1477,1474,1504,1514,1474,1563,1369,1486,1457,1328,824,1326,1620,1631,1333,1532,1589,1055,966,1042,736,1658,1594,1462,1260,1580,1640,1451,1593,1134,1019,1650,1432,1683,1566,1610,1269,1494,1518,1544,1518,1649,1647,1630,1602,854,1648,1099,1651,1010,1301,1539,1500,1628,1546,1516,1288,1364,1403,1684,1478,1254,1573,1500,1347,1321,873,1244,1303,1438,638,1396,1386,1290,1493,1223,1422,1301,1230,1180,1219,1257,1330,1184,1079,1144,1361,36,786,1048,1062,156,605,1061,1099,1173,1041,989,833,922,917,872,788,933,839,814,841,915,946,793,901,873,836,915,915,862,818,859,923,769,881,939,838,871,854,861,806,816,849,1067,1076,1042,1031,1043,1106,1018,1038,1060,1052,1067,1012,1069,1104,1083,1039,1002,1315,1247,1297,1324,1242,1315,1209,1279,1221,1286,1309,1246,1246,1267,1293,1261,1282,1222,1294,1183,1308,1306,1279,1277,1278,1279,1272,1234,1258,1253,1331,1466,2048,2057,2048,2048,2056,2048,2057,2048,2048,2048,2048,2057,2048,2048,2048,2048,2057,2048,2048,2048,2048,2048,2048,2048,2056,2048,2055,2048,2057,2048,2048,2048,2057,2057,2048,2048,2048,2048,2057,2055,2048,2057,2057,2057,2056,2048,2048,2048,2048,2048,2055,2048,2048,2048,2048,2056,2048,2048,2048,2057,2048,1874,1575,1268,984,2056,2035,2007,2029,1960,1985,2047,2033,2050,1833,1890,1949,1978,1976,1978,1936,1972,1928,1903,1919,1794,1873,1909,1895,1958,1646,1838,1874,1873,1854,1725,1775,1840,1839,1772,1725,1751,1755,1768,1750,1558,1377,1795,1735,1746,1698,1634,1618,1622,1592,1533,1639,1717,1622,1526,1558,1529,1604,1383,1580,1506,1589,1442,1194,1289,1582,1381,1671,1461,1224,1574,1428,1127,1493,1558,1437,1410,1413,1326,1413,1696,1337,1271,1633,1561,1378,1368,1504,1430,1331,1739,1524,1416,1621,1343,928,1522,1531,1435,1476,1805,1295,1325,1765,1485,986,1280,1350,1384,1521,1400,1508,1346,1575,1472,1473,1605,1121,1316,1257,1163,1330,1221,1210,1334,1185,1252,1288,1190,1629,1467,1453,1547,1464,1666,1505,1615,1441,1604,1499,1422,1543,1460,1641,1508,1618,1442,1579,1368,1438,1585,1483,1440,1492,996,1079,1302,1662,1387,1685,1635,1063,912,1057,847,1638,1572,1390,1231,1551,1715,1303,1682,1630,1578,1515,1723,1405,1708,1380,1590,1387,1676,1633,1663,1477,1708,1106,1691,1220,1727,1476,1723,1521,1264,1279,1472,1372,1682,1502,1698,1451,1343,1333,1423,1282,1447,1450,1336,1335,1548,1250,1222,1497,1227,1212,1340,1199,1096,1027,1136,1355,1638,1152,1255,2048,2030,2033,2020,1964,2007,2020,2054,2048,1783,1885,1966,1980,1970,1979,1935,1977,1887,1920,1898,1759,1871,1937,1892,1930,1645,1857,1848,1860,1772,1789,1799,1802,1823,1790,1796,1722,1740,1769,1744,1461,1437,1799,1753,1755,1706,1651,1645,1601,1613,1546,1647,1703,1647,1471,1557,1523,1576,1311,1616,1316,1322,1440,710,266,1047,1048,667,92,1062,1052,807,1805,746,925,873,854,930,793,894,814,893,810,902,923,897,832,855,894,865,933,874,877,806,913,816,860,947,904,831,894,823,836,776,898,966,1010,1057,1022,1049,1053,1065,1073,1026,1078,1045,1059,1083,1089,1101,1032,1173,1048,1286,1261,1313,1306,1234,1280,1283,1182,1270,1300,1300,1216,1285,1274,1245,1285,1269,1238,1242,1257,1334,1245,1280,1311,1279,1269,1222,1269,1236,1277,1269,1931,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2057,2057,2057,2048,2048,2048,2048,2048,2057,2048,2048,2057,2048,2048,2048,2055,2048,2057,2048,2048,2048,2048,2048,2048,2048,2057,2055,2048,2056,2048,2048,2057,2048,2048,2048,2057,2057,2048,2048,2048,2048,2048,2048,2048,2048,2048,1592,1335,1190,1086,466],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,1,0,0,0,0,1,1,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_brotli-1.0.9-hb46d3e1_0.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_brotli-1.0.9-hb46d3e1_0.tar.bz2.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/libbrotlicommon.so", "start": 591162, "end": 719000}, {"filename": "/home/runner/env/lib/libbrotlidec.so", "start": 719000, "end": 760902}, {"filename": "/home/runner/env/lib/libbrotlienc.so", "start": 0, "end": 591162}, {"filename": "/home/runner/env/lib/python3.10/site-packages/Brotli-1.0.9.dist-info/direct_url.json", "start": 1507860, "end": 1507965}, {"filename": "/home/runner/env/lib/python3.10/site-packages/_brotli.cpython-310.so", "start": 760902, "end": 1506003}, {"filename": "/home/runner/env/lib/python3.10/site-packages/brotli.py", "start": 1506003, "end": 1507860}]});
  })();