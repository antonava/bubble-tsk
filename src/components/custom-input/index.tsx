import { forwardRef, ForwardedRef } from 'react';

export const CustomInput = forwardRef<HTMLDivElement>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
        ref={ref}
        contentEditable={true}
        {...props}
      />
    );
  }
);