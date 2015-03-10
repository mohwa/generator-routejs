var fs = require('fs');
var _path = require('path');

process.on('uncaughtException', function (err) {

    var stack = err.stack.split(/\n/);

    console.error('\n' + err.message.red + '\n');
    console.error(stack);

    process.exit(1);
});

var siteMapPath = './sitemap.json';


//console.log(JSON.parse('{"p": function(){}()}', function(k, v){ console.log(k, v); } ));
//var maps = JSON.parse(getFileText(siteMapPath), function(key, value){
//    console.log(key);
//});

var maps = getFileText(siteMapPath);
maps = maps.replace(/\s/g, '');

var ptn = /[^("|')](function\([^)]*\){[^}]*})[^("|')]/g;

maps = maps.replace(ptn, ':"$1",');

//maps = maps.replace(/("")/g, '"');

console.log(maps);

//console.log(getFileText(siteMapPath));

//console.log(maps.split('{'));

//createRouteJSSource(maps);


//var currentTargetString = getConfigToTargetString(config[0]);
//
//if (!target.length){
//
//    creteFiles(targetFiles, currentTargetString);
//
//    console.log('create application cache file'.yellow);
//    process.exit(1);
//}
//
//var isModify = isModifyTargetString(target[0], currentTargetString);
//
//if (!isModify){
//
//    console.log('All files are not changed.'.yellow);
//
//    console.log('\n' + currentTargetString.grey);
//    process.exit(1);
//}
//
//modifyTargetString(targetFiles[0], currentTargetString, function(){
//
//    console.log('The new application cache file had update been completed.'.green);
//
//    console.log('\n' + currentTargetString.green);
//    process.exit(1);
//});
//
//
//function isModifyTargetString(original, target){
//
//    var original = original.replace(/\s|\n/g, '');
//    var target = target.replace(/\s|\n/g, '');
//
//
//    return original !== target ? true : false;
//};
//
//function modifyTargetString(path, targetString, callback){
//
//    path = path || '';
//    targetString = targetString || '';
//    callback = callback || function(){};
//
//    var isExists = fs.existsSync(path);
//
//    if (isExists) {
//        fs.writeFile(path, targetString, function(err){
//
//            if (err) throw err;
//
//            callback.constructor === Function && callback.call(this);
//        });
//    }
//};
//
//function getFilesInfo(paths){
//
//    paths = (paths && paths.constructor === Array) ? paths : [paths];
//
//    var infos = [];
//
//    var length = paths.length;
//
//    var files = [];
//
//    for (var i = 0; i < length; i++) {
//
//        var path = paths[i];
//
//        var isExists = fs.existsSync(path);
//
//        if (isExists) {
//
//            var files = getFiles(path);
//
//            for (var n  in files){
//
//                var file = files[n];
//
//                var status = fs.statSync(file);
//                var checkSumString = getCheckSumString(status);
//
//                infos.push({
//                    path: file,
//                    checkSum: checkSumString,
//                    status: status
//                });
//            }
//        }
//    }
//
//    return infos;
//};
//
//function getFiles(path, files, isSymbolicLink){
//
//    if (!path) return [];
//
//    files = files || [];
//
//    var states = fs.statSync(path);
//    var isDirectory = states.isDirectory();
////    var currentPath = fs.realpathSync(path);
//
//    if (isDirectory) {
//
//        var childItems = fs.readdirSync(path);
//
//        for (var n in childItems) {
//
//            var item = childItems[n];
//
//            var states = fs.statSync(path + '/' + item);
//
//            var isDirectory = states.isDirectory();
//            var isFile = states.isFile();
//
//            if (isDirectory) {
//                getFiles(path + '/' + item, files);
//            }
//            else if (isFile) {
//
//                if (item && (item[0] !== '.')) {
//                    files.push(path + '/' + item);
//                }
//            }
//        }
//    }
//    else{
//        files.push(path);
//    }
//
//    return files;
//}


//function getCheckSumString(status){
//
//    if (!status) return '';
//
//    var ino = status.ino,
//        blocks = status.blocks,
//        atime = status.atime.getTime(),
//        mtime = status.mtime.getTime(),
//        ctime = status.ctime.getTime();
//
//    var checkSum = [ino, blocks, mtime, ctime].join('_');
//
//    return checkSum;
//};
//
function createRouteJSSource(maps){

    maps = maps ||[];

    var ret = '';
    var map = {};

    var sources = [];

    var length = maps.length;

    sources.push('define([\'app\'], function (app) {');
    sources.push('app.config([\'$routeProvider\', function ($routeProvider) {');

    for (var i = 0; i < length; i++) {

        var item = maps[i];

        sources.push('$routeProvider.when(\'' + (item.url || '') + '\',{');

        for (var key in item) {

            var value = item[key];

            //console.log(eval(value));
            if (value.constructor === String){
                value = '\'' + value + '\'';
            }

            if (key !== 'url'){
                sources.push(key + ': ' + value);
            }

        }

        sources.push('});');
    }

    console.log(sources.join('\n'));

    return sources.join('\n');
};

function getFileText(path){

    path = path || '';

    var ret = '';

    var isExists = fs.existsSync(path);

    if (isExists){
        ret = fs.readFileSync(path, 'utf8');
    }

    return ret;
};

function creteFiles(paths, string, callback){

    paths = (paths && paths.constructor === Array) ? paths : [paths];
    string = string || '';
    callback = callback || function(){};

    var length = paths.length;
    for (var i = 0; i < length; i++) {

        var path = paths[i];

        fs.appendFileSync(path, string, {
            mode: 0666
        }, callback);
    }
};

//function setWatchFiles(paths, callback, interval){
//
//    paths = (paths && paths.constructor === Array) ? paths : [paths];
//
//    callback = callback || function(){};
//    interval = interval || 1000;
//
//    var length = paths.length;
//    for (var i = 0; i < length; i++) {
//
//        var path = paths[i];
//
//        (function(path) {
//
//            fs.watchFile(path, function (curv, prev) {
//
//                console.log(path);
//                console.log(curv);
//                console.log(prev);
//
//                //            var checkSumString = getCheckSumString(status);
//                //
//                //            callback.constructor === Function && callback.call(this, status);
//
//            }, {
//                persistent: true,
//                interval: interval
//            });
//
//        })(path);
//    }
//};