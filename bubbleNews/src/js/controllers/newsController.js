/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.news',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html',
                controller:'newsController'
            }
        }
    });
}]).controller('newsController',['$scope','HttpFactory','$ionicModal',function ($scope,HttpFactory,$ionicModal) {
    $ionicModal.fromTemplateUrl('modal.html',{
        //$scope要被模态所持有，这是一个模态的配置对象
        scope:$scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        //函数里面的参数modal就是模态页面的内容
        //模态要被$scope持有
        $scope.modal = modal;
        console.log(modal);
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };





    $scope.items=['头条','要闻','娱乐','体育','网易号','郑州','视频','财经','科技','汽车','时尚','图片','直播','热点','跟帖','房产','股票','家居','独家','游戏'];
    var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    HttpFactory.getData(url).then(function (reult) {
        console.log(reult);
    });
    $scope.numArray = [1,2,3,4,5,6];
}]);