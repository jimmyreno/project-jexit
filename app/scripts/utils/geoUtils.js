/*eslint no-unused-vars: 1*/
var GeoUtils = (function() {

    'use strict';

    var EQUATORIAL_RADIUS = 6378.137,
        POLAR_RADIUS = 6335.439,
        MEAN_EARTH_RADIUS = (((2 * EQUATORIAL_RADIUS) + POLAR_RADIUS) / 3);

    var my = {};

    /**
    * Calculates the absolute difference between 2 numbers
    */
    var absoluteDifference = function (a, b) {
        return Math.abs(a - b);
    };

    /**
    * Convert degrees to radians.
    * Formula available here: https://en.wikipedia.org/wiki/Radian
    */
    var degreesToRadians = function(degrees) {
        return degrees * (Math.PI / 180);
    };

    /**
    *
    * Calculates the Great-Circle Distance between 2 points based on the
    * haversine formula detailed here:
    * https://en.wikipedia.org/wiki/Great-circle_distance
    */
    var calculateDistanceBetweenPoints = function(point1, point2) {
        var lat1 = point1.lat,
            lng1 = point1.lng,
            lat2 = point2.lat,
            lng2 = point2.lng,
            latsAbsDiff = absoluteDifference(lat1, lat2),
            lngsAbsDiff = absoluteDifference(lng1, lng2);

        var centralAngleDegrees =
            2 * (
                Math.asin(
                    Math.sqrt(
                        Math.pow(Math.sin(latsAbsDiff / 2), 2) +
                        (
                            Math.cos(lat1) *
                            Math.cos(lat2) *
                            Math.pow(Math.sin(lngsAbsDiff / 2), 2)
                        )
                    )
                )
            );

        var centralAngleRadians = degreesToRadians(centralAngleDegrees),
            distance = centralAngleRadians * MEAN_EARTH_RADIUS;

        // console.log('\ndistance from \n\t' + JSON.stringify(point1) + '\n to \n\t'
        //     + JSON.stringify(point2) + '\n' + distance + ' km');
        return distance;
    };


    my.calculateDistanceBetweenPoints = function(a, b) {
        return calculateDistanceBetweenPoints(a, b);
    };

    return my;

}());
