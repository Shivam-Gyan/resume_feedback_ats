import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Footer from "~/components/Footer"; // Import your footer

export const meta = () => ([
  { title: "BeyondCareer - Authentication" },
  { name: "description", content: "Authenticate to access BeyondCareer features." },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();

  const location = useLocation();
  const next = location.search.split("next=")[1] || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Redirect to home if already authenticated
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <div className="relative min-h-screen ">
      {/* Main Content */}
      <main className="bg-[url('/images/bg-auth.svg')] flex-grow flex items-center justify-center bg-cover bg-center bg-no-repeat">
        <div className="gradient-border shadow-lg">
          <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-3xl font-bold text-center">Welcome</h1>
              <p className="text-center text-gray-600">Please log in to continue</p>
            </div>

            <div>
              {isLoading ? (
                <button className="auth-button animate-pulse">
                  <p>Signing you in ...</p>
                </button>
              ) : (
                <>
                  {auth.isAuthenticated ? (
                    <button className="auth-button" onClick={auth.signOut}>
                      <p>Sign Out</p>
                    </button>
                  ) : (
                    <button className="auth-button" onClick={auth.signIn}>
                      <p>Sign In</p>
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
