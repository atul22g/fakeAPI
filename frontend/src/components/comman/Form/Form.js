import React from 'react';

export default function Form({onSubmit, children}) {
  return (
    <form className="grid grid-cols-1 gap-6 px-4" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
