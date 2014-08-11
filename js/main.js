(function () {
  angular.module('angular-draggable', [])
    .directive('draggable', ['$document', function ($document) {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
          // valiables
          var x = 0, y = 0, startX = 0, startY = 0;
          // event handlers
          var onMouseMove = function (e) {
            x = event.screenX - startX;
            y = event.screenY - startY;

            element.css({top: y + 'px', left: x + 'px'});
          };

          var onMouseUp = function (e) {
            $document.off('mousemove', onMouseMove);
            $document.off('mouseup', onMouseUp);
          };

          var onMouseDown = function (e) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', onMouseMove);
            $document.on('mouseup', onMouseUp);
          };

          // style
          element.css({
            position: 'relative',
            cursor: 'pointer'
          });

          // event handler binding
          element.on('mousedown', onMouseDown);
        }
      };
    }]);
} ());