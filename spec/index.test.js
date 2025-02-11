import { marked } from 'marked';
import subSuper from '../src/index.js';

function trimLines(s) {
  return s.split('\n').map(l => l.trim()).join('\n');
}

describe('subsuper-text', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('Superscript', () => {
    marked.use({ extensions: [ subSuper ] });
    expect(marked(trimLines(`This is ^superscript^.`))).toMatchSnapshot();
  });

  test('Subscript', () => {
    marked.use({ extensions: [ subSuper ] });
    expect(marked(trimLines(`This is ^^subscript^^.`))).toMatchSnapshot();
  });

  test('Sub and Super', () => {
    marked.use({ extensions: [ subSuper ] });
    expect(marked(trimLines(`This is ^^sub^^ and this is ^super^.`))).toMatchSnapshot();
  });

});
