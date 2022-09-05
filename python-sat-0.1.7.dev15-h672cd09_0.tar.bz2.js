
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
      var PACKAGE_NAME = 'python-sat-0.1.7.dev15-h672cd09_0.tar.bz2.data';
      var REMOTE_PACKAGE_BASE = 'python-sat-0.1.7.dev15-h672cd09_0.tar.bz2.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "python_sat-0.1.7.dev15.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "pysat", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pysat", "examples", true, true);
Module['FS_createPath']("/home/runner/env", "bin", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":1261102,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1233,2046,3130,4088,5189,6200,7737,9376,10889,12416,13444,14749,15885,16776,17735,18732,19678,20516,21731,23133,24607,25970,27304,28475,29848,31342,32468,33688,35184,36675,38131,39196,40019,40876,41644,42378,43567,44666,45399,46214,47115,47910,48874,49784,50604,51537,52537,53563,54459,55307,56275,57381,58036,58705,59488,60153,60923,61602,62294,63091,63727,64496,65138,66081,66876,68264,69482,70531,71572,72483,73574,74504,75515,76276,77234,78128,79227,80212,81232,82251,83397,84471,85533,86511,87529,88450,89158,90295,91375,92377,93412,94409,95502,96543,97468,98606,99736,100715,101760,102784,103833,104901,105946,107043,108113,109195,110317,111432,112445,113446,114516,115611,116721,117765,118844,119915,121186,122033,122761,123543,124211,124969,125634,126327,127018,127715,128473,129124,129824,130566,131248,131910,132600,133217,133880,134567,135218,135988,136754,137498,138198,139391,140462,141555,142779,143968,145143,146358,147497,148638,149783,150922,152348,153786,155184,156698,158187,159872,161328,162884,164106,165529,166824,168019,169593,171157,172786,173758,175267,176680,178238,179735,181303,182773,184268,185771,187014,188313,189637,191116,192623,194207,194903,196115,197610,199207,200690,201949,203113,204324,205256,206814,208212,209567,210866,212254,213772,215243,216825,218427,220084,221537,223027,224518,225831,227319,228895,230322,231759,233241,234748,236145,237524,238988,239873,241243,242804,244016,245611,246948,248479,249855,251135,252179,253740,255264,256379,257363,258908,260360,261612,263233,264830,266198,267582,268866,269966,270638,271329,272012,272691,273414,274060,274716,275366,276111,276750,277469,278071,278653,279274,279853,280901,281840,282787,283711,284987,286297,287710,288888,289883,291060,291980,293177,294209,295261,296867,298465,300049,301646,302644,303954,305600,307040,308655,310286,311221,312415,313977,315505,317026,317882,318727,319621,320540,321306,321879,322312,323020,323875,324758,325606,326270,327204,328164,329674,331159,332318,333675,335076,336536,337803,339251,340883,342259,343875,345477,347120,348618,350092,351662,353057,354654,356167,357473,358777,359905,361490,363082,364691,366369,368023,369621,371132,372285,373346,374841,376378,377558,379012,380569,382029,383525,385171,386895,388395,389892,391400,392867,394251,395769,397099,398576,400143,401309,402355,403722,404994,406317,407892,408928,410498,412109,413594,415047,416661,418266,419901,421450,423008,424622,425772,427224,428629,429863,431166,432524,433988,435485,436686,438253,439618,441135,442668,444231,445779,447379,448789,450399,451896,452885,454324,455696,457125,458688,459872,460973,462351,463616,464925,466438,468003,469620,470669,472229,473810,475412,476921,478379,479800,481464,483086,484449,485974,487601,488902,490169,491709,493067,494339,495484,496877,498488,499838,501477,502857,504435,505638,507309,508887,510455,511876,513337,514972,516554,517860,519348,520978,522611,524106,525152,526591,527975,529434,530503,531991,533561,535164,536527,538217,539650,541179,542502,544104,545668,547136,548607,550141,551707,552936,554545,556167,557763,558929,560188,561565,563108,564145,565256,566713,568105,569560,571213,572756,574186,575797,577405,579072,580526,582128,583671,585260,586773,587724,589154,590551,592077,593352,594326,595678,597261,598717,600240,601599,603133,604681,606163,607448,608916,610256,611452,612819,614282,615882,617176,618732,620301,621714,623222,624691,626263,627839,629158,630765,632138,633599,634797,635707,636619,637716,638828,639910,641003,642235,643348,644441,645545,646990,648026,649651,651164,652380,653908,655429,657078,658584,660084,661575,663223,664880,666366,667556,668882,670459,672059,673618,675107,676576,677879,679187,680670,682012,683225,684652,685879,687032,688534,690140,691683,693264,694870,696424,697896,699261,700535,702058,703655,704952,706440,707949,709425,711069,712671,714265,715796,717323,718764,720181,721481,722964,724539,725991,727594,729086,730695,732212,733701,735253,736795,738207,739668,740990,742266,743873,745288,746759,748348,749960,751614,753082,754719,756246,757699,759116,759795,761294,762516,763523,764604,765824,767180,768192,769276,770350,771756,772755,773754,775168,776169,777181,778381,779595,780597,781676,782885,783914,784918,786011,787299,788290,789299,790601,791731,792682,793762,795009,796054,797058,798104,799460,800477,801486,802764,803877,804896,806003,807167,808257,809524,810799,812108,813405,814583,815944,817424,818651,819893,821066,822333,823277,824383,825494,826486,827346,828650,829336,830403,831535,832329,833564,835013,835633,835658,835683,835708,835733,835758,835783,835808,835833,835858,835883,835908,835933,835958,835983,836008,836033,836058,836083,836108,836133,836158,836183,836208,836233,836258,836283,836308,836333,836358,836383,836408,836433,836458,836483,836508,836533,836558,836583,836608,836633,836658,836683,836708,836733,836758,836783,836808,836833,836858,836883,836908,836933,836958,836983,837008,837033,837058,837083,837108,837133,837158,837183,837208,837233,837258,837283,837308,837333,837358,837383,837408,837433,837458,837483,837508,837533,837558,837583,837608,837633,837658,837683,837708,837733,837758,837783,837808,837833,837858,837883,837908,837933,837958,837983,838008,838033,838058,838083,838108,838133,838158,838183,838208,838233,838258,838283,838308,838333,838358,838383,838408,838433,838458,838483,838508,838533,838558,838583,838608,838633,838658,838683,838708,838733,838758,838783,838808,838833,838858,838883,838908,838933,838958,838983,839008,839033,839058,839083,839108,839133,839158,839183,839208,839233,839258,839283,839308,839333,839358,839383,839408,839433,839458,839483,839508,839533,839558,839583,839608,839633,839658,839683,839708,839733,839758,839783,839808,839833,839858,839883,839908,839933,839958,839983,840008,840033,840058,840083,840108,840133,840158,840183,840208,840233,840258,840283,840308,840333,840358,840383,840408,840433,840458,840483,840508,840533,840558,840583,840608,840633,840658,840683,840708,840733,840758,840783,840808,840833,840858,840883,840908,840933,840958,840983,841008,841033,841058,841083,841108,841133,841158,841183,841208,841233,841258,841283,841308,841333,841358,841383,841408,841433,841458,841483,841508,841533,841558,841583,841608,841633,841658,841683,841708,841733,841758,841783,841808,841833,841858,841883,841908,841933,841958,841983,842008,842033,842058,842083,842108,842133,842158,842183,842208,842233,842258,842283,842308,842333,842358,842383,842408,842433,842458,842483,842508,842533,842558,842583,842608,842633,842658,842683,842708,842733,842758,842783,842808,842833,842858,842883,842908,842933,842958,842983,843008,843033,843058,843083,843108,843133,843158,843183,843208,843233,843258,843283,843308,843333,843358,843383,843408,843433,843458,843483,843508,843533,843558,843583,843608,843633,843658,843683,843708,843733,843758,843783,843808,843833,843858,843883,843908,843933,843958,843983,844008,844033,844058,844083,844108,844133,844158,844183,844208,844233,844258,844283,844308,844333,844358,844383,844408,844433,844458,844483,844508,844533,844558,844583,844608,844633,844658,844683,844708,844733,844758,844783,844808,844833,844858,844883,844908,844933,844958,844983,845008,845033,845058,845083,845108,845133,845158,845183,845208,845233,845258,845283,845308,845333,845358,845383,845408,845433,845458,845483,845508,845533,845558,845583,845608,845633,845658,845683,845708,845733,845758,845783,845808,845833,845858,845883,845908,845933,845958,845983,846008,846033,846058,846083,846108,846133,846158,846183,846208,846233,846258,846283,846308,846333,846358,846383,846408,846433,846458,846483,846508,846533,846558,846583,846608,846633,846658,846683,846708,846733,846758,846783,846808,846833,846858,846883,846908,846933,846958,846983,847008,847033,847058,847083,847108,847133,847158,847183,847208,847233,847258,847283,847308,847333,847358,847383,847408,847433,847458,847483,847508,847533,847558,847583,847608,847633,847658,847683,847708,847733,847758,847783,847808,847833,847858,847883,847908,847933,847958,847983,848008,848033,848058,848083,848108,848133,848158,848183,848208,848233,848258,848283,848308,848333,848358,848383,848408,848433,848458,848483,848508,848533,848558,848583,848608,848633,848658,848683,848708,848733,848758,848783,848808,848833,848858,848883,848908,848933,848958,848983,849008,849033,849058,849083,849108,849133,849158,849183,849208,849233,849258,849283,849308,849333,849358,849383,849408,849433,849458,849483,849508,849533,849558,849583,849608,849633,849658,849683,849708,849733,849758,849783,849808,849833,849858,849883,849908,849933,849958,849983,850008,850033,850058,850083,850108,850133,850158,850183,850208,850233,850258,850283,850308,850333,850358,850383,850408,850433,850458,850483,850508,850533,850558,850583,850608,850633,850658,850683,850708,850733,850758,850783,850808,850833,850858,850883,850908,850933,850958,850983,851008,851033,851058,851083,851108,851133,851158,851183,851208,851233,851258,851283,851308,851333,851358,851383,851408,851433,851458,851483,851508,851533,851558,851583,851608,851633,851658,851683,851708,851733,851758,851783,851808,851833,851858,851883,851908,851933,851958,851983,852008,852033,852058,852083,852108,852133,852158,852183,852208,852233,852258,852283,852308,852333,852358,852383,852408,852433,852458,852483,852508,852533,852558,852583,852608,852633,852658,852683,852708,852733,852758,852783,852808,852833,852858,852883,852908,852933,852958,852983,853008,853033,853058,853083,853108,853133,853158,853183,853208,853233,853258,853283,853308,853333,853358,853383,853408,853433,853458,853483,853508,853533,853558,853583,853608,853633,853658,853683,853708,853733,853758,853783,853808,853833,853858,853883,853908,853933,853958,853983,854008,854033,854058,854083,854108,854133,854158,854183,854208,854233,854258,854283,854308,854333,854358,854383,854408,854433,854458,854483,854508,854533,854558,854583,854608,854633,854658,854683,854708,854733,854758,854783,854808,854833,854858,854883,854908,854933,854958,854983,855008,855033,855058,855083,855108,855133,855158,855183,855208,855233,855258,855283,855308,855333,855358,855383,855408,855433,855458,855483,855508,855533,855558,855583,855608,855633,855658,855683,855708,855733,855758,855783,855808,855833,855858,855883,855908,855933,855958,855983,856008,856033,856058,856083,856108,856133,856158,856183,856208,856233,856258,856283,856308,856333,856358,856383,856408,856433,856458,856483,856508,856533,856558,856583,856608,856633,856658,856683,856708,856733,856758,856783,856808,856833,856858,856883,856908,856933,856958,856983,857008,857033,857058,857083,857108,857133,857158,857183,857208,857233,857258,857283,857308,857333,857358,857383,857408,857433,857458,857483,857508,857533,857558,857583,857608,857633,857658,857683,857708,857733,857758,857783,857808,857833,857858,857883,857908,857933,857958,857983,858008,858033,858058,858083,858108,858133,858158,858183,858208,858233,858258,858283,858308,858333,858358,858383,858408,858433,858458,858483,858508,858533,858558,858583,858608,858633,858658,858683,858708,858733,858758,858783,858808,858833,858858,858883,858908,858933,858958,858983,859008,859033,859058,859083,859108,859133,859158,859183,859208,859233,859258,859283,859308,859333,859358,859383,859408,859433,859458,859483,859508,859533,859558,859583,859608,859633,859658,859683,859708,859733,859758,859783,859808,859833,859858,859883,859908,859933,859958,859983,860008,860033,860058,860083,860108,860133,860158,860183,860208,860233,860258,860283,860308,860333,860358,860383,860408,860433,860458,860483,860508,860533,860558,860583,860608,860633,860658,860683,860708,860733,860758,860783,860808,860833,860858,860883,860908,860933,860958,860983,861008,861033,861058,861083,861108,861133,861158,861183,861208,861233,861258,861283,861308,861333,862264,863556,864925,866332,867621,868924,870079,871201,872329,873438,874510,875791,876862,877911,878730,879806,880987,882139,883308,884374,885557,886547,887620,888765,889723,890731,891765,892977,894200,895347,896588,897626,898632,899577,900598,901872,903048,904117,905305,906526,907296,908355,909377,910521,911779,913190,914490,915580,916904,918025,919142,919983,921126,922400,923554,924670,925865,927076,928047,929081,929939,931077,932186,933347,934425,935352,936313,937187,938232,939024,939887,940774,941812,942824,943584,944424,945324,946349,947025,947953,948880,949919,950639,951573,952467,953463,954343,955288,956176,957201,957895,958818,959716,960720,961485,962395,963283,964338,965191,966077,966971,967948,968768,969636,970537,971536,972271,973188,974023,975084,975852,976772,977644,978628,979353,980303,981174,982399,983609,984702,985904,987426,988849,989962,991206,992531,993815,995127,996265,997476,998713,999793,1001009,1002154,1003188,1004546,1006027,1007261,1008533,1009749,1010995,1012247,1013023,1014311,1015392,1016707,1018164,1019340,1020651,1021937,1023099,1024176,1025112,1026541,1027866,1029160,1030357,1031606,1032834,1034063,1035202,1036396,1037495,1038970,1040362,1041664,1042964,1044132,1045235,1046443,1047717,1048884,1050073,1051307,1052865,1053905,1055174,1056425,1057650,1058974,1060100,1061447,1062486,1063834,1065123,1066392,1067690,1068921,1070246,1071584,1072885,1074192,1075383,1076729,1077983,1079084,1080278,1081507,1082470,1083751,1084985,1086250,1087331,1088598,1089883,1091109,1092137,1093299,1094487,1095716,1097068,1098379,1099493,1100710,1101874,1103171,1104265,1105450,1106510,1107560,1108839,1110239,1111490,1112722,1113977,1115260,1116496,1117765,1119068,1120335,1121389,1122778,1124151,1125446,1126641,1127770,1128964,1130171,1131231,1132697,1133892,1135159,1136408,1137609,1138804,1139962,1141252,1142467,1143801,1144948,1146317,1147664,1148970,1150202,1151437,1152670,1153898,1155077,1156302,1157320,1158770,1160182,1161451,1162774,1163928,1165002,1166238,1167508,1168683,1169832,1171296,1172343,1173606,1174865,1176093,1177434,1178564,1179909,1180933,1182267,1183539,1184844,1186126,1187368,1188696,1190038,1191384,1192678,1193895,1195230,1196481,1197558,1198774,1199995,1200959,1202241,1203471,1204737,1205793,1207064,1208344,1209598,1210662,1211837,1213029,1214274,1215611,1216901,1217987,1219210,1220352,1221633,1222758,1223910,1225018,1226017,1227282,1228665,1229929,1231196,1232446,1233716,1234954,1236210,1237511,1238796,1239885,1241250,1242630,1243955,1245147,1246264,1247502,1248722,1249768,1251189,1252404,1253698,1254940,1256140,1257364,1258553,1259821,1261037],"sizes":[1233,813,1084,958,1101,1011,1537,1639,1513,1527,1028,1305,1136,891,959,997,946,838,1215,1402,1474,1363,1334,1171,1373,1494,1126,1220,1496,1491,1456,1065,823,857,768,734,1189,1099,733,815,901,795,964,910,820,933,1000,1026,896,848,968,1106,655,669,783,665,770,679,692,797,636,769,642,943,795,1388,1218,1049,1041,911,1091,930,1011,761,958,894,1099,985,1020,1019,1146,1074,1062,978,1018,921,708,1137,1080,1002,1035,997,1093,1041,925,1138,1130,979,1045,1024,1049,1068,1045,1097,1070,1082,1122,1115,1013,1001,1070,1095,1110,1044,1079,1071,1271,847,728,782,668,758,665,693,691,697,758,651,700,742,682,662,690,617,663,687,651,770,766,744,700,1193,1071,1093,1224,1189,1175,1215,1139,1141,1145,1139,1426,1438,1398,1514,1489,1685,1456,1556,1222,1423,1295,1195,1574,1564,1629,972,1509,1413,1558,1497,1568,1470,1495,1503,1243,1299,1324,1479,1507,1584,696,1212,1495,1597,1483,1259,1164,1211,932,1558,1398,1355,1299,1388,1518,1471,1582,1602,1657,1453,1490,1491,1313,1488,1576,1427,1437,1482,1507,1397,1379,1464,885,1370,1561,1212,1595,1337,1531,1376,1280,1044,1561,1524,1115,984,1545,1452,1252,1621,1597,1368,1384,1284,1100,672,691,683,679,723,646,656,650,745,639,719,602,582,621,579,1048,939,947,924,1276,1310,1413,1178,995,1177,920,1197,1032,1052,1606,1598,1584,1597,998,1310,1646,1440,1615,1631,935,1194,1562,1528,1521,856,845,894,919,766,573,433,708,855,883,848,664,934,960,1510,1485,1159,1357,1401,1460,1267,1448,1632,1376,1616,1602,1643,1498,1474,1570,1395,1597,1513,1306,1304,1128,1585,1592,1609,1678,1654,1598,1511,1153,1061,1495,1537,1180,1454,1557,1460,1496,1646,1724,1500,1497,1508,1467,1384,1518,1330,1477,1567,1166,1046,1367,1272,1323,1575,1036,1570,1611,1485,1453,1614,1605,1635,1549,1558,1614,1150,1452,1405,1234,1303,1358,1464,1497,1201,1567,1365,1517,1533,1563,1548,1600,1410,1610,1497,989,1439,1372,1429,1563,1184,1101,1378,1265,1309,1513,1565,1617,1049,1560,1581,1602,1509,1458,1421,1664,1622,1363,1525,1627,1301,1267,1540,1358,1272,1145,1393,1611,1350,1639,1380,1578,1203,1671,1578,1568,1421,1461,1635,1582,1306,1488,1630,1633,1495,1046,1439,1384,1459,1069,1488,1570,1603,1363,1690,1433,1529,1323,1602,1564,1468,1471,1534,1566,1229,1609,1622,1596,1166,1259,1377,1543,1037,1111,1457,1392,1455,1653,1543,1430,1611,1608,1667,1454,1602,1543,1589,1513,951,1430,1397,1526,1275,974,1352,1583,1456,1523,1359,1534,1548,1482,1285,1468,1340,1196,1367,1463,1600,1294,1556,1569,1413,1508,1469,1572,1576,1319,1607,1373,1461,1198,910,912,1097,1112,1082,1093,1232,1113,1093,1104,1445,1036,1625,1513,1216,1528,1521,1649,1506,1500,1491,1648,1657,1486,1190,1326,1577,1600,1559,1489,1469,1303,1308,1483,1342,1213,1427,1227,1153,1502,1606,1543,1581,1606,1554,1472,1365,1274,1523,1597,1297,1488,1509,1476,1644,1602,1594,1531,1527,1441,1417,1300,1483,1575,1452,1603,1492,1609,1517,1489,1552,1542,1412,1461,1322,1276,1607,1415,1471,1589,1612,1654,1468,1637,1527,1453,1417,679,1499,1222,1007,1081,1220,1356,1012,1084,1074,1406,999,999,1414,1001,1012,1200,1214,1002,1079,1209,1029,1004,1093,1288,991,1009,1302,1130,951,1080,1247,1045,1004,1046,1356,1017,1009,1278,1113,1019,1107,1164,1090,1267,1275,1309,1297,1178,1361,1480,1227,1242,1173,1267,944,1106,1111,992,860,1304,686,1067,1132,794,1235,1449,620,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,931,1292,1369,1407,1289,1303,1155,1122,1128,1109,1072,1281,1071,1049,819,1076,1181,1152,1169,1066,1183,990,1073,1145,958,1008,1034,1212,1223,1147,1241,1038,1006,945,1021,1274,1176,1069,1188,1221,770,1059,1022,1144,1258,1411,1300,1090,1324,1121,1117,841,1143,1274,1154,1116,1195,1211,971,1034,858,1138,1109,1161,1078,927,961,874,1045,792,863,887,1038,1012,760,840,900,1025,676,928,927,1039,720,934,894,996,880,945,888,1025,694,923,898,1004,765,910,888,1055,853,886,894,977,820,868,901,999,735,917,835,1061,768,920,872,984,725,950,871,1225,1210,1093,1202,1522,1423,1113,1244,1325,1284,1312,1138,1211,1237,1080,1216,1145,1034,1358,1481,1234,1272,1216,1246,1252,776,1288,1081,1315,1457,1176,1311,1286,1162,1077,936,1429,1325,1294,1197,1249,1228,1229,1139,1194,1099,1475,1392,1302,1300,1168,1103,1208,1274,1167,1189,1234,1558,1040,1269,1251,1225,1324,1126,1347,1039,1348,1289,1269,1298,1231,1325,1338,1301,1307,1191,1346,1254,1101,1194,1229,963,1281,1234,1265,1081,1267,1285,1226,1028,1162,1188,1229,1352,1311,1114,1217,1164,1297,1094,1185,1060,1050,1279,1400,1251,1232,1255,1283,1236,1269,1303,1267,1054,1389,1373,1295,1195,1129,1194,1207,1060,1466,1195,1267,1249,1201,1195,1158,1290,1215,1334,1147,1369,1347,1306,1232,1235,1233,1228,1179,1225,1018,1450,1412,1269,1323,1154,1074,1236,1270,1175,1149,1464,1047,1263,1259,1228,1341,1130,1345,1024,1334,1272,1305,1282,1242,1328,1342,1346,1294,1217,1335,1251,1077,1216,1221,964,1282,1230,1266,1056,1271,1280,1254,1064,1175,1192,1245,1337,1290,1086,1223,1142,1281,1125,1152,1108,999,1265,1383,1264,1267,1250,1270,1238,1256,1301,1285,1089,1365,1380,1325,1192,1117,1238,1220,1046,1421,1215,1294,1242,1200,1224,1189,1268,1216,65],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_python-sat-0.1.7.dev15-h672cd09_0.tar.bz2.data');
      };
      Module['addRunDependency']('datafile_python-sat-0.1.7.dev15-h672cd09_0.tar.bz2.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/bin/fm.py", "start": 4147731, "end": 4165707}, {"filename": "/home/runner/env/bin/genhard.py", "start": 4014672, "end": 4033670}, {"filename": "/home/runner/env/bin/lbx.py", "start": 4111048, "end": 4132200}, {"filename": "/home/runner/env/bin/lsu.py", "start": 4132200, "end": 4147731}, {"filename": "/home/runner/env/bin/mcsls.py", "start": 3974401, "end": 3994578}, {"filename": "/home/runner/env/bin/models.py", "start": 3969005, "end": 3974401}, {"filename": "/home/runner/env/bin/musx.py", "start": 4033670, "end": 4044241}, {"filename": "/home/runner/env/bin/optux.py", "start": 3994578, "end": 4014672}, {"filename": "/home/runner/env/bin/rc2.py", "start": 4044241, "end": 4111048}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pycard.cpython-310.so", "start": 0, "end": 63811}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/__init__.py", "start": 3701328, "end": 3701982}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/_fileio.py", "start": 3701982, "end": 3707796}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/_utils.py", "start": 3707796, "end": 3709136}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/card.py", "start": 3709136, "end": 3738604}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/__init__.py", "start": 3847571, "end": 3847571}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/fm.py", "start": 3951037, "end": 3969005}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/genhard.py", "start": 3818018, "end": 3837008}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/hitman.py", "start": 3759147, "end": 3775580}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/lbx.py", "start": 3914370, "end": 3935514}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/lsu.py", "start": 3935514, "end": 3951037}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/mcsls.py", "start": 3775580, "end": 3795749}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/models.py", "start": 3753759, "end": 3759147}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/musx.py", "start": 3837008, "end": 3847571}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/optux.py", "start": 3795749, "end": 3815835}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/rc2.py", "start": 3847571, "end": 3914370}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/examples/usage.py", "start": 3815835, "end": 3818018}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/formula.py", "start": 3462119, "end": 3550831}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/pb.py", "start": 3738604, "end": 3753759}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysat/solvers.py", "start": 3550831, "end": 3701328}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pysolvers.cpython-310.so", "start": 63811, "end": 3462010}, {"filename": "/home/runner/env/lib/python3.10/site-packages/python_sat-0.1.7.dev15.dist-info/direct_url.json", "start": 3462010, "end": 3462119}]});
  })();
