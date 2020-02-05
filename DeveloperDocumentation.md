# Developer Documentation

This file is intended to explain the workings of the extension's setup and run configuration.

## Manifest

The manifest file is the file that Chrome understands and interacts with. The file handles the icon in the address bar
and defines variables for the Chrome Web Store including name, description, and version.

## NPM

NPM is the backbone of the extension. It handles all run configuration scripts and handles development and production
dependencies. It also handles Github configuration and shows attribution to the developers (us!).

NPM has a few commands of use and exposes these to the terminal.

`npm run test`: Runs the Mocha suite of tests. These are found in the test folder of the repository.
`npm run dev`: Runs Webpack to build the extension in development mode. This will engage Webpack's watch functionality.
`npm run prod`: Builds the Extension for production on the Web Store. Useful for final testing.

To add packages to the Extension, run the command `npm install [package-name] --save[-dev]`, where package-name is the
name of the package. The save portion of the command is important. If only using the package for development, run with
`--save dev`, otherwise use `--save`. This helps NPM with build optimization.

## Webpack

Webpack is essentially a compiler for our JavaScript code. Modern browsers can read and understand our JS code, but some
older browsers and such may need our code to be reduced in complexity. In addition, Webpack performs minification and
optimization of our code, to make it run fast and smooth.

You can see the commands used to invoke Webpack inside of package.json, NPM's command script. Notice the scripts
section. You will see that running `npm run dev`, runs Webpack with --watch mode activated. This allows for dynamic
reloading of source files, sometimes called Hot Module Replacement.

Webpack always packages the finished files into the dist folder of the extension. This can then be loaded into the
Chrome Web Store or Chrome in the meantime during development.

## Mocha

Mocha is the testing framework chosen for this project. It is hooked up to JSDOM, a package that 'fakes' the
implementation of the DOM and window. Our JS code is written to allow for JSDOM to work, this is the reason for all of
the seemingly 'extra' null condition checks. Our Mocha testing could always use expanding. If you know how to write
tests, feel free to work on that aspect of the extension.
