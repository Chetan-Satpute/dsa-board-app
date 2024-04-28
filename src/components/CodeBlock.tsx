import hljs from 'highlight.js/lib/core';
import hljsJavascript from 'highlight.js/lib/languages/javascript';

import 'highlight.js/styles/tokyo-night-dark.css';

hljs.registerLanguage('javascript', hljsJavascript);

interface Props {
  text: string;
  hlLines?: number[];
}

function CodeBlock(props: Props) {
  const {text, hlLines = []} = props;

  const html = hljs.highlight(text, {language: 'javascript'}).value;
  const htmlLines = html.split('\n').map(text => text || ' ');

  const lines = htmlLines.map((lineHtml, index) => {
    const isHighlighted = hlLines.includes(index);
    return (
      <p
        key={index + lineHtml}
        dangerouslySetInnerHTML={{__html: lineHtml}}
        className={isHighlighted ? 'font-ubuntu highlighted-code-line' : 'font-ubuntu code-line'}
      />
    );
  });

  return (
    <pre className="font-ubuntu no-scrollbar m-0 flex">
      <code className="flex-1">{lines}</code>
    </pre>
  );
}

export default CodeBlock;
