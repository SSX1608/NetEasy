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