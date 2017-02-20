var expect = require('chai').expect;
import { loadTranslation } from '../src/index.js';
//import jsonfile from 'jsonfile';
//var testLanguageFile = './testLanguageFile.json';
//var testLanguageFileMessages = jsonfile.readFileSync(testLanguageFile);
var testLanguageFileMessages = {
    "first_msg": "Message 1",
    "second_msg": "Message 1"
};

describe('enzymeReactIntl', function() {
    it('messages should be loaded from the language file', function () {
        let messages = loadTranslation('/test/testLanguageFile.json');
        expect(messages).to.deep.equal(testLanguageFileMessages);
    });
});