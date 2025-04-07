const PageTitle = ({ title, subtitle, icon: Icon }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
