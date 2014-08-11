(function () {
  angular.module('angular-draggable', [])
    .directive('draggable', ['$document', '$compile', function ($document, $compile) {
      return {
        restrict: 'EA',
        scope: {
          lockx: '=',
          locky: '=',
          resizex: '='
        },
        link: function (scope, element, attrs) {
          // valiables
          var x = 0, y = 0, startX = 0, startY = 0;
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
            cursor: 'pointer'
          });

          // event handler binding
          element.on('mousedown', onMouseDown);

          // resize handler x-axis
          if (scope.resizex) {
            // valiables
            var xHandleStart = 0, xHandleDiff = 0;
            // handle jqlite object
            var xHandle = angular.element('<div/>');
            // styles
            xHandle.css({
              zIndex: 90, cursor: 'e-resize', width: '7px', right: '-5px', top: 0, height: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });
            // event handler
            var xHandleMouseMove = function (e) {
              xHandleDiff = e.screenX - xHandleStart - x;
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
              xHandleStartX = e.screenX - xHandleDiff;

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
        }
      };
    }]);
} ());