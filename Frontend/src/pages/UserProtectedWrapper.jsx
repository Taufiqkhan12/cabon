import React, { useEffect, useState } from "react";
import userAuth from "../store/UserAuth";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const { checkAuth, userAuthData } = userAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // console.log(userAuthData?._id);
  useEffect(() => {
    const validate = async () => {
      await checkAuth();
      setLoading(false);
    };
    validate();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading && userAuthData === null) {
      navigate("/login");
    }
  }, [loading, userAuthData, navigate]);

  //   if (loading) return <div>Checking auth...</div>;

  if (!userAuthData) return null;

  return <>{children}</>;
};

export default UserProtectedWrapper;
