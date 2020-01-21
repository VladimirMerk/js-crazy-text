{
  window.addEventListener("load", function() {

    const paragraphs = document.querySelectorAll('article > *');
    const checkboxes = document.querySelectorAll('input[type=checkbox]');

    paragraphs.forEach((paragraph) => {
      const fragment = document.createDocumentFragment();
      paragraph.childNodes.forEach((node, indexPar) => {
        const cloneNode = node.cloneNode(true);
        if (cloneNode.textContent) {
          const splittedTextElement = splittextContent(cloneNode.textContent);
          if (cloneNode.nodeType === 1) {
            cloneNode.innerHTML = '';
            cloneNode.appendChild(splittedTextElement);
            fragment.append(cloneNode);
          } else {
            fragment.append(splittedTextElement);
          }
        } else {
          fragment.append(cloneNode);
        }
      });
      paragraph.innerHTML = '';
      paragraph.appendChild(fragment);
      paragraph.addEventListener('transitionend', paragraphOnTransitionEnd);
      paragraph.classList.add('show');
    });

    function splittextContent(str) {
      const fragment = document.createDocumentFragment();
      splittedText = [...str];
      for (const [indexChar, char] of splittedText.entries()) {
        if (indexChar > 0 && !/\s/.test(char)) {
          const span = document.createElement('span')
          span.append(document.createTextNode(char));
          if (random(0, 1)) {
            span.classList.add('hidden');
          }
          fragment.append(span);
        } else {
          fragment.append(document.createTextNode(char));
        }
      }
      return fragment;
    }

    function paragraphOnTransitionEnd(e) {
      deepRemoveClass(e.target.children)
    }

    function deepRemoveClass(elementCollection) {
      if (elementCollection) {
        for (const element of elementCollection) {
          if (element.children.length > 0) {
            deepRemoveClass(element.children);
          } else {
            element.classList.remove('hidden');
          }
        }
      }
    }

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', checkboxesOnChange);
    });

    function checkboxesOnChange(e) {
      let className = '';
      switch (e.target.id) {
        case 'rotation':
          className = 'rotating';
          break;
        case 'rainbow':
          className = 'iridescent';
          break;
        case 'expanding':
          className = 'expanding';
          break;
      }
      if (className) {
        const spans = document.querySelectorAll('article > * span');
        for (const span of spans) {
          const mode = e.target.checked ? 'add' : 'remove';
          switch (mode) {
            case 'add':
              if (random(0, 1)) {
                span.classList[mode](className);
              }
              if (className === 'expanding') {
                span.style.setProperty('--length', CSS.px(random(1, 20)));
              }
              break;
            case 'remove':
              span.classList[mode](className);
              break;
          }
        }
      }
    }

    function random(min = 0, max = 1) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }
  });
}
