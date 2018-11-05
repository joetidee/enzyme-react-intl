import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow, render } from 'enzyme';
let path = require('path');
let locale = 'en';
const defaultMessages = new Proxy({}, { get: (target, property) => property });
let messages = defaultMessages;

/**
 * Loads translation file.
 * @param {string} localeFilePath
 * @return {object} messages
 */
function loadTranslation(localeFilePath) {
    if(typeof localeFilePath == "undefined"){
        messages = defaultMessages;
        return null;
    }
    let fp = path.join(__dirname, localeFilePath);
    messages = require('jsonfile').readFileSync("." + fp);
    return messages;
}

/**
 * Set translations object.
 * @param {object} translations
 * @return {object} messages
 */
function loadTranslationObject(translations) {
    if (typeof translations === "undefined") {
        messages = defaultMessages;
        return null;
    }

    messages = translations;
    return messages;
}

/**
 * Equivalent to enzyme's 'shallow' method.
 * @param {string} node React Component that requires react-intl.
 * @param {object} options enzyme.shallow options
 * @return {object}
 */
function shallowWithIntl(node, options = { context: {}}) {
    const intlProvider = new IntlProvider({locale: locale, messages }, {});
    const { intl } = intlProvider.getChildContext();
    return shallow(React.cloneElement(node, { intl }), { ...options, context: { ...options.context, intl } });
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

/**
 * Equivalent to enzyme's 'render' method.
 * @param {string} node React Component that requires react-intl.
 * @return {object}
 */
function renderWithIntl (node, { context, childContextTypes } = {}) {
    const intlProvider = new IntlProvider({locale: locale, messages }, {});
    const { intl } = intlProvider.getChildContext();
    return render(React.cloneElement(node, { intl }), {
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
    renderWithIntl: renderWithIntl,
    setLocale: setLocale,
    getLocale: getLocale
};
module.exports = enzymeReactIntl;
