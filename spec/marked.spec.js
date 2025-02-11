import { runAllMarkedSpecTests } from '@markedjs/testutils';
import subSuper from '../src/index.js';

runAllMarkedSpecTests({ addExtension: (marked) => { marked.use({ extensions: [subSuper] }); }, outputCompletionTables: true });
