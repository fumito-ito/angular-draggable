(function () {
  angular.module('angular-draggable', [])
    .directive('ngDraggable', ['$document', '$compile', function ($document, $compile) {
      return {
        restrict: 'EA',
        template: '<div ng-transclude></div>',
        transclude: true,
        replace: true,
        scope: {
          lockx: '=',
          locky: '=',
          resizex: '=',
          resizey: '=',
          left: '=',
          top: '=',
          width: '=',
          height: '=',
	  min: '@',
          onResizeX: '&',
          onResizeY: '&'
        },
        link: function (scope, element) {
          // valiables
          var startX = 0;
          var startY = 0;
          var left = scope.left || 0;
          var top = scope.top || 0;
	  var min = scope.min ? parseInt(scope.min) : 100;
          scope.onResizeX = scope.onResizeX || angular.noop;
          scope.onResizeY = scope.onResizeY || angular.noop;
          // event handlers
          var onMouseMove = function (e) {
            left = e.screenX - startX;
            top = e.screenY - startY;
            if (angular.isDefined(scope.left) && !scope.lockx) {
              scope.left = left;
            }
            if (angular.isDefined(scope.top) && !scope.locky) {
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

          var onMouseUp = function () {
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
            top: top + 'px',
            left: left + 'px'
          });

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
            var xHandleRight = angular.element('<div/>');
            var xHandleLeft = angular.element('<div/>');

            // styles
            xHandleRight.css({
              zIndex: 90, cursor: 'e-resize', width: '7px', right: '-5px', top: 0, height: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });
            xHandleLeft.css({
              zIndex: 90, cursor: 'w-resize', width: '7px', left: '-5px', top: 0, height: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });
            // event handler
            var xHandleMouseMoveRight = function (e) {
              var diff = e.screenX - xHandleStart;
              width = +width + diff;

	      // check for mimun width
	      if (width < min) {
	        width = min;
	      }
              if (angular.isDefined(scope.width)) {
                scope.width = width;
                scope.$apply();
              }

              xHandleStart = e.screenX;
              element.css({width: width + 'px'});
            };
            var xHandleMouseMoveLeft = function (e) {
              var diff = e.screenX - xHandleStart;
              left = parseInt(left) + parseInt(diff);
              width = +width - diff;

              // check for minimum width
              if (width < min) {
	        left = left + width - min;
		width = min;
	      }
              if (angular.isDefined(scope.width)) {
                scope.width = width;
                scope.$apply();
              }

              xHandleStart = e.screenX;
              element.css({width: width + 'px', left: left + 'px'});
            };
            var xHandleMouseUpRight = function () {
              try {
                scope.onResizeX();
              } catch (ex) {
                console.log('ResizeY callback has following error :: ' + e.message);
              } finally {
                $document.off('mousemove', xHandleMouseMoveRight);
                $document.off('mouseup', xHandleMouseUpRight);
              }
            };
            var xHandleMouseUpLeft = function () {
              try {
                scope.onResizeX();
              } catch (ex) {
                console.log('ResizeY callback has following error :: ' + e.message);
              } finally {
                $document.off('mousemove', xHandleMouseMoveLeft);
                $document.off('mouseup', xHandleMouseUpLeft);
              }
            };
            var xHandleMouseDownRight = function (e) {
              e.preventDefault();
              e.stopPropagation();
              // set default positions
              xHandleStart = e.screenX;

              // add handler
              $document.on('mousemove', xHandleMouseMoveRight);
              $document.on('mouseup', xHandleMouseUpRight);
            };
            var xHandleMouseDownLeft = function (e) {
              e.preventDefault();
              e.stopPropagation();
              // set default positions
              xHandleStart = e.screenX;

              // add handler
              $document.on('mousemove', xHandleMouseMoveLeft);
              $document.on('mouseup', xHandleMouseUpLeft);
            };
            // bind handlers
            xHandleRight.bind('mousedown', xHandleMouseDownRight);
            xHandleLeft.bind('mousedown', xHandleMouseDownLeft);

            // compile and append to html
            $compile(xHandleRight)(scope);
            element.append(xHandleRight);

            $compile(xHandleLeft)(scope);
            element.append(xHandleLeft)
          }

          // resize handler y-axis
          if (scope.resizey) {
            // valiables
            var height = scope.height || element.prop('offsetHeight');
            var yHandleStart = 0;
            // handle jqlite object
            var yHandleBottom = angular.element('<div/>');
            var yHandleTop = angular.element('<div/>');
            // styles
            yHandleBottom.css({
              zIndex: 90, cursor: 's-resize', height: '7px', bottom: '-5px', left: 0, width: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });
            yHandleTop.css({
              zIndex: 90, cursor: 'n-resize', height: '7px', top: '-5px', left: 0, width: '100%',
              position: 'absolute', display: 'block', touchAction: 'none'
            });

            // event handler
            var yHandleTopMouseMove = function (e) {
              var diff = e.screenY - yHandleStart;
              height = +height - diff;
              top = top + diff;
              if (angular.isDefined(scope.height)) {
                  scope.height = height;
                  scope.$apply();
              }
              yHandleStart = e.screenY;
              element.css({height: height + 'px', top: top + 'px'});
            };
            var yHandleBottomMouseMove = function (e) {
              height = +height + e.screenY - yHandleStart;
              if (angular.isDefined(scope.height)) {
                scope.height = height;
                scope.$apply();
              }
              yHandleStart = e.screenY;
              element.css({height: height + 'px'});
            };

            var yHandleTopMouseUp = function () {
              try {
                scope.onResizeY();
              } catch (ex) {
                console.log('ResizeY callback has following error :: ' + ex.message);
              } finally {
                $document.off('mousemove', yHandleTopMouseMove);
                $document.off('mouseup', yHandleTopMouseUp);
              }
            };
            var yHandleBottomMouseUp = function () {
              try {
                scope.onResizeY();
              } catch (ex) {
                console.log('ResizeY callback has following error :: ' + e.message);
              } finally {
                $document.off('mousemove', yHandleBottomMouseMove);
                $document.off('mouseup', yHandleBottomMouseUp);
              }
            };

            var yHandleTopMouseDown = function (e) {
              e.preventDefault();
              e.stopPropagation();
              // set default positions
              yHandleStart = e.screenY;

              // add handler
              $document.on('mousemove', yHandleTopMouseMove);
              $document.on('mouseup', yHandleTopMouseUp);
            };
            var yHandleBottomMouseDown = function (e) {
              e.preventDefault();
              e.stopPropagation();
              // set default positions
              yHandleStart = e.screenY;

              // add handler
              $document.on('mousemove', yHandleBottomMouseMove);
              $document.on('mouseup', yHandleBottomMouseUp);
            };

            // bind handlers
            yHandleTop.bind('mousedown', yHandleTopMouseDown);
            yHandleBottom.bind('mousedown', yHandleBottomMouseDown);

            // compile and append to html
            $compile(yHandleTop)(scope);
            element.append(yHandleTop);
            $compile(yHandleBottom)(scope);
            element.append(yHandleBottom);
          }
        }
      };
    }]);
} ());
