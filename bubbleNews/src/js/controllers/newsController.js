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
}]).controller('newsController',['$scope','$ionicPopup','HttpFactory','$ionicModal','$ionicLoading','$http',function ($scope,$ionicPopup,HttpFactory,$ionicModal,$ionicLoading,$http) {

    //模态页面
    $ionicModal.fromTemplateUrl('modal.html',{
        scope:$scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        console.log(modal);
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    //滚动条
    $scope.scrollItems=['头条','要闻','娱乐','体育','网易号','郑州','视频','财经','科技','汽车','时尚','图片','直播','热点','跟帖','房产','股票','家居','独家','游戏'];
    //轮播图
    $scope.news = {
        newsArray:'',
        adsArray:[]
    };
    var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray = result;
        // console.log($scope.news.newsArray);
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
            console.log(result);
            $scope.items = result;
            //关闭动画 跟方法无关，刷新完成后，使用$broadcast广播scroll.refreshComplete事件。
            $scope.$broadcast('scroll.refreshComplete');
            if ($scope.items.length < 8){
                $scope.isShowInfinite = false;
            }else {
                $scope.isShowInfinite = true;
                //这个上拉加载的事件是告诉程序开启方法的 跟动画无关
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        },function (err) {

        })
    };
    $scope.doSome = function () {
        console.log('正在下拉！');
    };

    //刷新。直接再一次请求原来的数据，显示出来，调用loadMore函数
    $scope.doRefresh = function () {
        index = 10;
        $scope.loadMore();
    }
}]);