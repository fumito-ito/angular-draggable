Angular Draggable
=====

Draggable and Resizable element as [AngularJS](https://angularjs.org/) directive.

## Demo

<script type="text/javascript" src="http://jsdo.it/blogparts/fhYt/js?width=465&height=496&view=play"></script>

## Usage

setup in HTML

    <script src="path/to/angular.js"></script>
	<script src="path/to/angular-draggable/js/main.js"></script>
    <script>
      angular.module('sample', ['angular-draggable', function () {}]);
	</script>

use with div

    <div draggable>
	  <p>Draggable Content</p>
	</div>

or element.

    <draggable>
	  <p>Draggable Content</p>
	</draggable>

You can use some options.

    <div draggable [option name]="[option value]"></div>

## Options

#### lockx

*boolean*

If true, element only move with y-axis.

#### locky

*boolean*

If true, element only move with x-axis.

#### resizex

*boolean*

If true, element can be resized with x-axis.

#### resizey

*boolean*

If true, element can be resized with y-axis.

#### left

*number*

default position of left. (This library ignore css properties `top` and `left`)

#### top

*number*

default position of top. (This library ignore css properties `top` and `left`)

## Install

*bower.json*

    "dependencies": { "angular-draggable": "git@github.com:fumitoito/angular-draggable.git" }

and run install script

    $ bower install

## License

The MIT License (MIT)
Copyright (c) 2014 [fumitoito](https://github.com/fumitoito)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
