/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp',['ionic','cftApp.httpFactory','cftApp.tabs','cftApp.news','cftApp.search','cftApp.live','cftApp.topic','cftApp.personal','cftApp.slideBox']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
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
angular.module('cftApp.live',[]).config(['$stateProvider',function ($stateProvider) {
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
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.personal',[]).config(['$stateProvider',function ($stateProvider) {
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
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.tabs',[]).controller('tabsController',['$scope',function ($scope) {
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
angular.module('cftApp.topic',[]).config(['$stateProvider',function ($stateProvider) {
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
angular.module('cftApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
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
                    reslut = reslut[Object.keys(reslut)[0]];
                    promise.resolve(reslut);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    }
}]);
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