const SectionCard = ({
  title,
  children,
  className = "",
  variant = "default",
}) => {
  const variantClasses = {
    default: "bg-white dark:bg-gray-800",
    gradient:
      "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
    accent:
      "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
    success:
      "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20",
    warning:
      "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20",
  };

  return (
    <div
      className={`${variantClasses[variant]} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
          <span className="inline-block w-1 h-6 bg-blue-500 rounded-md mr-2"></span>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default SectionCard;
