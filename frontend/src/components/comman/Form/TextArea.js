import React from 'react';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import './TextArea.css';
import {IconButton} from '../Button';
import useCopyText from '../../hooks/useCopyText';

const TextArea = ({value, disabled, readOnly, onChange, onBlur}) => {
  const [copied, copyTextHandler] = useCopyText();

  const base = `font-mono font-medium text-sm md:text-base rounded-xl border`;
  const _enabledC = 'bg-gray-100 border-gray-100';
  const _disabled = `border border-gray-200 bg-gray-50 cursor-not-allowed text-gray-500`;
  const _readOnly = `border border-gray-200 bg-gray-50`;

  let onBlurHandler = onBlur;
  let onChnageHandler = onChange;
  let classNames = base;

  if (disabled) {
    onBlurHandler = () => {};
    onChnageHandler = () => {};
    classNames += ` ${_disabled}`;
  } else if (readOnly) {
    onBlurHandler = () => {};
    onChnageHandler = () => {};
    classNames += ` ${_readOnly}`;
  } else {
    onBlurHandler = onBlur;
    onChnageHandler = onChange;
    classNames += ` ${_enabledC}`;
  }

  return (
    <div className="group relative">
      <div className={classNames}>
        <Editor
          highlight={code => highlight(code, languages.js, 'json')}
          padding={{top: 8, right: 12, bottom: 8, left: 12}}
          textareaClassName="outline-none"
          value={value}
          onValueChange={code => onChnageHandler(code)}
          onBlur={onBlurHandler}
        />
        {readOnly && (
          <div className="flex items-center gap-2 absolute top-2 right-3">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <IconButton
                type="button"
                iconName="Copy"
                tooltip={copied ? '✅ Copied!' : 'Click to copy'}
                onClick={() => copyTextHandler(value)}
              />
            </div>
            <div className=" rounded-lg text-xs text-gray-500 uppercase font-semibold tracking-wider">
              example
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
