interface NotFoundProps {
  message: string;
}

function NotFound(props: NotFoundProps) {
  const {message} = props;

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>{message}</h1>
    </div>
  );
}

export default NotFound;
