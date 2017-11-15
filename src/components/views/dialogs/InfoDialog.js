/*
Copyright 2017 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
 * Usage:
 * Modal.createTrackedDialog('An Identifier', 'some detail', InfoDialog, {
 *   title: "some text", (default: "Info")
 *   description: "some more text",
 *   onFinished: someFunction,
 *   focus: true|false (default: true)
 * });
 */

import React from 'react';
import sdk from '../../../index';
import { _t } from '../../../languageHandler';

export default React.createClass({
    displayName: 'InfoDialog',
    propTypes: {
        title: React.PropTypes.string,
        description: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.string,
        ]).isRequired,
        focus: React.PropTypes.bool,
        onFinished: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            focus: true,
            title: null,
            description: null,
            onFinished: function() {},
        };
    },

    componentDidMount: function() {
        if (this.props.focus) {
            this.refs.button.focus();
        }
    },

    render: function() {
        const BaseDialog = sdk.getComponent('views.dialogs.BaseDialog');
        return (
            <BaseDialog className="mx_InfoDialog" onFinished={this.props.onFinished}
                    title={this.props.title || _t('Info')}>
                <div className="mx_Dialog_content">
                    { this.props.description }
                </div>
                <div className="mx_Dialog_buttons">
                    <button ref="button" className="mx_Dialog_primary" onClick={this.props.onFinished}>
                        { _t('OK') }
                    </button>
                </div>
            </BaseDialog>
        );
    },
});