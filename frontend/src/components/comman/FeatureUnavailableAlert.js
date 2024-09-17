import { AlertCircle } from 'react-feather';
import { DONATE } from '../../reducers/forms';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showForm } from '../../actions/forms';
import Alert from './Form/Alert';
import Button from './Button/TextButton';

function FeatureUnavailableAlert({ showForm }) {
    return (
        <Alert variant="default">
            <div className="flex items-center gap-2">
                <AlertCircle size={14} />
                <div className="flex grow items-center justify-between gap-2">
                    <span>Requires subscription</span>
                    <Button
                        size="xs"
                        type="button"
                        onClick={() => showForm(DONATE)}
                        variant="primary">
                        See plans
                    </Button>
                </div>
            </div>
        </Alert>
    );
}

export default connect(null, dispatch =>
    bindActionCreators({ showForm }, dispatch)
)(FeatureUnavailableAlert);
