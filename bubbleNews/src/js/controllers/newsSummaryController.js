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