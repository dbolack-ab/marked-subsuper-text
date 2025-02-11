export default function(endRegex = []) {
  return {
    extensions: [
      {
        name  : 'superSubScript',
        level : 'inline',
        start(src) { return src.match(/\^/m)?.index; },  // Hint to Marked.js to stop and check for a match
        tokenizer(src, tokens) {
          const superRegex = /^\^(?!\s)(?=([^\n\^]*[^\s\^]))\1\^/m;
          const subRegex   = /^\^\^(?!\s)(?=([^\n\^]*[^\s\^]))\1\^\^/m;
          let isSuper = false;
          let match = subRegex.exec(src);
          if(!match){
            match = superRegex.exec(src);
            if(match)
              isSuper = true;
          }
          if(match?.length) {
            return {
              type   : 'superSubScript', // Should match "name" above
              raw    : match[0],          // Text to consume from the source
              tag    : isSuper ? 'sup' : 'sub',
              tokens : this.lexer.inlineTokens(match[1])
            };
          }
        },
        renderer(token) {
          return `<${token.tag}>${this.parser.parseInline(token.tokens)}</${token.tag}>`;
        }
      }
    ]
  };
}
