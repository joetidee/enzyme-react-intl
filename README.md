# enzyme-react-intl
Enables you to test React components, using Enzyme, where those components rely on `react-intl`. If you were to test a component that used `react-intl`, using Enzyme's `mount` and `shallow` methods, then your tests would throw errors. This package enables you to test your React components using the same `react-intl` language files that your application would ordinarily use in production. This improves the reliability of your React component tests. 

## Installation
To install this package in your project run the following:
```
npm i enzyme-react-intl --save-dev
```

#### Peer npm package dependencies
The following npm packages must also be installed as development dependencies in order to use `enzyme-react-intl`:
```
npm i react --save-dev
npm i react-dom --save-dev
npm i enzyme --save-dev
```

## Example of usage (testing a React component)
As you can see below, you can test components as per normal. Where you would normally use `mount` and `shallow` methods from Enzyme, you simply substitute these with `mountWithIntl` and `shallowWithIntl` respectively.

```
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import MyComponent from '../components/MyComponent.jsx';
import { mountWithIntl, shallowWithIntl, loadTranslation } from 'enzyme-react-intl';

// Load in the desired react-intl translation file.
loadTranslation("../../../client/i18n/en-GB.i18n.json"); 

describe('<MyComponent />', () => {
    it('renders a name input field', () => {
        const wrapper = mountWithIntl(<MyComponent />);
        expect(wrapper.find('[name="name"]')).to.have.length(1);
    });
});
```
