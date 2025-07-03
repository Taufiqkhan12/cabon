import React from "react";

const CaptainProtectedWrapper = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  return <div>{children}</div>;
};

export default CaptainProtectedWrapper;
