import { useRouter } from "next/router";
import { useEffect } from "react";
const Error = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
  return (
    <>
      <div className="error">
        <div className="error-text">
          <div>
            <h2>404</h2>
            <h3>Oops!</h3>
            <h6>Something is wrong.</h6>
            <p>
              Sorry We can not find the page your looking for but relax, go to
              the kitchen for your Fevorite fruit and vegatables.
            </p>
            <button onClick={() => router.push("/")}>Back to Home</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
