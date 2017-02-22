import React from 'react';
import chai, {expect, assert} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { loadTranslation, shallowWithIntl } from '../src/index.js';
import Test from './testComponent.jsx';
import jsonfile from 'jsonfile';
var testLanguageFile = './test/testLanguageFile.json';
var testLanguageFileMessages = jsonfile.readFileSync(testLanguageFile);

describe('enzymeReactIntl', function() {
    describe('loadTranslation', function() {
        it('should load messages from the language file', function () {
            let messages = loadTranslation('/test/testLanguageFile.json');
            expect(messages).to.deep.equal(testLanguageFileMessages);
        });
    });
    describe('shallowWithIntl', function() {
        it('should have intl prop passed to the component', function () {
            let wrapper = shallowWithIntl(<Test></Test>);
            //console.log(wrapper.instance().props);
            //expect(wrapper).to.have.prop('intl');
            let p = wrapper.instance().props;
            //console.log(p);
            expect(p).to.containSubset({'intl': {}});
            //expect(wrapper.find(Test).prop("intl")).to.equal("bar");
        });
    });
});