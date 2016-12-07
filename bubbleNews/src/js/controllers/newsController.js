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