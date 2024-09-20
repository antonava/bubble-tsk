import { useCallback, useEffect, useRef } from 'react';

import { TAGS, TagEnum } from '@/types';
import { CustomInput, Tag } from '@/components';

function App() {
  const editorRef = useRef<HTMLDivElement>(null);

  const createTagNode = (tag: TagEnum) => {
    const tagNode = document.createElement('span');

    tagNode.className =
      'inline-flex py-1 px-2 bg-violet-50 text-violet-800 rounded-md hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 tag';
    tagNode.textContent = tag;
    tagNode.contentEditable = 'false';

    tagNode.innerHTML = `
      ${tag}
      <button class="ml-1 text-violet-600 hover:text-violet-900 focus:outline-none delete-tag">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    `;

    return tagNode;
  };

  const updateSelectionAndFocus = (range: Range, selection: Selection) => {
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleTagInsert = (tag: TagEnum) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    const tagNode = createTagNode(tag);
    range.insertNode(tagNode);
    const spaceNode = document.createTextNode(' ');
    range.setStartAfter(tagNode);
    range.insertNode(spaceNode);
    range.setStartAfter(spaceNode);

    updateSelectionAndFocus(range, selection);

    editorRef.current.focus();
  };

  const handleDeleteTag = useCallback((event) => {
    if (event.target.closest('.delete-tag')) {
      const tagElement = event.target.closest('.inline-flex');

      if (tagElement) {
        tagElement.remove();
      }
    }
  }, []);

  useEffect(() => {
    const ref = editorRef.current;

    if (editorRef.current) {
      editorRef.current.addEventListener('click', handleDeleteTag);
    }

    return () => {
      ref?.removeEventListener('click', handleDeleteTag);
    };
  }, [handleDeleteTag]);

  return (
    <div className='max-w-md mx-auto p-4'>
      <CustomInput ref={editorRef} />

      <div className='mt-4'>
        <h3 className='text-lg font-semibold mb-2'>Available Tags:</h3>
        <div className='flex flex-wrap gap-2'>
          {TAGS.map((tag) => (
            <Tag key={tag} tag={tag} handleTagInsert={handleTagInsert} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
