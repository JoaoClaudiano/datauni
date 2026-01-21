import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'


const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900 focus-visible:ring-gray-500',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
        ghost: 'hover:bg-gray-100 text-gray-900 focus-visible:ring-gray-500',
        link: 'text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500',
        academic: 'bg-academic-blue text-white hover:bg-academic-blue/90 focus-visible:ring-academic-blue'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-sm',
        lg: 'h-12 rounded-xl px-8 text-lg',
        xl: 'h-14 rounded-xl px-10 text-xl',
        icon: 'h-10 w-10'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    loading = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          loading && 'cursor-wait'
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className={cn(
            "h-4 w-4 animate-spin",
            iconPosition === 'left' ? 'mr-2' : 'ml-2'
          )} />
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
