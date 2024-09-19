import React from 'react';

export default function InputGroup({label, helpText, children, unavailable}) {
  return (
    <div className="space-y-3 font-mono">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <label className="text-lg font-semibold font-mono">{label}</label>
        </div>
        {helpText && <div className="text-sm text-gray-900">{helpText}</div>}
      </div>
      {children}
    </div>
  );
}
