var esnext = require('esnext');
var es6mod = require('es6-module-transpiler').Compiler;
var loaderUtils = require('loader-utils');
var path = require('path');

module.exports = function(content) {
    if (this.cacheable)
        this.cacheable();

    var options = loaderUtils.parseQuery(this.query);
    Object.keys(options).forEach(function(key) {
        var value = options[key];
        if (value === 'false')
            options[key] = false;
    });

    options.sourceFileName = this.resourcePath;
    options.sourceMapName = this.resourcePath + '.map';

    if (options.modules !== 'false')
        content = es6ModuleTranspiler(content, options, options.filename || this.resourcePath);

    var result = esnext.compile(content, options);

    var cb = this.async();
    if (!cb)
        return result.code;

    cb(null, result.code, result.map);
};

function es6ModuleTranspiler(source, options, filename) {
    var ext = path.extname(filename);

    var moduleName = path.join(path.dirname(filename), path.basename(filename, ext)).replace(/[\\]/g, '/');
    try {
        var compiler = new es6mod(source, moduleName, options);
        return compiler.toCJS();
    } catch (e) {
        if (!e.lineNumber) throw e;
        var lines = source.split('\n');
        var l = e.lineNumber;
        var pre = lines.slice(l - 5, l + 1);
        var post = lines.slice(l + 1, l + 5);
        throw new Error(e.message + ' in file: ' + filename + '\n' +
                        pre.join('\n') +
                        goToCol(e.column) +
                        post.join('\n'));
    }
}

function goToCol(num) {
    return (new Array(num)).join(' ') + '^\n';
}
