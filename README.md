[highlight.js]:https://github.com/highlightjs/highlight.js
[webpack]:https://webpack.js.org/
[doc]:https://htmlpreview.github.io/?https://raw.githubusercontent.com/dimdid/highlight-webpack-plugin/needItNow/doc/highlight-webpack-plugin/0.3.0/HighlightPlugin.html

# highlight-webpack-plugin

Use [highlight.js][highlight.js] with [webpack][webpack] and html-webpack-plugin.

> see [documentation][doc]
## Usage
~~~sh
npm i -D https://github.com/dimdid/highlight-webpack-plugin.git
~~~
~~~js
// webpack.config.js
const HighlightPlugin = require('highlight-webpack-plugin')

webpackConfig.plugins.push(new HighlightPlugin());
~~~

> for now can import styles from 'highlight.js/styles/'

~~~scss
// main.css
@import "~highlight.js/styles/docco.css";
~~~


## Exemple

~~~html
<!--withcode.hbs-->
<code>
    let myBool = true;
    let b = 42;
    let x= 10 + b;
    const myFunc = () => console.log('Hello');
</code>

<code>
   body { color: green; }
</code>

<code>
    typeset -A myArray
    myArray=(key1 val1 key2 val2)
    for k v in myArray; do
        echo "$k => $v"
    done
</code>
</code>
~~~
devient
~~~html
<code class="hljs javascript">
    <span class="hljs-keyword">let</span> myBool = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">let</span> b = <span class="hljs-number">42</span>;
    <span class="hljs-keyword">let</span> x= <span class="hljs-number">10</span> + b;
    <span class="hljs-keyword">const</span> myFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>);
</code>

<code class="hljs css">
   <span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">color</span>: green; }
</code>

<code class="hljs nginx">
    <span class="hljs-attribute">typeset</span> -A myArray
    myArray=(key1 val1 key2 val2)
    for k v in myArray; <span class="hljs-attribute">do</span>
        echo <span class="hljs-string">"<span class="hljs-variable">$k</span> =&gt; <span class="hljs-variable">$v</span>"</span>
    done
</code>

> shell script my parsed as nginx or javascript..
