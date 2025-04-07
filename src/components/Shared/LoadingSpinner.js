import { Dumbbell } from "lucide-react";

const LoadingSpinner = ({ size = "md", text = "로딩 중..." }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <Dumbbell
          className={`${sizeClasses[size]} text-blue-600 dark:text-blue-400 animate-spin-slow`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${sizeClasses[size]} rounded-full border-2 border-t-transparent border-blue-600 dark:border-blue-400 animate-spin`}
          ></div>
        </div>
      </div>
      {text && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
