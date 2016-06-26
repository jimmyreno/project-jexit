(function (ArrayUtils, GeoUtils) {

    'use strict';

    //var assert = chai.assert;

    describe('intercom coding-tests', function () {

        // The set of tests for the array utils
        describe('ArrayUtils tests', function() {

            it('should do this', function() {
                assert.equal(1, 1);
            });

            // the set of nested arrays to test, including gotchas.
            var testData = {
                nestedArrays: [
                    [[1, 2, [3]], 4],
                    [[1, 2, [[3]], 4]],
                    [[[[1, 2, [3]]], 4]],
                    [null],
                    null,
                    []
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
                validToLocation: {
                        lat: -6.2977804888419415,
                        lng: 53.35237856333328
                },
                invalidToLocation1: {
                    lat: -6.2647391106306145,
                    lng: undefined
                },
                invalidToLocation2: {}
            };


            var validDistance = GeoUtils.calculateDistanceBetweenPoints(testData.fromLocation, testData.validToLocation),
                invalidDistance1 = GeoUtils.calculateDistanceBetweenPoints(testData.fromLocation, testData.invalidToLocation1),
                invalidDistance2 = GeoUtils.calculateDistanceBetweenPoints(testData.fromLocation, testData.invalidToLocation2);

            describe('distance calculator tests', function () {

                it('distance should be numeric for valid points', function () {
                    assert.equal(typeof validDistance, 'number');
                });

                it('distance should be null for invalid points', function () {
                    assert.equal(invalidDistance1, null);
                });

                it('distance should be null for null data', function () {
                    assert.equal(invalidDistance2, null);
                });

            });

        });

    });

})(ArrayUtils, GeoUtils);
