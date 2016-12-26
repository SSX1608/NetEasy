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