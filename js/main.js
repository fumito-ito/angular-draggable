(function () {
  angular.module('angular-draggable', [])
    .directive('draggable', ['$document', '$compile', function ($document, $compile) {
      return {
        restrict: 'EA',
        scope: {
          lockx: '=',
          locky: '=',
          resizex: '=',
          resizey: '=',
          left: '@',
          top: '@'
        },
        link: function (scope, element, attrs) {
          // valiables
          var x = scope.left || 0, y = scope.top || 0, startX = 0, startY = 0;
          // event handlers
          var onMouseMove = function (e) {
            x = e.screenX - startX;
            y = e.screenY - startY;

            if (!scope.lockx) {
              element.css({left: x + 'px'});
            }

            if (!scope.locky) {
              element.css({top: y + 'px'});
            }
          };

          var onMouseUp = function (e) {
            $document.off('mousemove', onMouseMove);
            $document.off('mouseup', onMouseUp);
          };

          var onMouseDown = function (e) {
            // Prevent default dragging of selected content
            e.preventDefault();
            startX = e.screenX - x;
            startY = e.screenY - y;
            $document.on('mousemove', onMouseMove);
            $document.on('mouseup', onMouseUp);
          };

          // style
          element.css({
            position: 'relative',
            cursor: 'pointer',
            top: (scope.top || 0) + 'px',
            left: (scope.left || 0) + 'px'
          });

          // event handler binding
          element.on('mousedown', onMouseDown);

          // resize handler x-axis
          if (scope.resizex) {
            // valiables
            var xHandleStart = 0, xHandleDiff = element.prop('offsetWidth');
            // handle jqlite object
            var xHandle = angular.element('<div/>');
            // styles
            xHandle.css({
              zIndex: 90, cursor: 'e-resize', width: '7px', right: '-5px', top: 0, height: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });
            // event handler
            var xHandleMouseMove = function (e) {
              xHandleDiff = e.screenX - xHandleStart;
              element.css({width: xHandleDiff + 'px'});
            };
            var xHandleMouseUp = function (e) {
              $document.off('mousemove', xHandleMouseMove);
              $document.off('mouseup', xHandleMouseUp);
            };
            var xHandleMouseDown = function (e) {
              e.preventDefault();
              e.stopPropagation();
              // set default positions
              xHandleStart = e.screenX - xHandleDiff;

              // add handler
              $document.on('mousemove', xHandleMouseMove);
              $document.on('mouseup', xHandleMouseUp);
            };

            // bind handlers
            xHandle.bind('mousedown', xHandleMouseDown);

            // compile and append to html
            $compile(xHandle)(scope);
            element.append(xHandle);
          }

          // resize handler y-axis
          if (scope.resizey) {
            // valiables
            var yHandleStart = 0, yHandleDiff = element.prop('offsetHeight');
            // handle jqlite object
            var yHandle = angular.element('<div/>');
            // styles
            yHandle.css({
              zIndex: 90, cursor: 's-resize', height: '7px', bottom: '-5px', left: 0, width: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });

            // event handler
            var yHandleMouseMove = function (e) {
              yHandleDiff = e.screenY - yHandleStart;
              element.css({height: yHandleDiff + 'px'});
            };
            var yHandleMouseUp = function (e) {
              $document.off('mousemove', yHandleMouseMove);
              $document.off('mouseup', yHandleMouseUp);
            };
            var yHandleMouseDown = function (e) {
              e.preventDefault();
              e.stopPropagation();
              // set default positions
              yHandleStart = e.screenY - yHandleDiff;

              // add handler
              $document.on('mousemove', yHandleMouseMove);
              $document.on('mouseup', yHandleMouseUp);
            };

            // bind handlers
            yHandle.bind('mousedown', yHandleMouseDown);

            // compile and append to html
            $compile(yHandle)(scope);
            element.append(yHandle);
          }
        }
      };
    }]);
} ());