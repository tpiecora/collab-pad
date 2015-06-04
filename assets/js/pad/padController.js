angular.module('collabPad')
  .controller('PadController', function ($http, $log, $scope) {

    // define our document object
    $scope.data = {
      userId: 'ted',
      padId: 'test',
      content: ''
    };

    io.socket.get('/pad/subscribe');

    io.socket.on('pad', function (obj) {
      if(obj.verb === 'updated' && obj.data.padId === $scope.data.padId) {
        $scope.data.content = obj.data.content;
        $log.info('content updated')
        $scope.$digest();
      }
      $log.info('got an update', obj);
    });

    $scope.newPad = function(pad, user) {
      io.socket.post('/pad/getpad', $scope.data)
    };

    $scope.getPad = function (pad) {
      io.socket.get('/pad/getpad', {padId: pad},
        function (data) {
          console.log(data);
          $scope.data.content = data.content;
          console.log(data.content);
          $scope.$apply();
        });
    };

    $scope.sendPad = function () {
      $log.info($scope.data.content);
      io.socket.post('/pad/modify', $scope.data);
    };

    $scope.getSubscribers = function(pad) {
      io.socket.get('/pad/getsubscribers', {padId: pad}, function(data) {
        $scope.subscribers = data;
        $log.info(data);
      });
    }
  });
