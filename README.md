# jscad-now
🧱👀 Instantly view a [jscad V2](https://github.com/jscad/OpenJSCAD.org/tree/V2) module

![jscad-now](https://user-images.githubusercontent.com/11507384/108975383-494f1680-763b-11eb-90b9-ec7ff6665921.gif)

`jscad-now` is a live reloading viewer powered by [budo](https://www.npmjs.com/package/budo) and [browserify](https://www.npmjs.com/package/browserify) and the [@jscad/regl-renderer](https://www.npmjs.com/package/@jscad/regl-renderer). It is an offline way to help you develop your local jscad models.

## Installation
This tool is meant to be installed globally on your machine, so that you can invoke it in any folder where you are developing a model.
```
npm install -g jscad-now
```

## Usage
Navigate a terminal to any jscad project folder.
Enter: 
```
jscad-now <path-to-your-jscad-file>.js
```

A local web server starts, and a browser appears where you can view your model and adjust its parameters.

Press ENTER in the terminal when you are finished viewing to stop the server and clean up the temp file.

## Features
* Use your own code editor.
* Offline: Install it once and unplug. It's there for you when you need it.
* Debuggable: You can debug and set breakpoints in your code with standard F12 developer tools in your browser. All computation is done on the UI thread, so you can find your own code without looking at worker threads. Note: this also means the browser won't be interactive until your model code completes.
* Live reload: Save your file and the page will automatically reload.
* Bundling: Browserify loads all your code's dependencies (like [@jscad-modeling](https://www.npmjs.com/package/@jscad/modeling), etc.) the Node.js way.

## To-do
1. Download the current model via [@jscad/io](https://www.npmjs.com/package/@jscad/io)
1. Configurable port number (run multiple instances)
1. Parameter type coercion
