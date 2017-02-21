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
        it('messages should be loaded from the language file', function () {
            let messages = loadTranslation('/test/testLanguageFile.json');
            expect(messages).to.deep.equal(testLanguageFileMessages);
        });
    });
    describe('shallowWithIntl', function() {
        it('passes the correct props to the component', function () {
            let wrapper = shallowWithIntl(<Test></Test>);
            //console.log(wrapper);
            expect(wrapper).to.have.prop('intl');
            //let p = wrapper.instance().props;
            //expect(p).to.equal({intl: {intlContext: {intl: {}}}});
        });
    });
});