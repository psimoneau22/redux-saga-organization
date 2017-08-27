import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {
    render () {
        return (
            <div>
                SomeData: {this.props.someData}
            </div>
        );
    }
}

export default connect(
    state => ({
        ...state.detail
    })
)(Detail)