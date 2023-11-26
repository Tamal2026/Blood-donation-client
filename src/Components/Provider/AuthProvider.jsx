/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import app from "../../../Firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../AxiosSecure/useAxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
            } else {
              localStorage.removeItem('access-token');
              console.log("Token removed from localStorage");
            }
          })
          .catch(error => {
            console.error("Error while updating token:", error);
          });
      } else {
        localStorage.removeItem('access-token');
        console.log("Token removed from localStorage");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]); // Include auth in the dependency array

  const updateUserProfile = (name, bloodGroup) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      bloodGroup: bloodGroup,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        localStorage.removeItem('access-token');
        console.log("Token removed from localStorage");
      })
      .catch(error => {
        console.error("Error while logging out:", error);
      });
  };

  const authInfo = {
    user,
    loading,
    signIn,
    logOut,
    createUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
