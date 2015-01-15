var LESSCompiler = require('broccoli-less-single');
var path         = require('path');
var merge        = require('lodash-node/modern/objects/merge');
var mergeTrees   = require('broccoli-merge-trees');

function LESSPlugin(options) {
  this.name = 'ember-cli-less';
  this.ext = 'less';
  this.options = options;
}

LESSPlugin.prototype.toTree = function(tree, inputPath, outputPath, options) {
  options = merge({}, this.options, options);
  var _this = this,
      paths = options.outputPaths;

  var trees = Object.keys(paths).map(function (file) {
    var input = path.join(inputPath, file + '.' + _this.ext);
    var output = paths[file];

    return new LESSCompiler([tree], input, output, options);
  });

  return mergeTrees(trees);
};

function EmberCLILESS(project) {
  this.project = project;
  this.name = 'Ember CLI LESS';
}

EmberCLILESS.prototype.included = function included(app) {
  var options = app.options.lessOptions || {};
  if ((options.sourceMap === undefined) && (app.env === 'development')) {
    options.sourceMap = true;
  }
  app.registry.add('css', new LESSPlugin(options));
};

module.exports = EmberCLILESS;
