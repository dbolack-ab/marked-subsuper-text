import { marked } from 'marked';
import subSuper from '../src/index.js';

function trimLines(s) {
  return s.split('\n').map(l => l.trim()).join('\n');
}

describe('Correct Standard Usage', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines(`This is ^superscript^.`))).toMatchSnapshot();
  });

  test('Subscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines(`This is ^^subscript^^.`))).toMatchSnapshot();
  });

  test('Sub and Super', () => {
    marked.use(subSuper());
    expect(marked(trimLines(`This is ^^sub^^ and this is ^super^.`))).toMatchSnapshot();
  });
});

describe('Incorrect Standard Usage', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('Three Balanced Carets', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^^text^^^'))).toMatchSnapshot();
  });

  test('Four Balanced Carets', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^^^text^^^^'))).toMatchSnapshot();
  });

  test('Five Balanced Carets', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^^^^text^^^^^'))).toMatchSnapshot();
  });

  test('Six Balanced Carets', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^^^^^text^^^^^^'))).toMatchSnapshot();
  });

  test('Superscript inside a subscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^some ^text^ here^^'))).toMatchSnapshot();
  });

  test('Subscript inside a Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^some ^^text^^ here^'))).toMatchSnapshot();
  });

  test('Tight Ending Superscript inside a subscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^some ^text^^^'))).toMatchSnapshot();
  });

  test('Tight Starting Superscript inside a subscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^^some^ text^^'))).toMatchSnapshot();
  });

  test('Multiple Nested Superscripts', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^multiple ^nested ^supers^^^'))).toMatchSnapshot();
  });

  test('Multiple Nested Subscripts', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^multiple ^^nested ^^subs^^^^^^'))).toMatchSnapshot();
  });

  test('Multiple Alternating Super and Subscripts', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^multiple ^^alternating ^nested ^^super ^subs^^^^^^^'))).toMatchSnapshot();
  });
});

describe('Mismatched delimiters', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('Subscript then Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^mismatched delimiters^'))).toMatchSnapshot();
  });

  test('Superscript then Subscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^mismatched delimiters^^'))).toMatchSnapshot();
  });

  test('No closing Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^mismatched delimiters'))).toMatchSnapshot();
  });

  test('No starting Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('mismatched delimiters^'))).toMatchSnapshot();
  });

  test('No Closing subscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^mismatched delimiters'))).toMatchSnapshot();
  });

  test('No starting Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('mismatched delimiters^^'))).toMatchSnapshot();
  });
});

describe('Invalid Spacing and delimiters', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('Trailing space in a Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^invalid super ^'))).toMatchSnapshot();
  });

  test('Leading space in a Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^ invalid super^'))).toMatchSnapshot();
  });

  test('Superscript - caret in the middle', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^caret in ^ middle^'))).toMatchSnapshot();
  });

  test('Superscript - double caret in the middle', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^carets in ^^ middle^'))).toMatchSnapshot();
  });

  test('Superscript - loose carets in the middle', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^ lone ^ ^ ^ carets ^'))).toMatchSnapshot();
  });

  test('Trailing space in a Subscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^invalid sub ^^'))).toMatchSnapshot();
  });

  test('Leading space in a Superscript', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^ invalid sub^^'))).toMatchSnapshot();
  });

  test('Subscript - caret in the middle', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^caret in ^ middle^^'))).toMatchSnapshot();
  });

  test('Subscript - double carets in the middle', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^carets in ^^ middle^^'))).toMatchSnapshot();
  });

  test('Subscript - loose double carets in the middle', () => {
    marked.use(subSuper());
    expect(marked(trimLines('^^ lone ^^ double ^^ ^^ carets ^^'))).toMatchSnapshot();
  });
});
