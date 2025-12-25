import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';

export const remarkPythonPlayground: Plugin<[], Root> = () => {
  return (tree) => {
    console.log('Remark plugin is running!');
    
    visit(tree, 'code', (node: any, index: number, parent: any) => {
      console.log('Found code block:', { lang: node.lang, meta: node.meta });
      
      if (node.lang === 'python' && node.meta?.includes('live')) {
        console.log('Converting python live block!');
        const code = node.value;
        
        parent.children[index] = {
          type: 'html',
          value: `<div class="python-playground" data-code="${escapeHtml(code)}"></div>`
        };
      }
    });
  };
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
