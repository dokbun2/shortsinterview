import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center',
      'font-medium rounded-xl',
      'transition-all duration-300',
      'transform-gpu',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative isolate overflow-hidden',
      'group',
      fullWidth && 'w-full'
    );

    const variantClasses = {
      primary: cn(
        'bg-gradient-to-r from-purple-600 to-blue-600 text-white',
        'hover:from-purple-700 hover:to-blue-700',
        'shadow-lg shadow-purple-500/25',
        'hover:shadow-xl hover:shadow-purple-500/30',
        'active:shadow-md'
      ),
      secondary: cn(
        'bg-white/10 text-white',
        'hover:bg-white/20',
        'border border-white/20',
        'backdrop-blur-sm'
      ),
      ghost: cn(
        'bg-transparent text-gray-300',
        'hover:bg-white/10 hover:text-white',
        'active:bg-white/5'
      ),
      danger: cn(
        'bg-red-500/20 text-red-400',
        'hover:bg-red-500/30',
        'border border-red-500/30'
      ),
      success: cn(
        'bg-green-500/20 text-green-400',
        'hover:bg-green-500/30',
        'border border-green-500/30'
      ),
    };

    const sizeClasses = {
      xs: 'h-7 px-2.5 text-xs gap-1.5',
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Animated gradient effect */}
        <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 animate-pulse" />
        </span>
        
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';