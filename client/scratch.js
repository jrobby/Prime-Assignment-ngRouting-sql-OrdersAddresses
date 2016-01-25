/**
 * Created by robbynewman on 1/23/16.
 */

//
//We need a var set to start.constructor.
//    Remember how forms and submit work?
//    Look it up.

//    There'll be an ng-click = afterStartOrders(start)



var start = $scope.start;

$scope.afterStartOrders = function(){
    $http.get('/afterStart').then(function(response){

    })
}

