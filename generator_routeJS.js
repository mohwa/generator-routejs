var fs = require('fs');

process.on('uncaughtException', function (err) {

    var stack = err.stack.split(/\n/);

    console.error('\n' + err.message.red + '\n');
    console.error(stack);

    process.exit(1);
});

var siteMapPath = './sitemap.json';

var maps = JSON.parse( getFileText(siteMapPath), function(key, value){

    var fnFilterPtn = /(.*?function.*?\(.*?\).*?\{)/gi;

    if (value.constructor === String && fnFilterPtn.test(value)){

        var fn = new Function('return ' + value)();

        value = fn;

    }

    return value;

}).sitemap;

var source = createRouteJSSource(maps);

var replaceDoubleQoutePtn = /\"[\n\r\t ]*(function.*?\(.*?\).*?\{.*?})[\n\r\t ]*\"/g;
source = source.replace(replaceDoubleQoutePtn, '$1');

setFileSource('./route.js', source);

function createRouteJSSource(maps){

    maps = maps ||[];

    var sources = [];

    var length = maps.length;
    var defaultHashUrl = '';

    sources.push('define([\'app\'], function (app) {\n\n');
    sources.push('app.config([\'$routeProvider\', function ($routeProvider) {\n\n');

    for (var i = 0; i < length; i++) {

        var item = maps[i];

        if (i === 0) defaultHashUrl = item.url;

        sources.push('    $routeProvider.when(\'' + (item.url || '') + '\',{\n');

        for (var key in item) {

            var keyName = '\"' + key + '\"';
            var value = '\"' + item[key] + '\"';

            if (key !== 'url'){
                sources.push('        ' + keyName + ': ' + value);
                sources.push(',\n');
            }
        }

        sources.pop();
        sources.push('});\n\n');
    }

    sources.push('\n\n    $routeProvider.otherwise({redirectTo: \'' + defaultHashUrl + '\'});\n\n');
    sources.push('}]);\n\n');
    sources.push('return app;\n\n');
    sources.push('});');

    return sources.join('');
};

function getFileText(path){

    path = path || '';

    var ret = '';

    var isExists = fs.existsSync(path);

    if (!isExists){
        console.log('sitemap.json file not found!!');
        return;
    }

    if (isExists){
        ret = fs.readFileSync(path, 'utf8');
    }

    return ret;
};

function setFileSource(path, string){

    if (fs.existsSync(path)){

        writeFile(path, string);
    }
    else{
        creteFile(path, string);
    }
};

function writeFile(path, string){

    path = path || '';
    string = string || '';

    fs.writeFileSync(path, string);
};

function creteFile(path, string){

    path = path || '';
    string = string || '';

    fs.appendFileSync(path, string);
};