interface ErrorProps {
  message: string;
}

const ErrorScreen = ({ message }: ErrorProps) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded bg-red-500 px-4 py-2 text-white">
        Error: {message}
      </div>
    </div>
  );
};

export default ErrorScreen;
