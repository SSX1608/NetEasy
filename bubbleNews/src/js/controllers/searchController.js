/**
 * Created by lx on 2016/12/5.
 */
angular.module('cftApp.search',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.search',{
        url:'/search',
        views:{
            'tabs-news':{
                templateUrl:'search.html',
                controller:'searchController'
            }
        }
    });
}]).controller('searchController',['$scope',function ($scope) {

}]);