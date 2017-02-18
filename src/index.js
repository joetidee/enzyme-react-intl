import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
const locale = "en-GB";
const messages = loadTranslation(locale);
import { mount, shallow } from 'enzyme';

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();

/**
* When using React-Intl `injectIntl` on components, props.intl is required.
*/
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

/**
* Loads translation file.
*/
function loadTranslation(locale) {
    var messages = {};
    if (typeof locale != "undefined") {
        messages = require("../../../i18n/" + locale + ".i18n.json");
    }
    else {
        messages = require("../../../i18n/en-GB.i18n.json");
    }
    return messages;
}

/**
* Export these methods.
*/
var shallowWithIntl = function(node) {
    return shallow(nodeWithIntlProp(node), { context: { intl } });
};

var mountWithIntl = function(node) {
    return mount(nodeWithIntlProp(node), {
        context: { intl },
        childContextTypes: { intl: intlShape }
    });
};

module.exports = {
    shallowWithIntl: shallowWithIntl,
    mountWithIntl: mountWithIntl
};