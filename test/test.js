require("./jsdomSetup.js");
import React from 'react';
import chai, {expect, assert} from 'chai';
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { loadTranslation, loadTranslationObject, shallowWithIntl, mountWithIntl, setLocale, getLocale } from '../src/index.js';
import Test from './testComponent.jsx';
import jsonfile from 'jsonfile';
let testLanguageFile = './test/testLanguageFile.json';
let testLanguageFileMessages = jsonfile.readFileSync(testLanguageFile);

describe('enzymeReactIntl', function() {

    it('locale should not be empty', function () {
        let localeGet = getLocale();
        expect(localeGet).to.not.equal('');
    });

    describe('setLocale', function() {
        it('should set the locale', function () {
            let localeSet = 'en-GB';
            setLocale(localeSet);
            let localeGet = getLocale();
            expect(localeSet).to.equal(localeGet);
        });
    });
    describe('loadTranslation', function() {
        it('should load messages from the language file', function () {
            let messages = loadTranslation('/test/testLanguageFile.json');
            expect(messages).to.deep.equal(testLanguageFileMessages);
        });
    });
    describe('loadTranslationObject', function() {
        const translations = {test: "I'm a test translation"};

        it('should load messages from the translations object', function () {
            let messages = loadTranslationObject(translations);
            expect(messages).to.deep.equal(translations);
        });
    });
    describe('shallowWithIntl', function() {
        it('should have intl prop passed to the component', function () {
            loadTranslation('/test/testLanguageFile.json');
            let wrapper = shallowWithIntl(<Test />);
            let p = wrapper.instance().props;
            expect(p).to.contain.key('intl');
        });
    });
    describe('mountWithIntl', function() {
        it('should have intl prop passed to the component', function () {
            loadTranslation('/test/testLanguageFile.json');
            let wrapper = mountWithIntl(<Test />);
            let p = wrapper.instance().props;
            expect(p).to.contain.key('intl');
        });
    });
});
