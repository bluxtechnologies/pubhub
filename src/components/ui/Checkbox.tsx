import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { cn } from '../../lib/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, checked, disabled, id, onChange, ...props }, ref) => {
    const checkboxId = id || `chk_${Math.random().toString(36).slice(2)}`;

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          'flex items-start gap-2.5 cursor-pointer select-none group',
          disabled && 'cursor-not-allowed opacity-60'
        )}
      >
        {/* Hidden native input for accessibility */}
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
          {...props}
        />

        {/* Styled visual checkbox */}
        <div
          className={cn(
            'mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-all',
            checked
              ? 'bg-brand-900 border-brand-900'
              : 'bg-white border-slate-300 group-hover:border-slate-400',
            error && !checked && 'border-rose-500',
            className
          )}
        >
          {checked && <CheckIcon className="w-3 h-3 text-white stroke-[3]" />}
        </div>

        {/* Label & description text */}
        {(label || description) && (
          <div className="text-sm leading-none">
            {label && <span className="font-medium text-slate-800 leading-tight block">{label}</span>}
            {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
            {error && <p className="text-xs text-rose-600 font-medium mt-1">{error}</p>}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
