const hljs = require('highlight.js/lib/highlight');
;
module.exports = HighlightPlugin;

/*
 * for next version of plugin, prefer use getHooks
 */
function nextHighLightPlugin( opts={} ) {
  this.name = 'HighlightPlugin';
  this.apply = compiler => {
    compiler.hooks.compilation.tap(this.name, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(this.name, (data, cb)=> {

      });
    });
  };
}

/**
 * [hwp]:https://webpack.js.org/plugins/html-webpack-plugin/
 * [hljs]:https://highlightjs.org/
 * Insert code markup into html processed by [html-webpack-plugin][hwp]
 * @constructor
 * @param {object} opts
 * @param {array} opts.languages language to support
 *                (js,json,scss,css,shell,markdown enable by default)
 * @param {string} opts.classPrefix class prefix for markup
 *
 * @modifies {html processed by html-webpack-plugin}
 *
 * @requires html-webpack-plugin
 * @requires highlight.js
 *
 * @todo don't reconize scss #{varAsString} -> higlight issue
 * @todo need to add markup before css processing ( to not remove code class from css )
 *       used htmlPlugin hook come too late
 * 
 *
 */
function HighlightPlugin( opts={} ) {
  //TODO: accept styles to load
  let languages = [...(opts.languages || []), ...[
    //defaults
    'javascript', 'json',
    'scss', 'css',
    'shell', 'nginx',
    'markdown',
  ]];
  hljs.configure({
    tabReplace: '  ',
    classPrefix: opts.classPrefix || 'hljs-',
    //languages: languages  //no need since i don't import default...
  });
  let l = languages.length;
  while (l--) {
    hljs.registerLanguage(languages[l], require(`highlight.js/lib/languages/${languages[l]}`));
  }

  //console.log('LANGUAGES === ', hljs.listLanguages())

  this.apply = compiler => {
    compiler.plugin('compilation', (compilation)=> {
      let htmlPlug = compilation.options.plugins.find( 
        plug => plug.constructor.name === 'HtmlWebpackPlugin'
      );
      if (!htmlPlug) { return; }
      compilation.plugin( 'html-webpack-plugin-before-html-processing', (data, cb)=> {
        const blocks = ( src => {
          //TODO: tag may have other attribute than just class, .. but code.. i don't ... ? /(.*)?/
          const preCodeRegex = /<(code|pre)\s?(class=".*")?\s?>/g;
          let blocksToHighlight = [];
          let currMatch;
          while ((currMatch = preCodeRegex.exec(src))) {
            let closeTag = `</${currMatch[1]}>`;
            let insertClassMatch = currMatch[0].match(`<${currMatch[1]} class="`);
            blocksToHighlight.push({
              tag: currMatch[1],
              set src(src) {
                this.code = src;
              },
              set lang(lang) {
                //TODO: when use with class, no need to add lang if exist
                //TODO: use [data-code_lang] attribute but class
                this.openTag = insertClassMatch
                  ? `${insertClassMatch[0]}hljs ${lang} ${currMatch[0].slice(insertClassMatch[0].length)}`
                  :`${currMatch[0].slice(0, `<${this.tag}`.length)} class="hljs ${lang}">`
                ;
              },
              get content(){ return  this.openTag + this.code; },
              iStart: currMatch.index,// + currMatch[0].length,
              iEnd: src.indexOf(closeTag, currMatch.index)
            });

            let {language, value} = hljs.highlightAuto( src.slice(
              blocksToHighlight[blocksToHighlight.length-1].iStart + currMatch[0].length,
              blocksToHighlight[blocksToHighlight.length-1].iEnd
            ));
            blocksToHighlight[blocksToHighlight.length-1].lang = language;
            blocksToHighlight[blocksToHighlight.length-1].src = value;
          }
          return blocksToHighlight;
        })(data.html);

        let l = blocks.length;
        if (!l) {
          //TODO: no cb ? cb(null, data);
          return ;
        }
        let highlighted = data.html.slice(0, blocks[0].iStart);
        for (let i = 0; i < l; i++) {
          highlighted += blocks[i].content;
          highlighted += data.html.slice(blocks[i].iEnd, blocks[i+1]? blocks[i+1].iStart: undefined);
        }
        if (cb) {
          console.error('TODO: use cb !!');
          return cb(null, highlighted);
        } else {
          data.html = highlighted;
        }
      })
    })
  }
}
