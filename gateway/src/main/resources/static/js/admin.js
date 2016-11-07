/**
 * Created by zouye on 2016/11/7.
 */
angular.module('admin', []).controller('home',
    function($http) {
        var computeDefaultTemplate = function(user) {
            self.template = user && user.roles
            && user.roles.indexOf("ROLE_WRITER")>0 ? "write.html" : "read.html";
        }

        $http.get('user').then(function(response) {
            var data = response.data;
            if (data.name) {
                self.authenticated = true;
                self.user = data;
                computeDefaultTemplate(data);
            } else {
                self.authenticated = false;
            }
            self.error = null
        })

    })