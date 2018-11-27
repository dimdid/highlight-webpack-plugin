"use strict";

module.exports = {
  "plugins": [
    'plugins/markdown',
    //"plugins/commentsOnly"
    "plugins/summarize.js"
  ],
  "opts": {
    "destination": './doc',
    "readme": 'README.md',
    "package": 'package.json'
  },
  "recurseDepth": 10,
  "source": {
    "include": ".",
    "exlude": ['jsdoc.conf.js'], //TODO don't work for directory ! like node_modules or 
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "((^|\\/|\\\\)_)|(node_modules)|(/doc)"
  },
  "sourceType": "module",
  "tags": {
    "allowUnknownTags": ['modifies'],
    "dictionaries": ["jsdoc","closure"]
  },
  "templates": {
    "cleverLinks": true,
    "monospaceLinks": true
  }
}

