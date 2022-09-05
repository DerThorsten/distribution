
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
      var PACKAGE_NAME = 'pyb2d-0.7.3-py310h57b18ff_0.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'pyb2d-0.7.3-py310h57b18ff_0.tar.bz2.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "b2d", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/b2d", "testbed", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/b2d/testbed", "backend", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend", "jupyter", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend", "no_gui", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend", "gif_gui", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend", "kivy", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend", "pygame", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend", "matplotlib_gif_gui", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":800282,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1071,2006,2854,3659,4676,5601,6272,7076,8140,9041,9794,10633,11166,12045,12706,13760,15002,16132,17075,17984,19135,20206,21017,22208,23219,24297,25185,26223,27316,28549,29586,30551,31711,32648,33767,34413,35144,36005,36542,37538,38257,38704,39420,40053,40735,41389,42238,42796,43709,44298,45085,45820,46603,47487,48236,49088,49765,50422,51274,51927,52688,53490,54265,55176,55940,56646,57386,58168,58971,59654,60427,61321,62371,63277,64074,64932,65783,66795,67636,68057,68421,68898,69615,70729,71458,72007,72684,73412,74112,74655,75454,76225,76925,77739,78453,79147,80029,80619,81436,82316,83340,84429,85336,86561,87281,88267,89122,90048,90912,92102,93177,93780,94372,95287,96121,96849,97541,98175,98930,99702,100429,101099,101920,102594,102989,103669,104507,105290,105848,106482,107229,107919,108537,109173,109979,110436,111218,111910,112473,113179,113807,114700,115602,116598,117483,118386,118939,119868,120533,121285,122240,123099,123744,124433,125445,126285,126957,127530,128111,129055,129713,130559,131345,131929,132459,133404,134314,135191,136049,136930,137708,138521,139633,140507,141996,143256,144498,145733,146957,148202,149310,150165,151225,152245,152959,153882,155127,156079,156955,158177,159167,160059,161013,161785,162550,163366,163884,164302,165204,165776,166778,167199,167845,168531,168973,169690,170307,170720,171132,171724,172512,173112,174014,174606,175348,176083,176895,177708,178438,179140,179725,180339,180963,181542,182205,182859,183542,184335,185124,185772,186481,187250,187905,188760,189596,190339,191145,191821,192600,193313,194097,194894,195577,196360,197114,197637,198150,198864,199503,200081,200708,201290,201774,202384,202956,203486,204149,204780,205795,206791,207649,208473,209354,210066,210616,211497,212422,213237,213708,214088,214537,215272,216391,217147,217671,218387,219083,219796,220457,221195,221965,222636,223003,223318,223649,224201,224761,225305,225681,226209,226755,227223,227745,228499,229389,230083,230770,231591,232150,232986,233821,234767,235289,235791,236347,236761,237297,237844,238669,239624,240829,241835,242533,243395,244306,245036,245893,247052,247943,248647,249172,249667,250462,251058,251709,252688,253523,254232,254966,255594,256397,257175,257944,258707,259600,260210,260621,261219,261685,262206,262695,263195,263789,264217,264914,265739,266547,267183,267761,268449,269137,269848,270428,271200,271752,272415,273155,273722,274389,274914,275497,276099,276674,277246,277835,278368,278946,279350,279900,280295,280868,281452,281980,282511,283290,284205,284967,285714,286538,287037,287811,288591,289299,290172,291122,291795,292245,292862,293389,294279,295169,295815,296537,297575,298346,299076,299554,300243,301239,302048,302985,303686,304297,304738,305759,306647,307213,307598,308299,308871,309265,309892,310498,311008,311415,312220,312971,313851,314700,315453,316147,316974,317640,318273,318951,321003,322448,323637,324859,326020,327136,328303,329457,330584,331727,332873,334025,335254,336683,338370,340038,341714,343259,344735,346398,347572,349232,350855,352247,353864,355500,357078,358435,360088,361205,362849,364402,366043,367658,369385,371031,372289,373803,375568,377208,378903,380576,382092,383690,385306,386756,388302,390008,391678,392677,393034,394387,395829,397342,398602,399417,400797,402208,403390,404339,405021,405860,407282,408597,410116,411412,413118,414379,415471,416824,418034,419452,420673,422048,423609,424939,426249,427094,428203,429163,430061,431647,433228,434552,436134,437615,439119,440751,441636,443191,444773,446327,447904,449318,450729,452218,453676,455193,456291,457510,458832,460341,461951,463585,465089,466624,468035,469701,471274,472459,474093,475683,477050,478657,480179,480957,482593,484203,485659,487079,487720,488697,489660,491204,492751,493597,494822,496080,496880,498091,499299,500767,502287,503368,504396,505812,506456,507343,507968,508803,509753,510658,511930,513065,514355,514939,515913,517240,518406,519302,519783,520265,521475,522403,523366,524418,525386,526309,527546,528765,529809,530521,531587,532477,533282,534144,534887,535628,536663,537885,538912,540317,541103,542346,543826,545054,546546,547990,548770,550043,550985,552129,552913,553752,554453,555804,557294,558041,558843,559819,560694,561659,562944,563594,564611,565429,566275,567128,567980,568800,569640,570486,571584,572239,573275,574609,575890,576761,577626,578691,579838,581211,582237,583547,584156,584738,585213,585978,586951,588153,589178,590120,591501,592695,593935,595069,596107,597324,598320,599322,600494,601536,602310,603363,604391,605250,606003,607019,608183,609314,610798,611542,612520,614081,615237,616475,617915,619555,620960,622462,623966,625429,627041,628568,630226,631894,633560,635148,636760,638347,640059,641469,642294,643838,645111,646250,647462,648608,649274,650493,651651,652685,653789,654939,656141,656884,657486,658439,659656,660611,661363,662676,663721,664907,665645,666223,667465,668087,668669,669535,670568,671653,672610,673989,675509,677060,678138,679437,680802,682092,683263,684421,686073,687603,688977,690281,691636,693182,694538,695572,696471,697492,698602,699585,700637,701624,702864,703847,704663,705523,706386,707401,707876,708399,709293,710357,711295,712248,713404,714773,715657,716542,717650,718420,719319,719859,721126,722538,723734,724798,725774,727198,728414,729834,730975,732267,733578,734630,735430,736509,737613,739053,739997,740996,742218,743346,744663,745996,747392,748563,749627,750611,752001,752899,754371,755844,757213,758758,759926,761233,762437,763393,764151,764783,765519,766058,766759,767587,768201,769368,770296,771343,772311,773040,773754,774801,775742,776758,777717,778593,779458,780423,781517,782319,783352,784267,785450,786389,787530,788479,789412,790304,791383,792422,793414,794379,795560,796574,797429,798336,799123],"sizes":[1071,935,848,805,1017,925,671,804,1064,901,753,839,533,879,661,1054,1242,1130,943,909,1151,1071,811,1191,1011,1078,888,1038,1093,1233,1037,965,1160,937,1119,646,731,861,537,996,719,447,716,633,682,654,849,558,913,589,787,735,783,884,749,852,677,657,852,653,761,802,775,911,764,706,740,782,803,683,773,894,1050,906,797,858,851,1012,841,421,364,477,717,1114,729,549,677,728,700,543,799,771,700,814,714,694,882,590,817,880,1024,1089,907,1225,720,986,855,926,864,1190,1075,603,592,915,834,728,692,634,755,772,727,670,821,674,395,680,838,783,558,634,747,690,618,636,806,457,782,692,563,706,628,893,902,996,885,903,553,929,665,752,955,859,645,689,1012,840,672,573,581,944,658,846,786,584,530,945,910,877,858,881,778,813,1112,874,1489,1260,1242,1235,1224,1245,1108,855,1060,1020,714,923,1245,952,876,1222,990,892,954,772,765,816,518,418,902,572,1002,421,646,686,442,717,617,413,412,592,788,600,902,592,742,735,812,813,730,702,585,614,624,579,663,654,683,793,789,648,709,769,655,855,836,743,806,676,779,713,784,797,683,783,754,523,513,714,639,578,627,582,484,610,572,530,663,631,1015,996,858,824,881,712,550,881,925,815,471,380,449,735,1119,756,524,716,696,713,661,738,770,671,367,315,331,552,560,544,376,528,546,468,522,754,890,694,687,821,559,836,835,946,522,502,556,414,536,547,825,955,1205,1006,698,862,911,730,857,1159,891,704,525,495,795,596,651,979,835,709,734,628,803,778,769,763,893,610,411,598,466,521,489,500,594,428,697,825,808,636,578,688,688,711,580,772,552,663,740,567,667,525,583,602,575,572,589,533,578,404,550,395,573,584,528,531,779,915,762,747,824,499,774,780,708,873,950,673,450,617,527,890,890,646,722,1038,771,730,478,689,996,809,937,701,611,441,1021,888,566,385,701,572,394,627,606,510,407,805,751,880,849,753,694,827,666,633,678,2052,1445,1189,1222,1161,1116,1167,1154,1127,1143,1146,1152,1229,1429,1687,1668,1676,1545,1476,1663,1174,1660,1623,1392,1617,1636,1578,1357,1653,1117,1644,1553,1641,1615,1727,1646,1258,1514,1765,1640,1695,1673,1516,1598,1616,1450,1546,1706,1670,999,357,1353,1442,1513,1260,815,1380,1411,1182,949,682,839,1422,1315,1519,1296,1706,1261,1092,1353,1210,1418,1221,1375,1561,1330,1310,845,1109,960,898,1586,1581,1324,1582,1481,1504,1632,885,1555,1582,1554,1577,1414,1411,1489,1458,1517,1098,1219,1322,1509,1610,1634,1504,1535,1411,1666,1573,1185,1634,1590,1367,1607,1522,778,1636,1610,1456,1420,641,977,963,1544,1547,846,1225,1258,800,1211,1208,1468,1520,1081,1028,1416,644,887,625,835,950,905,1272,1135,1290,584,974,1327,1166,896,481,482,1210,928,963,1052,968,923,1237,1219,1044,712,1066,890,805,862,743,741,1035,1222,1027,1405,786,1243,1480,1228,1492,1444,780,1273,942,1144,784,839,701,1351,1490,747,802,976,875,965,1285,650,1017,818,846,853,852,820,840,846,1098,655,1036,1334,1281,871,865,1065,1147,1373,1026,1310,609,582,475,765,973,1202,1025,942,1381,1194,1240,1134,1038,1217,996,1002,1172,1042,774,1053,1028,859,753,1016,1164,1131,1484,744,978,1561,1156,1238,1440,1640,1405,1502,1504,1463,1612,1527,1658,1668,1666,1588,1612,1587,1712,1410,825,1544,1273,1139,1212,1146,666,1219,1158,1034,1104,1150,1202,743,602,953,1217,955,752,1313,1045,1186,738,578,1242,622,582,866,1033,1085,957,1379,1520,1551,1078,1299,1365,1290,1171,1158,1652,1530,1374,1304,1355,1546,1356,1034,899,1021,1110,983,1052,987,1240,983,816,860,863,1015,475,523,894,1064,938,953,1156,1369,884,885,1108,770,899,540,1267,1412,1196,1064,976,1424,1216,1420,1141,1292,1311,1052,800,1079,1104,1440,944,999,1222,1128,1317,1333,1396,1171,1064,984,1390,898,1472,1473,1369,1545,1168,1307,1204,956,758,632,736,539,701,828,614,1167,928,1047,968,729,714,1047,941,1016,959,876,865,965,1094,802,1033,915,1183,939,1141,949,933,892,1079,1039,992,965,1181,1014,855,907,787,1159],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pyb2d-0.7.3-py310h57b18ff_0.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_pyb2d-0.7.3-py310h57b18ff_0.tar.bz2.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/__init__.py", "start": 17893, "end": 22393}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/_b2d.so", "start": 41284, "end": 1657429}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_batch_api.py", "start": 23800, "end": 26802}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_body.py", "start": 36878, "end": 41284}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_collision.py", "start": 0, "end": 462}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_contact.py", "start": 7305, "end": 7414}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_draw.py", "start": 22393, "end": 23800}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_fixture.py", "start": 26802, "end": 28967}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_joints.py", "start": 28967, "end": 30647}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_math.py", "start": 7414, "end": 9321}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_particles.py", "start": 9321, "end": 16473}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_shapes.py", "start": 30647, "end": 33042}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_user_data.py", "start": 16473, "end": 16901}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/extend_world.py", "start": 462, "end": 7305}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/plot.py", "start": 33042, "end": 36878}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/query_callback.py", "start": 17523, "end": 17893}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/__init__.py", "start": 1663770, "end": 1663849}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/__init__.py", "start": 1667300, "end": 1667300}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/default_backend.py", "start": 1664908, "end": 1667300}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/gif_gui/__init__.py", "start": 1687075, "end": 1687103}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/gif_gui/gif_gui.py", "start": 1685213, "end": 1687075}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/gif_gui/opencv_debug_draw.py", "start": 1687103, "end": 1693148}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/gui_base.py", "start": 1663849, "end": 1664908}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/jupyter/__init__.py", "start": 1683319, "end": 1683402}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/jupyter/jupyter_batch_debug_draw.py", "start": 1667300, "end": 1672552}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/jupyter/jupyter_gui.py", "start": 1672552, "end": 1683319}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/kivy/__init__.py", "start": 1693148, "end": 1693178}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/kivy/kivy_debug_draw.py", "start": 1697625, "end": 1702636}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/kivy/kivy_gui.py", "start": 1693178, "end": 1697625}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/matplotlib_gif_gui/__init__.py", "start": 1714037, "end": 1714086}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/matplotlib_gif_gui/matplotlib_gif_gui.py", "start": 1712275, "end": 1714037}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/no_gui/__init__.py", "start": 1685187, "end": 1685213}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/no_gui/no_gui.py", "start": 1683402, "end": 1685187}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/pygame/__init__.py", "start": 1707558, "end": 1707592}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/pygame/pygame_debug_draw.py", "start": 1707592, "end": 1712275}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/backend/pygame/pygame_gui.py", "start": 1702636, "end": 1707558}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/testbed/testbed_base.py", "start": 1657429, "end": 1663770}, {"filename": "/home/runner/env/lib/python3.10/site-packages/b2d/tools.py", "start": 16901, "end": 17523}]});
  })();
