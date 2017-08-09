'use strict';

angular.module('webLteApp')
  .factory('AuthService', ['$http', '$rootScope', '$cookieStore', 
  function($http, $rootScope, $cookieStore) {

        $rootScope.BASE_URL = "http://localhost:8080/";

        var AuthService = {};
        AuthService.login = function(username, password){
            console.log("In auth service");
            var loginCreds = {};
            loginCreds.username = username;
            loginCreds.password = password;
            var config = {
                cache: false,
                dataType: 'json',
                contentType: "application/json; charset=utf-8"
            };
            var authKeyRequest = $rootScope.BASE_URL + "users";
            return $http.get(authKeyRequest, {
              headers: {
                "Authorization": 'Basic YWRtaW46cGFzc3dvcmQ=',
                "Content-Type": 'application/json'
              }
            });
        };

        AuthService.signup = function(firstName, lastName, userName, password, phone) {

        };

        AuthService.setCredentials = function(username, password, key){
            var authdata = Base64.encode(username + ':' + password);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
            $http.defaults.headers.common['Authorization'] = 'Basic YWRtaW46cGFzc3dvcmQ=';
            $cookieStore.put('globals', $rootScope.globals);
        };


        AuthService.clearCredentials = function(){
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        };

        var Base64 = {
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        encode: function (input) {
          var output = "";
          var chr1, chr2, chr3 = "";
          var enc1, enc2, enc3, enc4 = "";
          var i = 0;
          do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }
            output = output +
              this.keyStr.charAt(enc1) +
              this.keyStr.charAt(enc2) +
              this.keyStr.charAt(enc3) +
              this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
          } while (i < input.length);
          return output;
        },
        decode: function (input) {
          var output = "";
          var chr1, chr2, chr3 = "";
          var enc1, enc2, enc3, enc4 = "";
          var i = 0;
          // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
          var base64test = /[^A-Za-z0-9\+\/\=]/g;
          if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
          }
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
          do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
          } while (i < input.length);
          return output;
        }
      };
      return AuthService;

  }])