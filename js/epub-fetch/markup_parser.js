//  Copyright (c) 2014 Readium Foundation and/or its licensees. All rights reserved.
//  
//  Redistribution and use in source and binary forms, with or without modification, 
//  are permitted provided that the following conditions are met:
//  1. Redistributions of source code must retain the above copyright notice, this 
//  list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice, 
//  this list of conditions and the following disclaimer in the documentation and/or 
//  other materials provided with the distribution.
//  3. Neither the name of the organization nor the names of its contributors may be 
//  used to endorse or promote products derived from this software without specific 
//  prior written permission.

define([],
    function () {

        var MarkupParser = function (){

            var self = this;

            this.parseXml = function(xmlString) {
                return self.parseMarkup(xmlString, 'text/xml');
            };


            // Due the browser differences, if an error is found print and return as normal
            // Also, a parsererror element is valid xml so do not stop processing since it 
            // might not be an error
            // See: http://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross
            this.parseMarkup = function(markupString, contentType) {
                var parser = new window.DOMParser;
                var dom = parser.parseFromString(self.preParse(markupString), contentType);

                var errors = dom.getElementsByTagName('parsererror');
                if (errors.length > 0) {
                    console.log(errors[0].textContent);
                }

                return dom; 
            };

            // This code was mostly pulled from:
            // https://github.com/readium/readium-cfi-js/pull/45/files#diff-9909b258b32fb35ba81727d9da6faaceR34
            this.preParse = function(markupString) {
                if (markupString && (markupString.indexOf('version="1.1"') > 0)) {
                    console.log('Replacing XML v1.1 with v1.0 (web browser compatibility).');
                    console.log(markupString.substr(0, 50));
             
                    markupString = markupString.replace(/(<\?xml[\s\S]+?)version="1.1"([\s\S]+?\?>)/, '$1version="1.0"$2');
             
                    console.log(markupString.substr(0, 50));
                }
         
                return markupString;
            };

        };

        return MarkupParser;
});
