/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        template:'<div class="topCarousel"><ion-slide-box delegate-handle="topCarouselSlideBox" on-slide-changed="slideHasChanged($index)" auto-play="true" slide-interval="1000" show-pager="true" does-continue="true" ng-if="isShowSlideBox" ng-mouseenter="drag()" ng-mouseleave="leave()"> <ion-slide ng-repeat="ads in sourceArray track by $index" ng-click="goToDetailView($index)"><img ng-src="{{ads.imgsrc}}" class="topCarouselImg"></ion-slide> </ion-slide-box><div class="slideBottomDiv"></div></div>',
        controller:['$scope','$element','$ionicSlideBoxDelegate',function ($scope,$element,$ionicSlideBoxDelegate) {
            $scope.goToDetailView = function (index) {
                console.log('进入详情页' + index);
            };
            var lastSpan = $element[0].lastElementChild;
            // $scope.sourceArray = [1,2,3,4,5];
            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    $scope.isShowSlideBox = true;
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                    // lastSpan.innerText = $scope.sourceArray[0].title;
                }
            });
            $scope.slideHasChanged = function (index) {
                // lastSpan.innerText = $scope.sourceArray[index].title;
            };
            $scope.drag = function () {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            };
            $scope.leave = function () {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(true);
            };
        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);