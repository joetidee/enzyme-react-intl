import React from 'react';
import { FormattedMessage } from 'react-intl';

class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <FormattedMessage id="first_msg" />
            </div>
        );
    }
}

export default Test;