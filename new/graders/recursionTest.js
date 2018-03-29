// okay so the approach here for getElements is we are using cheerio instead of jquery.
const expect = require('chai').expect;
const _ = require('underscore')
const cheerio = require('cheerio')
const $ = cheerio.load(
    `
  <!DOCTYPE HTML>
  <html>
  <head>
    <title>Mocha Spec Runner</title>
  <body>
  <div id="mocha"></div>
  </body>
  </html>
`)

// fake document object with body with cheerio and getElementsByClassName for the test
const document = {};
document.body = $('body');
document.getElementsByClassName = function (className/*START SOLUTION*/, element/*END SOLUTION*/) {
    // your code here
    /*START SOLUTION*/
    element = element || document.body;
    var results = [];

    if (element.classList && _.contains(element.classList, className)) {
        results.push(element);
    }
    _.each(element.childNodes, function (node, i) {
        results = results.concat(getElementsByClassName(className, node));
    });

    return results;
    /*END SOLUTION*/
};


var htmlStrings = [
    '<div class="targetClassName"></div>',
    '<div class="otherClassName targetClassName"></div>',
    '<div><div class="targetClassName"></div></div>',
    '<div><div class="targetClassName"><div class="targetClassName"></div></div></div>',
    '<div><div></div><div><div class="targetClassName"></div></div></div>',
    '<div><div class="targetClassName"></div><div class="targetClassName"></div></div>',
    '<div><div class="somediv"><div class="innerdiv"><span class="targetClassName">yay</span></div></div></div>'
];

// this is the one test directly from spec, note it only give one pass/fail. 
describe('getElementsByClassName', function () {

    it('should match the results of calling the built-in function', function () {
        $('body').addClass('targetClassName');
        htmlStrings.forEach(function (htmlString) {
            var $rootElement = $(htmlString);
            $('body').append($rootElement);

            var result = getElementsByClassName('targetClassName');
            var expectedNodeList = document.getElementsByClassName('targetClassName');
            var expectedArray = Array.prototype.slice.apply(expectedNodeList);
            var equality = _.isEqual(result, expectedArray); // why can't we use `===` here?
            expect(equality).to.equal(true);

            $rootElement.remove();
        });
        $('body').removeClass('targetClassName');
    });

});



// this is fixtures.js ... a bit unsightly, but I don't want to deal with mutiple files

var FILL_ME_IN = 'Fill me in.';

var validStrings, invalidStrings, // used for stringifyJSON and parseJSON specs
    weirdObjects; // used for stringifyJSON spec

var stringifiableObjects = [
    9,
    null,
    true,
    false,
    'Hello world',
    [],
    [8],
    ['hi'],
    [8, 'hi'],
    [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
    [8, [[], 3, 4]],
    [[[['foo']]]],
    {},
    { 'a': 'apple' },
    { 'foo': true, 'bar': false, 'baz': null },
    { 'boolean, true': true, 'boolean, false': false, 'null': null },
    // basic nesting
    { 'a': { 'b': 'c' } },
    { 'a': ['b', 'c'] },
    [{ 'a': 'b' }, { 'c': 'd' }],
    { 'a': [], 'c': {}, 'b': true }
];

// used for stringifyJSON spec
// hint: JSON does not allow you to stringify functions or
// undefined values, so you should skip those key/value pairs.
unstringifiableValues = [
    {
        'functions': function () { },
        'undefined': undefined
    }
];

parseableStrings = [
    // basic stuff
    '[]',
    '{"foo": ""}',
    '{}',
    '{"foo": "bar"}',
    '["one", "two"]',
    '{"a": "b", "c": "d"}',
    '[null,false,true]',
    '{"foo": true, "bar": false, "baz": null}',
    '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
    '{"boolean, true": true, "boolean, false": false, "null": null }',

    // basic nesting
    '{"a":{"b":"c"}}',
    '{"a":["b", "c"]}',
    '[{"a":"b"}, {"c":"d"}]',
    '{"a":[],"c": {}, "b": true}',
    '[[[["foo"]]]]',

    // escaping
    '["\\\\\\"\\"a\\""]',
    '["and you can\'t escape thi\s"]',

    // everything all at once
    '{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
    '"documentation":"A corelet that provides the capability to upload' +
    ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
    '{"documentation":"Displays a dialog box that allows user to ' +
    'select a folder on the local system.","name":' +
    '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
    'callback function for results.","name":"callback","required":' +
    'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
    ' in the folder provided.","name":"UploadFolder","parameters":' +
    '[{"documentation":"The path to upload mp3 files from."' +
    ',"name":"path","required":true,"type":"string"},{"documentation":' +
    ' "The callback function for progress.","name":"callback",' +
    '"required":true,"type":"callback"}]},{"documentation":"Returns' +
    ' the server name to the current locker service.",' +
    '"name":"GetLockerService","parameters":[]},{"documentation":' +
    '"Changes the name of the locker service.","name":"SetLockerSer' +
    'vice","parameters":[{"documentation":"The value of the locker' +
    ' service to set active.","name":"LockerService","required":true' +
    ',"type":"string"}]},{"documentation":"Downloads locker files to' +
    ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
    'documentation":"The origin path of the locker file.",' +
    '"name":"path","required":true,"type":"string"},{"documentation"' +
    ':"The Window destination path of the locker file.",' +
    '"name":"destination","required":true,"type":"integer"},{"docum' +
    'entation":"The callback function for progress.","name":' +
    '"callback","required":true,"type":"callback"}]}],' +
    '"name":"LockerUploader","version":{"major":0,' +
    '"micro":1,"minor":0},"versionString":"0.0.1"}',
    '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }',
    '{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'
];

// JSON does not allow you to parse these strings
unparseableStrings = [
    '["foo", "bar"',
    '["foo", "bar\\"]'
];

// stringifyJSON test from /spec
describe('stringifyJSON', function () {
    it('should match the result of calling JSON.stringify', function () {

        stringifiableObjects.forEach(function (test) {
            var expected = JSON.stringify(test);
            var result = stringifyJSON(test);
            /* START SOLUTION */
            expect(result).to.equal(expected);
            /* ELSE
            expect(result).to.equal(FILL_ME_IN);
            END SOLUTION */
        });

        unstringifiableValues.forEach(function (obj) {
            var expected = JSON.stringify(obj);
            var result = stringifyJSON(obj);
            /* START SOLUTION */
            expect(result).to.equal(expected);
            /* ELSE
            expect(result).to.equal(FILL_ME_IN);
            END SOLUTION */
        });

    });
});


// parseJSON test from /spec
describe('parseJSON', function () {

    it('should match the result of calling JSON.parse', function () {
        parseableStrings.forEach(function (test) {
            var result = parseJSON(test);
            var expected = JSON.parse(test);
            var equality = _.isEqual(result, expected);
            expect(equality).to.equal(true);

        });
    });

    it('should throw an error for invalid stringified JSON', function () {
        unparseableStrings.forEach(function (test) {
            var fn = function () {
                parseJSON(test);
            };
            expect(fn).to.throw(SyntaxError);
        });
    });

});