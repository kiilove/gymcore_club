import GymCoreLoader from "./GymCoreLoader";

const LoadingOverlay = ({
  isLoading,
  children,
  variant = "default",
  text = "로딩 중...",
}) => {
  if (!isLoading) return children;

  return (
    <div className="relative min-h-[200px]">
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
        <GymCoreLoader variant={variant} text={text} />
      </div>
      <div className="opacity-50 pointer-events-none">{children}</div>
    </div>
  );
};

export default LoadingOverlay;
