/*eslint no-unused-vars: 1*/
var ArrayUtils = (function() {

    'use strict';

    var my = {};

    /**
    * test if an object is an array by checking its object prototype
    */
    var isArray = function (array) {
        return Object.prototype.toString.apply(array) === '[object Array]';
    };

    /**
    * function to flatten an array of arbitrarily nested arrays of integers
    * into a flat array of integers. e.g. [[1,2,[3]],4] -> [1,2,3,4]
    */
    var flattenArray = function (array) {

        if (!array) {
            return [];
        }
        // the 'flattened' array to store our integers
        var flattenedArray = [];

        // the recursive flattening function
        var recursivelyFlatten = function(value) {
            for (var index = 0; index < value.length; index++) {

                // extract our next element
                var element = value[index];

                if (element) {

                    // check for nested arrays
                    if (isArray(element)) {
                        recursivelyFlatten(element);
                    }

                    // check for integer values
                    else if (typeof element === 'number' && element % 1 === 0) {

                        // found a valid integer. output it to our return object.
                        flattenedArray.push(element);
                    }
                }
            }
        };

        // start flattening
        recursivelyFlatten(array);

        return flattenedArray;
    };


    my.isArray = function(array) {
        return isArray(array);
    };

    my.flattenArray = function(array) {
        return flattenArray(array);
    };

    return my;

}());
