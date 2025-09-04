import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hoverable = false, children, className, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const variantClasses = {
      default: cn(
        'bg-dark-card',
        'border border-dark-border',
        'shadow-dark-sm'
      ),
      elevated: cn(
        'bg-dark-card',
        'border border-dark-border',
        'shadow-dark-lg'
      ),
      outlined: cn(
        'bg-transparent',
        'border-2 border-dark-border',
        'hover:border-accent-blue/50'
      ),
      glass: cn(
        'bg-dark-card/80 backdrop-blur',
        'border border-dark-border',
        'shadow-dark-md'
      ),
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg relative',
          'transition-all duration-200',
          paddingClasses[padding],
          variantClasses[variant],
          hoverable && cn(
            'cursor-pointer',
            'hover:bg-dark-hover',
            'hover:border-dark-hover'
          ),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';