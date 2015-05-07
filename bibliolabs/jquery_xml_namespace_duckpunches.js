// jQuery tweaks for namespaced xml
(function () {
    // Override the `getElementsByTagName` to allow use a wildcard namespace if needed
    function applyPatch(object) {
        var oldFunction = object.prototype.getElementsByTagName;
        object.prototype.getElementsByTagName = function (selector) {
            // Run the old function
            var elements = oldFunction.apply(this, arguments);

            // If we got nothing back from the original function, attempt a search for all namespaced elements
            if (!elements || !elements[0]) {
                elements = this.getElementsByTagNameNS("*", selector);
            }

            return elements;
        };
    }

    // Apply the patch to the narrowest scope as is possible
    if (typeof XMLDocument !== "undefined") {
        applyPatch(XMLDocument);
    } else if (typeof Document !== "undefined") {
        applyPatch(Document);
    }
})();

// Duck-Punch jQuery.fn.is() for namespaced tag names
(function () {
    var oldFunction = jQuery.fn.is;
    var newFunction = function ($elements, selector) {
        selector = selector.toLowerCase();

        for (var i = 0; i < $elements.size(); i++) {
            var $element = $($elements.get(i));
            var element = $element.get(0);

            if (!!element) {
                var name = element.tagName;

                if (!!name) {
                    var colonIndex = name.indexOf(":");

                    var start = (colonIndex >= 0) ? (colonIndex + 1) : 0;
                    var end = name.length;

                    var actualName = name.slice(start, end).toLowerCase();

                    if (actualName === selector) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    jQuery.fn.is = function (selector) {
        if (typeof selector === "string" &&
            selector.match(/^[a-zA-Z]+$/)) {
            return newFunction.call(this, this, selector);
        } else {
            return oldFunction.call(this, selector);
        }
    };
})();
