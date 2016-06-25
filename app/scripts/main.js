(function (ArrayUtils, GeoUtils, $) {

    'use strict';

    /*eslint no-unused-vars: 1*/

    var nestedArray = [[1, 2, [3]], 4],
        intercomOfficeLocation = {
            lat: 53.3381985,
            lng: -6.2592576
        };

    var runArrayFlattener = function() {
        var flattenedArray = ArrayUtils.flattenArray(nestedArray);
        $('#nested-array').append(JSON.stringify(nestedArray));
        $('#flattened-array').append(JSON.stringify(flattenedArray));
    };

    /**
    * write the customer list to the table body
    */
    var appendCustomerList = function(customers) {

        var sortedList = customers.sort(function(a, b) {
            if (a.user_id < b.user_id) {
                return -1;
            }
            else if (a.user_id > b.user_id) {
                return 1;
            }
            else {
                return 0;
            }
        });

        var tableRows = '';
        for (var idx = 0; idx < sortedList.length; idx++) {
            var customer = sortedList[idx];
            tableRows += '<tr><th scope="row">' + customer.user_id +
                '</th><td>' + customer.name + '</td><td>' + customer.distance + ' km</td></tr>';
        }
        $('#customer-list').append(tableRows);

    };

    var runCustomerInviter = function() {
        var customerInviteList = [];

        $.getJSON('../raw_data/customers.json', function(customers) {
            for (var c = 0; c < customers.length; c++) {

                // test if the customer is within 100km of the office
                var customerLocation = {
                    lat: customers[c].latitude,
                    lng: customers[c].longitude
                };

                var distance = GeoUtils.calculateDistanceBetweenPoints(intercomOfficeLocation, customerLocation);
                if (distance <= 100) {
                    customerInviteList.push(customers[c]);
                    customerInviteList[customerInviteList.length - 1].distance = Math.round(distance);
                }
            }

            appendCustomerList(customerInviteList);
        });
    };

    function main() {
        runArrayFlattener();
        runCustomerInviter();
    }


    main();

}(ArrayUtils, GeoUtils, $));
