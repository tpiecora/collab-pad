angular.module('collabPad')
  .controller('PadController', function ($http, $log, $scope) {
    // get existing content
    $scope.getAllContent = function(){

      io.socket.get('/pad/addcontent');

      $http.get('/pad')
        .success(function(success_data){

          $scope.padContent = success_data[success_data.length-1].content;
          $log.info(success_data);
        });
    };

    $scope.getAllContent();

    io.socket.on('pad', function (obj) {
      if (obj.verb === 'created') {
        $log.info(obj);
        $scope.padContent = obj.data.content;
        //is this digest really necessary?
        $scope.$digest();

      }
    });

    $scope.sendPad = function() {
      if (!$scope.padContent) $scope.padContent = "";
      $log.info($scope.padContent);
      io.socket.post('/pad/addcontent/', {content: $scope.padContent});
    }
  });
