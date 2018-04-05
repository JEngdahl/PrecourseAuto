
const postingJasmineReporter = require('../../../../../../../../postingJasmineReporter');
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new postingJasmineReporter());
var _ = require('underscore')
