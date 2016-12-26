/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp',['ionic','myApp.httpFactory','myApp.slideBox','myApp.tabs','myApp.news','myApp.search','myApp.live','myApp.topic','myApp.personal','myApp.newsSummaryC','myApp.newsFactory']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.style('standard');
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
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
}]).controller('newsController',['$scope','$ionicPopup','$ionicSlideBoxDelegate','HttpFactory','$ionicLoading','$state','$ionicViewSwitcher','$rootScope','$timeout',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,HttpFactory,$ionicLoading,$state,$ionicViewSwitcher,$rootScope,$timeout) {

    //滚动条
    $scope.scrollItems=['头条','要闻','娱乐','体育','网易号','郑州','视频','财经','科技','汽车','时尚','图片','直播','热点','跟帖','房产','股票','家居','独家','游戏'];


    //获取网络数据
    $scope.news = {
        newsArray:[],
        adsArray:[],
        index:0,
        isFirst:true
    };
    $scope.loadMore = function () {
        $scope.show();
        url = "http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=" + $scope.news.index +"&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore";

        if ($scope.news.index === 0){
            $scope.news.index += 11;
        }else {
            $scope.news.index += 10;
        }

        HttpFactory.getData(url).then(function (result) {
            $scope.hide();
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray = result[0].ads;
                }
            }
            $scope.news.newsArray = $scope.news.newsArray.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log($scope.news.newsArray);

        },function () {
            $scope.hide();
        });
    };

    $scope.doRefresh = function () {
        url = "http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=" + $scope.news.index +"&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore";
        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray = result[0].ads;
                }
            }
            $scope.news.newsArray = result;
            if ($scope.news.index === 0){
                $scope.news.newsArray.splice(0,1);
            }
            $scope.$broadcast('scroll.refreshComplete');

        });
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
    $scope.btnArray=['头条','要闻','娱乐','体育','郑州','视频','财经','科技','汽车','时尚','图片','直播','热点','跟帖','房产','股票','家居','网易号','独家','游戏'];
    $scope.boolChange=true;
    $scope.openBnts=function () {
        var btns_icon = document.querySelector('#btnIcon');
        var btnDiv = document.querySelector('#btnDiv');
        if ($scope.boolChange){
            btns_icon.setAttribute('style','transform:rotate(180deg)');
            btnDiv.style.height='1000px';
            $scope.boolChange=false;
            $timeout(function () {
                $rootScope.hideTabs=true;
            },700);

        }else {
            btns_icon.setAttribute('style','transform:rotate(0deg)');
            btnDiv.style.height='0';
            $scope.boolChange=true;
            $timeout(function () {
                $rootScope.hideTabs=false;
            },600);
        }
    };
    //进入详情页面
    $scope.goDetail=function (index) {
        console.log(index);
        console.log($scope.news.newsArray);
        var msg=$scope.news.newsArray[index].docid;
        console.log(msg);
        $state.go('newsSummary',{data:msg});
        $ionicViewSwitcher.nextDirection("forward");
        //显示加载动画
        $scope.show();
    };
    $scope.hide = function(){
        $ionicLoading.hide();
    };
}]);
/**
 * Created by Administrator on 2016/11/12.
 */
angular.module('myApp.newsFactory',[]).factory('NewsFactory',['$http',function ($http) {
    return {
        getNewsData:function (url,func) {
            var url = url;
            $http({
                url:url,
                method:"GET",
                timeout:12000,
                cache:true
            }).then(function success(result) {
                result = result.data;
                console.log(result);
                func(result);
            },function error(err) {
                console.log("发生请求错误" + err);
            })
        }
    }
}]);
/**
 * Created by Administrator on 2016/11/12.
 */
angular.module('myApp.newsSummaryC',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state("newsSummary",{
        url:"/newsSummary",
        templateUrl:"newsSummary.html",
        controller:'newsSummaryController',
        params:{data:null}
    });
}]).controller('newsSummaryController',['$scope','$stateParams','NewsFactory','$sce','$ionicLoading',function ($scope,$stateParams,NewsFactory,$sce,$ionicLoading) {
    var docid=$stateParams.data;
    $scope.newsSummary = {
        detail:'',
        body:'',
        goBackView:function () {
            window.history.go(-1);
        }
    };

    var url = "http://localhost:3000/?myUrl=http://c.m.163.com/nc/article/" + docid +"/full.html";
    NewsFactory.getNewsData(url,function (result) {
        //隐藏加载动画
        $scope.hide();
        $scope.newsSummary.detail = result[docid];
        console.log($scope.newsSummary.detail);
        var newsObj = $scope.newsSummary.detail;
        console.log(newsObj);
        if (newsObj.img && newsObj.img.length){
            for(var i = 0;i < newsObj.img.length;i++){
                var imgWidth = newsObj.img[i].pixel.split('*')[0];
                if(imgWidth > document.body.offsetWidth){
                    imgWidth = document.body.offsetWidth;
                }
                var imgStyle = 'width:' + imgWidth + "px";
                var imgStr = "<img" + " style='" + imgStyle + "'" + " src=" + newsObj.img[i].src + '>';
                newsObj.body = newsObj.body.replace(newsObj.img[i].ref,imgStr);
            }
        }
        $scope.newsSummary.body = $sce.trustAsHtml(newsObj.body);
    });

    // //隐藏加载动画
    $scope.hide = function(){
        $ionicLoading.hide();
    };

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
angular.module('myApp.tabs',[]).controller('tabsController',['$scope','$ionicLoading',function ($scope,$ionicLoading) {
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

    $scope.show = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner>',
            noBackdrop:true
        });
    };

}]).directive('showTabs', function ($rootScope) {
    return {
        restrict: 'A',
        link: function ($scope, $el) {
            $rootScope.hideTabs = false;
        }
    };
}).directive('hideTabs', function ($rootScope) {
    return {
        restrict: 'A',
        link: function ($scope, $el) {
            $rootScope.hideTabs = true;
        }
    };
}) ;
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