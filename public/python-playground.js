(function() {
  let pyodide = null;
  let loadingPromise = null;

  async function initPyodide() {
    if (loadingPromise) return loadingPromise;
    
    loadingPromise = (async () => {
      // Wait for pyodide to be available
      while (typeof window.loadPyodide === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
      });
      return pyodide;
    })();
    
    return loadingPromise;
  }

  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  function setupPlaygrounds() {
    const playgrounds = document.querySelectorAll('.python-playground:not([data-initialized])');
    
    playgrounds.forEach(playground => {
      playground.setAttribute('data-initialized', 'true');
      
      const code = decodeHtml(playground.dataset.code || '');
      
      // Create UI
      const container = document.createElement('div');
      container.style.marginBottom = '20px';
      
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.spellcheck = false;
      textarea.style.cssText = `
        width: 100%;
        min-height: 200px;
        background: #282c34;
        color: #abb2bf;
        padding: 15px;
        border-radius: 4px;
        border: 1px solid #3e4451;
        font-size: 14px;
        font-family: Monaco, Menlo, "Ubuntu Mono", Consolas, monospace;
        resize: vertical;
        line-height: 1.5;
        tab-size: 4;
      `;
      
      // Handle Tab key
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
      });
      
      const buttonContainer = document.createElement('div');
      buttonContainer.style.cssText = 'margin-top: 10px; display: flex; gap: 10px;';
      
      const runButton = document.createElement('button');
      runButton.textContent = '▶ Run Code';
      runButton.style.cssText = `
        padding: 8px 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
      `;
      
      const resetButton = document.createElement('button');
      resetButton.textContent = '↺ Reset';
      resetButton.style.cssText = `
        padding: 8px 16px;
        background-color: #666;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
      `;
      
      const output = document.createElement('pre');
      output.style.cssText = `
        display: none;
        background: #1e1e1e;
        color: #d4d4d4;
        padding: 15px;
        border-radius: 4px;
        margin-top: 10px;
        overflow: auto;
        font-size: 14px;
        font-family: Monaco, Menlo, "Ubuntu Mono", Consolas, monospace;
        white-space: pre-wrap;
      `;
      
      runButton.addEventListener('click', async () => {
        runButton.disabled = true;
        runButton.textContent = '⏳ Running...';
        output.style.display = 'block';
        output.textContent = 'Running...';
        
        try {
          const py = await initPyodide();
          
          await py.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
          `);
          
          await py.runPythonAsync(textarea.value);
          
          const stdout = await py.runPythonAsync('sys.stdout.getvalue()');
          output.textContent = stdout || '(No output)';
        } catch (err) {
          output.textContent = `Error: ${err.message}`;
        } finally {
          runButton.disabled = false;
          runButton.textContent = '▶ Run Code';
        }
      });
      
      resetButton.addEventListener('click', () => {
        textarea.value = code;
        output.style.display = 'none';
      });
      
      buttonContainer.appendChild(runButton);
      buttonContainer.appendChild(resetButton);
      
      container.appendChild(textarea);
      container.appendChild(buttonContainer);
      container.appendChild(output);
      
      playground.parentNode.replaceChild(container, playground);
    });
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPlaygrounds);
  } else {
    setupPlaygrounds();
  }

  // Watch for dynamic content (for SPAs)
  const observer = new MutationObserver(() => {
    setupPlaygrounds();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
