import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userAuth from "../store/UserAuth";

const CaptainProtectedWrapper = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const { CaptainCheckAuth, captainAuthData } = userAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const validate = async () => {
      await CaptainCheckAuth();
      setLoading(false);
    };
    validate();
  }, [CaptainCheckAuth]);

  useEffect(() => {
    if (!loading && captainAuthData === null) {
      navigate("/captain-login");
    }
  }, [loading, captainAuthData, navigate]);

  if (!captainAuthData) return null;
  return <div>{children}</div>;
};

export default CaptainProtectedWrapper;
