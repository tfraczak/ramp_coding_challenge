# Ramp Coding Challenge

## Author
<a href="https://www.linkedin.com/in/tfraczak" target="_blank">Timothy Fraczak</a>
<br/>
<a href="mailto:tfraczak@gmail.com" target="_blank">tfraczak@gmail.com</a>

```js
// ran this in the browser dev tools console
const findURL = () => {
  const MAIN = 'MAIN';
  const SECTION = 'SECTION';
  const ARTICLE = 'ARTICLE';
  const PATTERN_MAP = {
    [MAIN]: /^(.*)?22$/,
    [SECTION]: /^11(.*)?$/,
    [ARTICLE]: /^(.*)?33(.*)?$/,
  };

  const shouldSkip = (child, tagName) => {
    if (!child.children.length) return true;
    if (child.tagName !== tagName) return true;
    if (!child.getAttribute('id').match(PATTERN_MAP[tagName])) return true;

    return false;
  };

  let url = '';
  const sections = Array.from(document.querySelectorAll('section'));

  sections.forEach((section) => {
    if (shouldSkip(section, SECTION)) return;

    Array.from(section.children).forEach((sChild) => {
      if (shouldSkip(sChild, MAIN)) return;

      Array.from(sChild.children).forEach((mChild) => {
        if (shouldSkip(mChild, ARTICLE)) return;

        Array.from(mChild.children).forEach((aChild) => {
          const isP = aChild.tagName === 'P';
          const hasFlag = aChild.classList.contains('flag');

          if (isP && hasFlag) url += aChild.getAttribute('value');
        });
      });
    });
  });

  return url;
};
```