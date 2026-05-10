const errorPage = () => {
  return (
    <div className="flex h-screen items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-zinc-400">Post not found</p>
      </div>
    </div>
  );
};

export default errorPage;
