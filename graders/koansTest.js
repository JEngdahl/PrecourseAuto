
const loggingJasmineReporter = require('../../../../../../../../loggingJasmineReporter');
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new loggingJasmineReporter());
var _ = require('underscore')
