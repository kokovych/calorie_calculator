import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputFieldGroup = ({ field, value, label, error, type, onChange }) => {
    return (
        <div className={classnames('form-group', { 'has-error': error })}>
            <label className="control-label">{label}: </label>
            <input
                onChange={onChange}
                value={value}
                type={type}
                name={field}
                className="form-control"
            />
            {error && <span className="help-block">{error}</span>}
        </div>  );
}

InputFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

InputFieldGroup.defaultProps = {
    type: 'text'
}

export default InputFieldGroup;
