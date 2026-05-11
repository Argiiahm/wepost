import { OrbitProgress } from "react-loading-indicators";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const Profile = () => {
  const { me, loading } = useAuth();
  // if not authenticated, redirect to login page
  if (!me) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="container max-w-3xl mx-auto p-6">
      {loading ? (
        <div className="flex justify-center flex-col gap-2 items-center mt-20">
          <OrbitProgress
            variant="spokes"
            color="white"
            size="small"
            text=""
            textColor=""
          />
          <span className="text-white">Loading content...</span>
        </div>
      ) : (
        <div className="h-full md:border border-zinc-900 md:p-6 rounded-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-white font-bold">{me?.user.name}</h1>
              <span className="text-zinc-500">{me?.user.username}</span>
            </div>
            <div>
              <img
                className="w-16 h-16 rounded-full"
                src={`https://ui-avatars.com/api/?name=${me?.user.username}&background=random`}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
