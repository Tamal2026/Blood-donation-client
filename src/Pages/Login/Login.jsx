import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import { useContext } from "react";
import app from "../../../Firebase/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";

const Login = () => {
  const { user } = useContext(AuthContext);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      console.log(result);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const loginUser = {
      email,
      password,
    };
    console.log(loginUser);

    // ...

    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        const user = { email };
        console.log(user);
        axios
          .post(
            "http://localhost:5000/jwt",

            user,
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              navigate(location?.state ? location.state : "/");
            }
          });
      })
      .catch((error) => console.error(error));
  };

  if (user) {
    return <Navigate to="/"></Navigate>;
  }
  // ...

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              hank you for choosing to be a lifesaver! Our login page is your
              gateway to making a meaningful impact on the lives of those in
              need. As you enter this secure space, you are not just logging in;
              you are opening the door to hope, compassion, and the opportunity
              to save lives.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>

              <Link to="/register">
                <h1>
                  New Here? Go{" "}
                  <span className="text-lg font-bold text-teal-600">
                    Register
                  </span>
                </h1>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
