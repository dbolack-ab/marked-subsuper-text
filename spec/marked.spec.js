import { runAllMarkedSpecTests } from '@markedjs/testutils';
import supSuper from '../src/index.js';

runAllMarkedSpecTests({ addExtension: (marked) => { marked.use({ extensions: [subSuper] }); }, outputCompletionTables: true });
