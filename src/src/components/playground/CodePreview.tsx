import { useState } from 'react';
import './CodePreview.css';

interface CodePreviewProps {
  code: string;
  language?: string;
}

// Simple tokenizer for HTML/JSX code highlighting
function tokenize(code: string, language: string): { type: string; value: string }[] {
  if (language === 'html') {
    const tokens: { type: string; value: string }[] = [];
    const regex = /(<\/?)([a-zA-Z-]+)([^>]*?)(\/?>)|(\{[^}]*\})|("(?:[^"\\]|\\.)*")|([a-zA-Z-]+=)|(<!--[\s\S]*?-->)|([^<{]+)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(code)) !== null) {
      if (match[1] !== undefined) {
        // Tag opening/closing
        tokens.push({ type: 'punctuation', value: match[1] });
        tokens.push({ type: 'tag', value: match[2] });

        // Attributes part
        const attrs = match[3];
        if (attrs) {
          // Tokenize attributes
          const attrRegex = /([a-zA-Z-]+)(=?)("(?:[^"\\]|\\.)*")?/g;
          let attrMatch;
          let lastAttrIdx = 0;
          while ((attrMatch = attrRegex.exec(attrs)) !== null) {
            const before = attrs.slice(lastAttrIdx, attrMatch.index);
            if (before) tokens.push({ type: 'text', value: before });
            tokens.push({ type: 'attr-name', value: attrMatch[1] });
            if (attrMatch[2]) tokens.push({ type: 'punctuation', value: '=' });
            if (attrMatch[3]) tokens.push({ type: 'attr-value', value: attrMatch[3] });
            lastAttrIdx = attrMatch.index + attrMatch[0].length;
          }
          const remaining = attrs.slice(lastAttrIdx);
          if (remaining) tokens.push({ type: 'text', value: remaining });
        }
        tokens.push({ type: 'punctuation', value: match[4] });
      } else if (match[5]) {
        tokens.push({ type: 'jsx-expr', value: match[5] });
      } else if (match[6]) {
        tokens.push({ type: 'attr-value', value: match[6] });
      } else if (match[7]) {
        tokens.push({ type: 'attr-name', value: match[7] });
      } else if (match[8]) {
        tokens.push({ type: 'comment', value: match[8] });
      } else if (match[9]) {
        tokens.push({ type: 'text', value: match[9] });
      }
    }
    return tokens;
  }
  return [{ type: 'text', value: code }];
}

export default function CodePreview({ code, language = 'html' }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokens = tokenize(code, language);

  return (
    <div className="code-preview">
      <div className="code-preview-header">
        <span className="code-preview-lang">{language.toUpperCase()}</span>
        <button className="code-preview-copy" onClick={handleCopy}>
          <ui-icon name={copied ? 'check' : 'copy'} size="14" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="code-preview-pre">
        <code>
          {tokens.map((token, i) => (
            <span key={i} className={`token-${token.type}`}>
              {token.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
