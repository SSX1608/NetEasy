/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        templateUrl:'test.html',
        // template:'<div><ion-slide-box on-slide-changed="slideHasChanged($index)" auto-play="true" slide-interval="3000" show-pager="false" does-continue="true"><ion-slide ng-repeat="num in numArray"> <div style="height: 20rem;background-color: lavender"></div></ion-slide></ion-slide-box><div style="position: absolute;bottom: 0;width: 100%;height: 3rem;display: flex;flex-direction: row"> <div ng-repeat="num in numArray" style="width: .6rem;height: .6rem;background-color: silver;border-radius: 50%;margin-left: .5rem"></div></div></div>',
        // replace:true,
        link:function (scope,tElement,tAtts) {
            console.log(tAtts.source);
        }
    }
}]);