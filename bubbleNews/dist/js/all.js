/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp',['ionic','myApp.httpFactory','myApp.slideBox','myApp.tabs','myApp.news','myApp.search','myApp.live','myApp.topic','myApp.personal']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.style('standard');
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
    }).state("detail",{
        url:"/detail",
        templateUrl:"detail.html"
        // controller:'detailController'
    });
    $urlRouterProvider.otherwise('tabs/news');
}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.live',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.live',{
        url:'/live',
        views:{
            'tabs-live':{
                templateUrl:'live.html',
                controller:'liveController'
            }
        }
    });
}]).controller('liveController',['$scope',function ($scope) {

}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.news',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html',
                controller:'newsController'
            }
        }
    });
}]).controller('newsController',['$scope','$ionicPopup','$ionicSlideBoxDelegate','HttpFactory','$ionicLoading','$state','$ionicViewSwitcher',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,HttpFactory,$ionicLoading,$state,$ionicViewSwitcher) {

    //滚动条
    $scope.scrollItems=['头条','要闻','娱乐','体育','网易号','郑州','视频','财经','科技','汽车','时尚','图片','直播','热点','跟帖','房产','股票','家居','独家','游戏'];

    //轮播图
    $scope.news = {
        newsArray:[],
        adsArray:[]
    };
    var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray = result;
        $scope.news.adsArray = result[0].ads;
    });

    //上拉加载及下拉刷新
    var index = 0;
    $scope.isShowInfinite = true;
    $scope.loadMore = function (str) {
        if(str == '上拉'){
            index += 10;
        }
        var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size="+ index;
        HttpFactory.getData(url).then(function (result) {
            result.splice(0,1);
            // console.log(result);
            $scope.items = result;
            //关闭动画 跟方法无关，刷新完成后，使用$broadcast广播scroll.refreshComplete事件。
            $scope.$broadcast('scroll.refreshComplete');
            if ($scope.items.length < 10){
                $scope.isShowInfinite = false;
            }else {
                $scope.isShowInfinite = true;
                //这个上拉加载的事件是告诉程序开启方法的 跟动画无关
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        },function (err) {

        })
    };

    //刷新。直接再一次请求原来的数据，显示出来，调用loadMore函数
    $scope.doRefresh = function () {
        index = 10;
        $scope.loadMore();
    };

    //滑动页面
    $scope.dragOpenSlide = function () {
        //滑动content的时候能滑动页面
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(true);
    };
    $scope.slideChanged = function () {
        //滑动页面完毕关闭底层mainSlideBox的滑动
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);

    };
    
//    按钮动画
    $scope.btnArray=['头条','要闻','娱乐','体育','郑州','视频','财经','科技','汽车','时尚','图片','直播','热点','跟帖','房产','股票','家居','独家','游戏','网易号'];
    $scope.openBnts=function () {
            var btns_icon = document.querySelector('#btnIcon');
            var div=document.querySelector('#div');
            if (btns_icon.style.transform == 'rotate(180deg)'){
                btns_icon.setAttribute('style','transform:rotate(0deg)');
                div.style.display='none';
            }else {
                btns_icon.setAttribute('style','transform:rotate(180deg)');
                div.style.display='block';
            }

    };
    $scope.goDetail=function () {
        $state.go('detail');
        $ionicViewSwitcher.nextDirection("forward");
    }
}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.personal',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personal',{
        url:'/personal',
        views:{
            'tabs-personal':{
                templateUrl:'personal.html',
                controller:'personalController'
            }
        }
    });
}]).controller('personalController',['$scope',function ($scope) {

}]);
/**
 * Created by lx on 2016/12/5.
 */
angular.module('myApp.search',[]).config(['$stateProvider',function ($stateProvider) {
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
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.tabs',[]).controller('tabsController',['$scope',function ($scope) {
    $scope.$on('$stateChangeSuccess',function (evt,current,previous) {
        var update_wx_title = function(title) {
            var body = document.getElementsByTagName('body')[0];
            document.title = title;
            var iframe = document.createElement("iframe");
            iframe.setAttribute("src", "../empty.png");
            iframe.addEventListener('load', function() {
                setTimeout(function() {
                    // iframe.removeEventListener('load');
                    document.body.removeChild(iframe);
                });
            });
            document.body.appendChild(iframe);
        };
        switch (current.url){
            case '/news':
                update_wx_title("新闻");
                break;
            case '/live':
                update_wx_title("直播");
                break;
            case '/topic':
                update_wx_title("话题");
                break;
            case '/personal':
                update_wx_title("我");
                break;

        }


    });
}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.topic',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.topic',{
        url:'/topic',
        views:{
            'tabs-topic':{
                templateUrl:'topic.html',
                controller:'topicController'
            }
        }
    });
}]).controller('topicController',['$scope',function ($scope) {

}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,type) {
            if (url){
                var promise = $q.defer();
                url = "http://localhost:3000/?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    timeout:20000
                }).then(function (reslut) {
                    reslut =reslut.data;
                    // console.log(reslut);
                    // console.log('----------');
                    //Object.keys(reslut)就是返回一个对象键名列表的数组；[]也是点语法取键值
                    //reslut[Object.keys(reslut)[0]]就取出了result的第一个键值的值；
                    reslut = reslut[Object.keys(reslut)[0]];
                    // console.log(Object.keys(reslut)[0]);
                    // console.log('----------');
                    promise.resolve(reslut);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    };
}]);
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
            //点击轮播图进入详情页
            $scope.goToDetailView = function (index) {
                $state.go('detail');
                $ionicViewSwitcher.nextDirection("forward");
                console.log('进入详情页' + index);
            };

            //$element代表引入的模板内容，在angular里面是JqLite元素，所以要加下标；lastElementChild是最后一个子元素，这里就是img
            var lastSpan = $element[0].lastElementChild;
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