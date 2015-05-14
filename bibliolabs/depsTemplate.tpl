var readiumDeps = {};
window.EPUBcfi = undefined;

(function() {
    var module = {
        exports: {}
    };
    var exports = module.exports;

    [%= jquery %]

    var jQuery = module.exports;
    var $ = jQuery;

    [%= jquery_duckpunches %]

    readiumDeps.jQuery = readiumDeps.$ = module.exports;

})();

(function() {
    var module = {
        exports: {}
    };
    var exports = module.exports;
    var jQuery = readiumDeps.jQuery;
    var $ = readiumDeps.$;

    [%= underscore %]

    readiumDeps._ = module.exports;
})();

(function() {
    var module = {
        exports: {}
    };
    var exports = module.exports;
    var jQuery = readiumDeps.jQuery;
    var $ = readiumDeps.$;
    var _ = readiumDeps._;

    [%= backbone %]

    readiumDeps.Backbone = module.exports;
}).apply(readiumDeps);

(function() {
    var jQuery = readiumDeps.jQuery;
    var $ = readiumDeps.$;
    var _ = readiumDeps._;
    var Backbone = readiumDeps.Backbone;

    [%= requirejs %] 

    define("jquery", [], (function (global) {
        return function () {
            var ret, fn;
            return ret || global.jQuery;
        };
    })(readiumDeps));

    define("underscore", [], (function (global) {
    return function () {
            var ret, fn;
            return ret || global._;
        };
    })(readiumDeps));

    define("backbone", [], (function (global) {
        return function () {
            var ret, fn;
            return ret || global.Backbone;
        };
    })(readiumDeps));

    [%= readium %]

    [%= readerApi %]

    require(['epubViewerApi'], function(epubViewerApi) {
        //window.onReaderLoad(epubViewerApi);
        window.epubViewerApi = epubViewerApi;
    });

})();
