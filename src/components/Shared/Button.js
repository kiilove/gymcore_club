"use client";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  appearance = "default", // 'default', 'outline', 'ghost', 'link' 등 추가 가능
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-md focus:outline-none transition-all duration-300";

  // 기본 변형별 스타일
  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white shadow-sm hover:shadow-md",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow-md",
    warning:
      "bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow-md",
    info: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md",
    light:
      "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 shadow-sm hover:shadow-md",
    dark: "bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm hover:shadow-md",
  };

  // 크기별 스타일
  const sizeClasses = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5",
    xl: "text-xl px-6 py-3",
  };

  // 비활성화 스타일
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed transform-none hover:shadow-sm"
    : "";

  // 최종 클래스 조합
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
