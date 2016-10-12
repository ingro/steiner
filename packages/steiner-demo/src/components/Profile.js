import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

export class Profile extends Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="container">
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h2>Profile</h2>
                    <form onSubmit={handleSubmit} className="form-horizontal">
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'profile'
})(Profile);
