import { Link } from 'react-router-dom';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  href,
  to,
  ...props 
}) {
  // Base button styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none";
  
  // Variant styles
  const variantStyles = {
    primary: "bg-rose-gold text-ivory hover:bg-rose-gold/90",
    secondary: "border border-charcoal/80 text-charcoal hover:bg-charcoal/5",
    outline: "border border-rose-gold text-rose-gold hover:bg-rose-gold/10",
    ghost: "text-charcoal hover:bg-charcoal/5"
  };
  
  // Size styles
  const sizeStyles = {
    sm: "text-sm px-3 py-1",
    md: "px-5 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  // If href prop is provided, render as anchor element
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  
  // If to prop is provided, render as React Router Link
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  // Default to button element
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}