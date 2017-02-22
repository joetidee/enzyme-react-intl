require("./jsdomSetup.js");
import React from 'react';
import chai, {expect, assert} from 'chai';
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { loadTranslation, shallowWithIntl, mountWithIntl } from '../src/index.js';
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
            let p = wrapper.instance().props;
            //expect(p).to.containSubset({'intl': {}});
            expect(p).to.contain.key('intl');
        });
    });
    describe('mountWithIntl', function() {
        it('should have intl prop passed to the component', function () {
            let wrapper = mountWithIntl(<Test></Test>);
            let p = wrapper.instance().props;
            console.log(p);
            expect(p).to.contain.key('intl');
        });
    });
});