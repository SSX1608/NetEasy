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