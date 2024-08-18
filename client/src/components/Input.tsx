import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, id, error, ...props }, ref) => {
  return (
    <>
      <div className='flex items-center gap-1'>
        {label && (
          <label htmlFor={id} className='text-sm font-medium text-gray-700 w-2/12'>
            {label}:
          </label>
        )}
        <input
          id={id}
          className={`border-2 p-1 ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-full`}
          ref={ref}
          {...props}
        />
      </div>
      <div className='flex justify-center'>{error && <div className='text-red-500 text-xs'>{error}</div>}</div>
    </>
  );
});

Input.displayName = 'Input';

export default Input;
