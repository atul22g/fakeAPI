import Alert from './Alert';
import React from 'react';

const Input = ({className, errorMessage, ...props}) => {
  const base = `appearance-none px-3 py-2 rounded-xl bg-gray-100 w-full
  border border-gray-100 text-base font-mono focus:outline outline-2
  outline-offset-2 outline-blue-500 hover:bg-gray-200 hover:border-gray-200
  focus:bg-gray-100 focus:border-gray-100`;
  const disabled = `disabled:text-gray-500 disabled:bg-gray-50 disabled:border disabled:border-gray-200
  disabled:cursor-not-allowed read-only:bg-gray-50 read-only:border-gray-200`;

  return (
    <div className="space-y-2">
      <input
        className={`${base} ${disabled} ${className}`}
        autoComplete="off"
        {...props}
      />
      {errorMessage && (
        <Alert textOnly variant="danger">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default Input;
