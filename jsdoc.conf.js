"use strict";

module.exports = {
  "plugins": [
    //"plugins/commentsOnly"
    //"plugins/summarize.js"
  ],
  "opts": {
    "destination": "./doc"
  },
  "allowUnknowTags":true,
  "recurseDepth": 10,
  "source": {
    "include": ".",
    "exlude": ["node_module"],
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "sourceType": "module",
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc","closure"]
  },
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false
  }
}


