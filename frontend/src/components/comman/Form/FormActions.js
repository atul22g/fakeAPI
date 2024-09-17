import React from 'react';
import {omit} from 'lodash';
import Button from '../Button/TextButton';

export default function FormActions({primary, secondary}) {
  const {label: pLabel, variant = 'primary', ...pProps} = primary;
  let sLabel, sProps;
  if (secondary) {
    sLabel = secondary.label || 'Close';
    sProps = omit(secondary, 'label');
  }

  return (
    <div
      className={`grid ${
        secondary ? 'grid-cols-2' : 'grid-cols-1'
      } gap-4 sticky bottom-0 justify-between
          p-4 bg-gray-50 rounded-br-2xl rounded-bl-2xl -mx-4`}>
      {sLabel && (
        <Button fullWidth={true} type="button" variant="minimal" {...sProps}>
          {sLabel}
        </Button>
      )}
      <Button fullWidth={true} variant={variant} type="submit" {...pProps}>
        {pLabel}
      </Button>
    </div>
  );
}
