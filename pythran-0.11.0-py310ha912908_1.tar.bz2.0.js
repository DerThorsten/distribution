
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
      var PACKAGE_NAME = 'pythran-0.11.0-py310ha912908_1.tar.bz2.0.data';
      var REMOTE_PACKAGE_BASE = 'pythran-0.11.0-py310ha912908_1.tar.bz2.0.data';
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
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "pythran", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pythran", "types", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pythran", "analyses", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pythran", "optimizations", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages/pythran", "transformations", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "pythran-0.11.0.dist-info", true, true);
Module['FS_createPath']("/home/runner/env/lib/python3.10/site-packages", "omp", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":416380,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1123,2232,3563,4752,5903,7148,8214,9137,10024,10830,11480,12069,12953,13701,14869,15591,16732,17817,19016,20226,21104,21882,22816,23852,24941,26206,27437,28605,29904,30833,31554,32464,33753,35225,36475,37621,38664,39757,40968,42090,43128,44373,45564,46707,47557,48541,49677,50866,51993,53303,54746,55797,56837,57725,58659,60056,61174,62240,63299,64246,65244,66583,67645,68896,70015,71146,72097,73386,74371,75518,76582,77812,78924,80190,81335,82360,83388,84365,85446,86521,87719,88508,89501,90440,91701,93026,94168,95149,96070,97101,98234,99560,100255,101376,101995,102539,102953,103534,104202,104653,105040,105332,105729,106185,106662,107202,107722,108184,108803,109479,110071,110674,111269,111667,112209,112796,113284,113883,114430,114997,115512,116034,116526,117089,117667,118177,118737,119242,119783,120306,120739,121355,121846,122458,123041,123515,124279,125064,125479,125904,126382,126923,127351,127751,128290,128909,129446,130172,130840,131552,132134,132649,133341,133946,134473,134907,135427,135986,136617,137215,137756,138305,138823,139374,139734,140063,140369,140602,141185,141704,142210,142943,143605,144223,144964,145470,145911,146681,147283,147954,148425,148904,149377,150042,150537,150929,151441,152028,152859,153965,155084,155864,157263,158535,159365,160247,161009,161898,162981,163993,164929,166245,167491,168283,169242,170096,171257,172135,173133,173973,174916,175770,176659,177520,178288,179460,180443,181688,182493,183704,185024,186077,187242,188444,189389,190532,191793,192910,193972,194923,195771,196888,197935,198871,199988,201208,202304,203108,204322,205284,206406,207689,208951,210153,210936,211785,212531,213302,214170,215001,216201,217216,218174,218951,219687,220487,221450,222411,223320,224187,225121,226023,226973,228072,228952,230052,231236,232382,233089,233963,234983,236100,237219,238237,239370,240477,241763,242742,243790,244923,246159,247173,248069,249009,250112,250961,252005,253016,254147,255199,256055,257160,257894,259082,260219,261152,262117,263122,263751,264801,265839,266794,267806,268840,269782,270805,271949,273036,273906,274951,276081,277250,278167,279193,280339,281390,282437,283184,284199,285481,286109,287278,288392,289374,290314,291263,292263,293353,294647,295869,296673,297708,298882,300085,301226,302213,303379,304396,305342,306352,307395,308639,309837,310884,311550,312434,313382,314399,315324,316456,317256,318293,319460,320765,321740,322579,323728,324954,326146,327170,328210,329311,330404,331380,332546,333577,334671,335847,336833,337701,338783,339319,339901,340549,341220,341874,342970,344154,345357,346198,347321,348562,349600,350733,351914,352825,353675,354477,355604,356656,357707,358879,359900,361029,362018,363230,364230,365153,366348,367443,368724,369899,370984,371919,372816,373796,374735,375619,376576,377688,378725,379776,381081,382134,383225,384394,385559,386710,387709,388827,389995,391133,392374,393346,394481,395524,396617,397858,399143,400070,400984,401941,403071,404008,404853,405937,407096,408170,409339,410254,411518,412575,413825,415097,416280],"sizes":[1123,1109,1331,1189,1151,1245,1066,923,887,806,650,589,884,748,1168,722,1141,1085,1199,1210,878,778,934,1036,1089,1265,1231,1168,1299,929,721,910,1289,1472,1250,1146,1043,1093,1211,1122,1038,1245,1191,1143,850,984,1136,1189,1127,1310,1443,1051,1040,888,934,1397,1118,1066,1059,947,998,1339,1062,1251,1119,1131,951,1289,985,1147,1064,1230,1112,1266,1145,1025,1028,977,1081,1075,1198,789,993,939,1261,1325,1142,981,921,1031,1133,1326,695,1121,619,544,414,581,668,451,387,292,397,456,477,540,520,462,619,676,592,603,595,398,542,587,488,599,547,567,515,522,492,563,578,510,560,505,541,523,433,616,491,612,583,474,764,785,415,425,478,541,428,400,539,619,537,726,668,712,582,515,692,605,527,434,520,559,631,598,541,549,518,551,360,329,306,233,583,519,506,733,662,618,741,506,441,770,602,671,471,479,473,665,495,392,512,587,831,1106,1119,780,1399,1272,830,882,762,889,1083,1012,936,1316,1246,792,959,854,1161,878,998,840,943,854,889,861,768,1172,983,1245,805,1211,1320,1053,1165,1202,945,1143,1261,1117,1062,951,848,1117,1047,936,1117,1220,1096,804,1214,962,1122,1283,1262,1202,783,849,746,771,868,831,1200,1015,958,777,736,800,963,961,909,867,934,902,950,1099,880,1100,1184,1146,707,874,1020,1117,1119,1018,1133,1107,1286,979,1048,1133,1236,1014,896,940,1103,849,1044,1011,1131,1052,856,1105,734,1188,1137,933,965,1005,629,1050,1038,955,1012,1034,942,1023,1144,1087,870,1045,1130,1169,917,1026,1146,1051,1047,747,1015,1282,628,1169,1114,982,940,949,1000,1090,1294,1222,804,1035,1174,1203,1141,987,1166,1017,946,1010,1043,1244,1198,1047,666,884,948,1017,925,1132,800,1037,1167,1305,975,839,1149,1226,1192,1024,1040,1101,1093,976,1166,1031,1094,1176,986,868,1082,536,582,648,671,654,1096,1184,1203,841,1123,1241,1038,1133,1181,911,850,802,1127,1052,1051,1172,1021,1129,989,1212,1000,923,1195,1095,1281,1175,1085,935,897,980,939,884,957,1112,1037,1051,1305,1053,1091,1169,1165,1151,999,1118,1168,1138,1241,972,1135,1043,1093,1241,1285,927,914,957,1130,937,845,1084,1159,1074,1169,915,1264,1057,1250,1272,1183,100],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pythran-0.11.0-py310ha912908_1.tar.bz2.0.data');
      };
      Module['addRunDependency']('datafile_pythran-0.11.0-py310ha912908_1.tar.bz2.0.data');

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
loadPackage({"files": [{"filename": "/home/runner/env/lib/python3.10/site-packages/omp/__init__.py", "start": 906880, "end": 911461}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran-0.11.0.dist-info/direct_url.json", "start": 906769, "end": 906880}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/__init__.py", "start": 52815, "end": 54817}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/__init__.py", "start": 657379, "end": 659167}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/aliases.py", "start": 671976, "end": 699440}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/ancestors.py", "start": 654992, "end": 657379}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/argument_effects.py", "start": 659167, "end": 666862}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/argument_read_once.py", "start": 644025, "end": 653012}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/ast_matcher.py", "start": 565352, "end": 572715}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/cfg.py", "start": 723780, "end": 729877}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/constant_expressions.py", "start": 639390, "end": 642899}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/dependencies.py", "start": 703576, "end": 708335}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/extended_syntax_check.py", "start": 714263, "end": 720370}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/fixed_size_list.py", "start": 613890, "end": 616546}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/global_declarations.py", "start": 653012, "end": 654221}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/global_effects.py", "start": 666862, "end": 671266}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/globals_analysis.py", "start": 703120, "end": 703576}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/has_return.py", "start": 709343, "end": 710320}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/identifiers.py", "start": 671266, "end": 671976}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/immediates.py", "start": 720370, "end": 721572}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/imported_ids.py", "start": 621220, "end": 624704}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/inlinable.py", "start": 722559, "end": 723780}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/is_assigned.py", "start": 721572, "end": 722559}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/lazyness_analysis.py", "start": 624704, "end": 639059}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/literals.py", "start": 654221, "end": 654992}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/local_declarations.py", "start": 616546, "end": 618746}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/locals_analysis.py", "start": 710320, "end": 714263}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/node_count.py", "start": 729877, "end": 730631}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/optimizable_comprehension.py", "start": 708335, "end": 709343}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/ordered_global_declarations.py", "start": 730631, "end": 732534}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/parallel_maps.py", "start": 564385, "end": 565352}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/potential_iterator.py", "start": 642899, "end": 644025}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/pure_expressions.py", "start": 561790, "end": 564385}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/range_values.py", "start": 573868, "end": 613890}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/scope.py", "start": 699440, "end": 703120}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/static_expressions.py", "start": 618746, "end": 620851}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/use_def_chain.py", "start": 572715, "end": 573868}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/use_omp.py", "start": 639059, "end": 639390}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/analyses/yield_points.py", "start": 620851, "end": 621220}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/backend.py", "start": 124425, "end": 175438}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/config.py", "start": 70128, "end": 83464}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/conversion.py", "start": 29524, "end": 34831}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/cxxgen.py", "start": 101777, "end": 124425}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/cxxtypes.py", "start": 422561, "end": 440937}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/dist.py", "start": 452324, "end": 458282}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/errors.py", "start": 5111, "end": 5268}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/frontend.py", "start": 451570, "end": 452324}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/graph.py", "start": 65625, "end": 70128}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/interval.py", "start": 13445, "end": 27517}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/intrinsic.py", "start": 57601, "end": 65625}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/log.py", "start": 0, "end": 829}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/magic.py", "start": 54817, "end": 57601}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/metadata.py", "start": 412394, "end": 414383}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/middlend.py", "start": 441074, "end": 444387}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/openmp.py", "start": 444387, "end": 451570}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/__init__.py", "start": 774000, "end": 775073}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/comprehension_patterns.py", "start": 794639, "end": 800319}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/constant_folding.py", "start": 785813, "end": 794639}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/dead_code_elimination.py", "start": 801715, "end": 806696}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/forward_substitution.py", "start": 742975, "end": 748188}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/inline_builtins.py", "start": 751134, "end": 757755}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/inlining.py", "start": 738779, "end": 742975}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/iter_transformation.py", "start": 779872, "end": 782069}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/list_comp_to_genexp.py", "start": 757755, "end": 758962}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/list_to_tuple.py", "start": 775073, "end": 778753}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/loop_full_unrolling.py", "start": 782069, "end": 785813}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/modindex.py", "start": 734305, "end": 738779}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/pattern_transform.py", "start": 758962, "end": 772121}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/range_based_simplify.py", "start": 806696, "end": 809464}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/range_loop_unfolding.py", "start": 732534, "end": 734305}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/remove_dead_functions.py", "start": 778753, "end": 779872}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/simplify_except.py", "start": 800319, "end": 801715}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/square.py", "start": 748188, "end": 751134}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/optimizations/tuple_to_shape.py", "start": 772121, "end": 774000}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/passmanager.py", "start": 5268, "end": 13445}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/run.py", "start": 414383, "end": 422561}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/spec.py", "start": 34831, "end": 52815}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/syntax.py", "start": 175438, "end": 186404}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/tables.py", "start": 186404, "end": 393715}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/toolchain.py", "start": 83464, "end": 101777}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/__init__.py", "start": 851134, "end": 852392}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/expand_builtins.py", "start": 849640, "end": 851134}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/expand_globals.py", "start": 844709, "end": 849640}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/expand_import_all.py", "start": 843560, "end": 844709}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/expand_imports.py", "start": 891864, "end": 897266}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/extract_doc_strings.py", "start": 869651, "end": 871282}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/false_polymorphism.py", "start": 837020, "end": 839797}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/handle_import.py", "start": 876187, "end": 884436}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/normalize_compare.py", "start": 897266, "end": 901638}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/normalize_exception.py", "start": 839797, "end": 841267}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/normalize_ifelse.py", "start": 841267, "end": 843560}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/normalize_is_none.py", "start": 871282, "end": 874329}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/normalize_method_calls.py", "start": 854492, "end": 865607}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/normalize_return.py", "start": 815174, "end": 817086}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/normalize_static_if.py", "start": 820397, "end": 837020}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/normalize_tuples.py", "start": 884436, "end": 891864}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/remove_comprehension.py", "start": 809464, "end": 815174}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/remove_fstrings.py", "start": 874329, "end": 876187}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/remove_lambdas.py", "start": 817086, "end": 820397}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/remove_named_arguments.py", "start": 901638, "end": 906769}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/remove_nested_functions.py", "start": 865607, "end": 869651}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/transformations/unshadow_parameters.py", "start": 852392, "end": 854492}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/types/__init__.py", "start": 493070, "end": 493125}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/types/conversion.py", "start": 487980, "end": 493070}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/types/reorder.py", "start": 493125, "end": 497507}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/types/signature.py", "start": 458282, "end": 462477}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/types/tog.py", "start": 497507, "end": 546321}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/types/type_dependencies.py", "start": 546321, "end": 561790}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/types/types.py", "start": 462477, "end": 487980}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/typing.py", "start": 27517, "end": 29524}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/unparse.py", "start": 393715, "end": 412394}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/utils.py", "start": 829, "end": 5111}, {"filename": "/home/runner/env/lib/python3.10/site-packages/pythran/version.py", "start": 440937, "end": 441074}]});
  })();
