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
    initContext();
    return messages;
}

/**
 * Equivalent to enzyme's 'shallow' method.
 * @param {string} node React Component that requires react-intl.
 * @return {object}
 */
function shallowWithIntl(node) {
    return shallow(nodeWithIntlProp(node), { context: { intl } });
}

/**
 * Equivalent to enzyme's 'mount' method.
 * @param {string} node React Component that requires react-intl.
 * @return {object}
 */
function mountWithIntl(node) {
    return mount(nodeWithIntlProp(node), {
        context: {
            intl
        },
        childContextTypes: {
            intl: intlShape
        }
    });
}

function initContext() {
    const intlProvider = new IntlProvider({locale: locale, messages: messages}, {});
    const intlContext = intlProvider.getChildContext();
    intl = { intlContext };
    console.log(intl);
}

function getLocale(){
    return locale;
}

function setLocale(l){
    locale = l;
}

/**
 * Helper that passes intl object to the wrapped React Component.
 * @param {object} node React Component that requires react-intl.
 * @return {object}
 */
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}


var enzymeReactIntl = {
    loadTranslation: loadTranslation,
    shallowWithIntl: shallowWithIntl,
    mountWithIntl: mountWithIntl,
    setLocale: setLocale,
    getLocale: getLocale
};
module.exports = enzymeReactIntl;