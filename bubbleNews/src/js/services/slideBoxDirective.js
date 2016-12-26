/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        //双向绑定
        scope:{sourceArray:'='},
        template:'<div class="topCarousel">' +
                        '<ion-slide-box ' +
                            'delegate-handle="topCarouselSlideBox" ' +
                            'on-slide-changed="slideHasChanged($index)" ' +
                            'auto-play="true" ' +
                            'slide-interval="1000" ' +
                            'show-pager="true" ' +
                            'does-continue="true" ' +
                            'ng-if="isShowSlideBox" ' +
                            'on-drag="drag($event)"> ' +
                                '<ion-slide ng-repeat="ads in sourceArray track by $index" ' +
                                        'ng-click="goToDetailView($index)">' +
                                    '<img ng-src="{{ads.imgsrc}}" class="topCarouselImg">' +
                                '</ion-slide>' +
                        '</ion-slide-box>' +
                    '<div class="slideBottomDiv"></div></div>',
        controller:['$scope','$element','$ionicSlideBoxDelegate','$state','$ionicViewSwitcher',function ($scope,$element,$ionicSlideBoxDelegate,$state,$ionicViewSwitcher) {

            //$element代表引入的模板内容，在angular里面是JqLite元素，所以要加下标；lastElementChild是最后一个子元素，这里就是img
            var lastSpan = $element[0].lastElementChild;


            //点击轮播图进入详情页
            $scope.goToDetailView = function (index) {
                // var wh=$scope.lastSpan[index];
                console.log(lastSpan);
                // $state.go('newsSummary',{data:wh});
                $state.go('newsSummary');
                $ionicViewSwitcher.nextDirection("forward");
                console.log('进入详情页' + index);
            };


            //监听数据获取完成之后显示轮播图
            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    $scope.isShowSlideBox = true;
                    //刚加载出来时显示第一个的title
                    lastSpan.innerText = $scope.sourceArray[0].title;
                }
            });

            //轮播滑动时改变轮播上的title
            $scope.slideHasChanged = function (index) {
                lastSpan.innerText = $scope.sourceArray[index].title;
            };

            //当拖动轮播图时阻止下面的新闻列表滑动
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡到content父元素上
                event.stopPropagation();
            };
        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);