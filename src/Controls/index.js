import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Controls extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <input type={"range"} />
                <fieldset id="">
                    <input type="radio" value="" name="group1" />
                        <input type="radio" value="" name="group1" />
                </fieldset>
            </div>
        );
    }
}

Controls.propTypes = {};

export default Controls;
