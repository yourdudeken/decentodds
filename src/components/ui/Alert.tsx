import React, { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

const Alert = ({ 
  variant = 'info', 
  title, 
  children, 
  className = '',
  onClose
}: AlertProps) => {
  const variantClasses = {
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    success: 'bg-success-500/10 border-success-500/20 text-success-400',
    warning: 'bg-warning-500/10 border-warning-500/20 text-warning-400',
    error: 'bg-error-500/10 border-error-500/20 text-error-400',
  };
  
  const icons = {
    info: <Info size={20} />,
    success: <CheckCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    error: <AlertCircle size={20} />,
  };

  return (
    <div 
      className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {icons[variant]}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">
              {title}
            </h3>
          )}
          <div className={`text-sm ${title ? 'mt-2' : ''}`}>
            {children}
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;