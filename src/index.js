import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';

/**
 * @param {string} localeFilePath The location of the locale file.
 */
module.exports = enzymeReactIntl;
function enzymeReactIntl (localeFilePath) {

    let locale = 'en';
    let intl = {};
    let messages = loadTranslation(localeFilePath);

    function initContext(){
        const intlProvider = new IntlProvider({ locale: locale, messages }, {});
        const intlContext = intlProvider.getChildContext();
        intl = { intlContext };
    }

    /**
     * Loads translation file.
     * @param {string} localeFilePath
     * @return {object} messages
     */
    function loadTranslation(localeFilePath) {
        if(typeof localeFilePath == "undefined"){
            return null;
        }
        let messages = require(localeFilePath);
        return messages;
    }

    /**
     * Equivalent to enzyme's 'shallow' method.
     * @param {string} node React Component that requires react-intl.
     * @return {object}
     */
    function shallowWithIntl(node) {
        initContext();
        return shallow(nodeWithIntlProp(node), { context: { intl } });
    }

    /**
     * Equivalent to enzyme's 'mount' method.
     * @param {string} node React Component that requires react-intl.
     * @return {object}
     */
    function mountWithIntl(node) {
        initContext();
        return mount(nodeWithIntlProp(node), {
            context: { intl },
            childContextTypes: { intl: intlShape }
        });
    }

    // API/data for end-user
    return {
        loadTranslation: loadTranslation,
        shallowWithIntl: shallowWithIntl,
        mountWithIntl: mountWithIntl
    };

    /**
     * Helper that passes intl object to the wrapped React Component.
     * @param {object} node React Component that requires react-intl.
     * @return {object}
     */
    function nodeWithIntlProp(node) {
        return React.cloneElement(node, { intl });
    }
}