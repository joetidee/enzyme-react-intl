'use strict';

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import jsonfile from 'jsonfile';
var path = require('path');
var locale = 'en';
var intl = {};
var messages = {};

/**
 * Loads translation file.
 * @param {string} localeFilePath
 * @return {object} messages
 */
function loadTranslation(localeFilePath) {
    if(typeof localeFilePath == "undefined"){
        messages = {};
        return null;
    }
    let fp = path.join(__dirname, localeFilePath);
    messages = jsonfile.readFileSync("." + fp);
    return messages;
}

/**
 * Set translations object.
 * @param {string} localeFilePath
 * @return {object} messages
 */
function loadTranslationObject(translations) {
    if (typeof translations === "undefined") {
        messages = {}
        return null
    }

    messages = translations;
    return messages;
}

/**
 * Equivalent to enzyme's 'shallow' method.
 * @param {string} node React Component that requires react-intl.
 * @return {object}
 */
function shallowWithIntl(node) {
    const intlProvider = new IntlProvider({locale: locale, messages }, {});
    const { intl } = intlProvider.getChildContext();
    return shallow(React.cloneElement(node, { intl }), { context: { intl } });
}

/**
 * Equivalent to enzyme's 'mount' method.
 * @param {string} node React Component that requires react-intl.
 * @return {object}
 */
function mountWithIntl (node, { context, childContextTypes } = {}) {
    const intlProvider = new IntlProvider({locale: locale, messages }, {});
    const { intl } = intlProvider.getChildContext();
    return mount(React.cloneElement(node, { intl }), {
        context: Object.assign({}, context, {intl}),
        childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes)
    });
}

function getLocale(){
    return locale;
}

function setLocale(str){
    locale = str;
}

var enzymeReactIntl = {
    loadTranslation: loadTranslation,
    loadTranslationObject: loadTranslationObject,
    shallowWithIntl: shallowWithIntl,
    mountWithIntl: mountWithIntl,
    setLocale: setLocale,
    getLocale: getLocale
};
module.exports = enzymeReactIntl;
