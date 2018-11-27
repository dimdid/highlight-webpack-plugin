[highlight.js]:https://github.com/highlightjs/highlight.js
[webpack]:https://webpack.js.org/

# highlight-webpack-plugin

Use [highlight.js][highlight.js] with [webpack][webpack] and html-webpack-plugin.

## Usage

~~~js
// webpack.config.js
const HighlightPlugin = require('highlight-webpack-plugin')

webpackConfig.plugins.push(new HighlightPlugin);
~~~

> for now can import styles from 'highlight.js/styles/'

~~~scss
// main.css
@import "~highlight.js/styles/docco.css";
~~~

