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
          width: '=',
          height: '=',
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
            if (angular.isDefined(scope.left)) {
              scope.left = left;
            }
            if (angular.isDefined(scope.top)) {
              scope.top = top;
            }
            scope.$apply();

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
            cursor: 'pointer'
          });

          if (angular.isDefined(scope.top)) {
            element.css({top: scope.top + 'px'});
          }
          if (angular.isDefined(scope.left)) {
            element.css({left: scope.left + 'px'});
          }
          if (angular.isDefined(scope.width)) {
            element.css({width: scope.width + 'px'});
          }
          if (angular.isDefined(scope.height)) {
            element.css({height: scope.height + 'px'});
          }

          // event handler binding
          element.on('mousedown', onMouseDown);

          // resize handler x-axis
          if (scope.resizex) {
            // valiables
            var xHandleStart = 0;
            var width = scope.width || element.prop('offsetWidth');
            // handle jqlite object
            var xHandle = angular.element('<div/>');
            // styles
            xHandle.css({
              zIndex: 90, cursor: 'e-resize', width: '7px', right: '-5px', top: 0, height: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });
            // event handler
            var xHandleMouseMove = function (e) {
              width = +width + e.screenX - xHandleStart;
              if (angular.isDefined(scope.width)) {
                scope.width = width;
                scope.$apply();
              }
              xHandleStart = e.screenX;
              element.css({width: width + 'px'});
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
              xHandleStart = e.screenX;

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
            var height = scope.height || element.prop('offsetHeight');
            var yHandleStart = 0;
            // handle jqlite object
            var yHandle = angular.element('<div/>');
            // styles
            yHandle.css({
              zIndex: 90, cursor: 's-resize', height: '7px', bottom: '-5px', left: 0, width: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });

            // event handler
            var yHandleMouseMove = function (e) {
              height = +height + e.screenY - yHandleStart;
              if (angular.isDefined(scope.height)) {
                scope.height = height;
                scope.$apply();
              }
              yHandleStart = e.screenY;
              element.css({height: height + 'px'});
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
              yHandleStart = e.screenY;

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
