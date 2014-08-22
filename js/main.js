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
          left: '=',
          top: '=',
          onResizeX: '&',
          onResizeY: '&'
        },
        link: function (scope, element, attrs) {
          // valiables
          var startX = 0;
          var startY = 0;
          var left = scope.left || 0;
          var top = scope.top || 0;
          scope.onResizeX = scope.onResizeX || angular.noop;
          scope.onResizeY = scope.onResizeY || angular.noop;
          // event handlers
          var onMouseMove = function (e) {
            left = e.screenX - startX;
            top = e.screenY - startY;

            if (!scope.lockx) {
              element.css({left: left + 'px'});
            }

            if (!scope.locky) {
              element.css({top: top + 'px'});
            }
          };

          var onMouseUp = function (e) {
            $document.off('mousemove', onMouseMove);
            $document.off('mouseup', onMouseUp);
          };

          var onMouseDown = function (e) {
            // Prevent default dragging of selected content
            e.preventDefault();
            startX = e.screenX - left;
            startY = e.screenY - top;
            $document.on('mousemove', onMouseMove);
            $document.on('mouseup', onMouseUp);
          };

          // style
          element.css({
            position: 'absolute',
            cursor: 'pointer',
            top: (top || 0) + 'px',
            left: (left || 0) + 'px'
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
              scope.onResizeX();
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
              scope.onResizeY();
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