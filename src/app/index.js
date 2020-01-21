goog.provide('projects.takenote');
goog.require('goog.dom');

projects.takenote.main = function() {
  const container = goog.dom.createDom(goog.dom.TagName.DIV, {
    height: '400px',
    width: '500px',
    id: 'new',
  });
  console.log(container);
  container.innerHTML('test');

  const root = goog.dom.getRequiredElement('root');
  goog.dom.appendChild(root, container);
};

