const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="h-16 w-16 animate-spin rounded-full border-y-4
      border-blue-600"
      ></div>
    </div>
  );
};

export default LoadingScreen;
