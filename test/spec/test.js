(function (ArrayUtils, GeoUtils) {

    'use strict';

    //var assert = chai.assert;

    describe('intercom coding-tests', function () {

        // The set of tests for the array utils
        describe('ArrayUtils tests', function() {

            it('should do this', function() {
                assert.equal(1, 1);
            })

            var testData = {
                nestedArrays: [
                    [[1, 2, [3]], 4],
                    [[1, 2, [[3]], 4]],
                    [[[[1, 2, [3]]], 4]]
                ]
            };


            var runArrayUtilsTests = function (testInput) {

                for (var i = 0; i < testInput.nestedArrays.length; i++) {

                    var inputArray = testInput.nestedArrays[i],
                        outputArray = ArrayUtils.flattenArray(inputArray);

                    describe('array flattener tests for\n' + JSON.stringify(inputArray), function () {

                        it('output should be of type array', function () {
                            assert.equal(Object.prototype.toString.apply(outputArray), '[object Array]');
                        });

                        it('output should contain only integers', function () {
                            for (var idx = 0; idx < outputArray.length; idx++) {
                                assert.equal((typeof outputArray[idx]), 'number');
                                assert.equal(outputArray[idx] % 1, 0);
                            }
                        });

                    });
                }

            };

            runArrayUtilsTests(testData);

        });

        // The set of tests for the Geo Utils
        describe('GeoUtils tests', function() {

            var testData = {
                fromLocation: {
                    lat: -6.2647391106306145,
                    lng: 53.35272532958628
                },
                toLocations: [
                    {
                        lat: -6.2977804888419415,
                        lng: 53.35237856333328
                    },
                    {
                        lat: -6.277954485815871,
                        lng: 53.35989308703215
                    },
                    {
                        lat: -6.2647391106306145,
                        lng: undefined
                    }
                ]
            };

            var runGeoUtilsTests = function(testInput) {

                for (var i = 0; i < testInput.toLocations.length; i++) {

                    var fromLoc = testInput.fromLocation,
                        toLoc = testInput.toLocations[i],
                        distance = GeoUtils.calculateDistanceBetweenPoints(fromLoc, toLoc);

                    describe('distance calculator tests for ' + JSON.stringify(fromLoc) + JSON.stringify(toLoc), function () {

                        it('output should be numeric', function () {
                            assert.equal(typeof distance, 'number');
                        });

                    });
                }

            };

            runGeoUtilsTests(testData);

        });

    });

})(ArrayUtils, GeoUtils);
