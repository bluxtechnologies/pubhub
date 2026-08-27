import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, checked, disabled, id, onChange, ...props }, ref) => {
    const radioId = id || `rad_${Math.random().toString(36).slice(2)}`;

    return (
      <label
        htmlFor={radioId}
        className={cn(
          'flex items-start gap-2.5 cursor-pointer select-none group',
          disabled && 'cursor-not-allowed opacity-60'
        )}
      >
        <input
          ref={ref}
          type="radio"
          id={radioId}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
          {...props}
        />

        {/* Styled visual radio */}
        <div
          className={cn(
            'mt-0.5 w-4 h-4 shrink-0 rounded-full border flex items-center justify-center transition-all',
            checked
              ? 'border-brand-900 bg-white'
              : 'border-slate-300 bg-white group-hover:border-slate-400',
            className
          )}
        >
          {checked && <div className="w-2 h-2 rounded-full bg-brand-900" />}
        </div>

        {(label || description) && (
          <div className="text-sm leading-none">
            {label && <span className="font-medium text-slate-800 leading-tight block">{label}</span>}
            {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
