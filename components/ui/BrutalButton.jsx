'use client';

import { motion } from 'framer-motion';

export default function BrutalButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  icon,
}) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    secondary: 'bg-secondary text-white hover:bg-secondary-light',
    accent: 'bg-accent text-ink hover:bg-accent-dark',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    ghost: 'bg-transparent text-ink hover:bg-surface-alt',
    outline: 'bg-surface text-ink hover:bg-surface-alt',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        border-3 border-ink rounded-xl font-heading font-bold
        brutal-shadow brutal-shadow-hover
        inline-flex items-center justify-center gap-2
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
}
