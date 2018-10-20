require("./jsdomSetup.js");

import React from 'react';
import chai, {expect, assert} from 'chai';

let chaiSubset = require('chai-subset');
chai.use(chaiSubset);

import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

import { loadTranslation, loadTranslationObject, shallowWithIntl, mountWithIntl, renderWithIntl, setLocale, getLocale } from '../src/index.js';
import Test from './testComponent.jsx';
import jsonfile from 'jsonfile';

const testLanguageFile = './test/testLanguageFile.json';
const testLanguageFileMessages = jsonfile.readFileSync(testLanguageFile);

describe('enzymeReactIntl', function() {

    it('locale should not be empty', function () {
        const localeGet = getLocale();

        expect(localeGet).to.not.equal('');
    });

    describe('setLocale', function() {
        it('should set the locale', function () {
            const localeSet = 'en-GB';
            setLocale(localeSet);
            const localeGet = getLocale();

            expect(localeSet).to.equal(localeGet);
        });
    });
    describe('loadTranslation', function() {
        it('should load messages from the language file', function () {
            const messages = loadTranslation('/test/testLanguageFile.json');

            expect(messages).to.deep.equal(testLanguageFileMessages);
        });
    });
    describe('loadTranslationObject', function() {
        const translations = {test: "I'm a test translation"};

        it('should load messages from the translations object', function () {
            const messages = loadTranslationObject(translations);

            expect(messages).to.deep.equal(translations);
        });
    });
    describe('shallowWithIntl', function() {
        it('should have intl prop passed to the component', function () {
            loadTranslation('/test/testLanguageFile.json');
            const wrapper = shallowWithIntl(<Test />);
            const p = wrapper.instance().props;

            expect(p).to.contain.key('intl');
        });
    });
    describe('mountWithIntl', function() {
        it('should have intl prop passed to the component', function () {
            loadTranslation('/test/testLanguageFile.json');
            const wrapper = mountWithIntl(<Test />);
            const p = wrapper.instance().props;

            expect(p).to.contain.key('intl');
        });
    });
    describe('renderWithIntl', function() {
        it('should render the appropriate translation', function () {
            loadTranslation('/test/testLanguageFile.json');
            const wrapper = renderWithIntl(<Test />);

            expect(wrapper.text()).to.match(/Message 1/);
        });
        it('should render using the default translations', function () {
            loadTranslation(undefined);
            const wrapper = renderWithIntl(<Test />);

            expect(wrapper.text()).to.equal('first_msg');
        });
        it('should render using the default translations 2', function () {
            loadTranslationObject(undefined);
            const wrapper = renderWithIntl(<Test />);

            expect(wrapper.text()).to.equal('first_msg');
        });
    });
});
