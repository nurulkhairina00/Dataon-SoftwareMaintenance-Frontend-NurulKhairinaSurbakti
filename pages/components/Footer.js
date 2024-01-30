import React from "react";

const Footer = () => {
  const today = new Date();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);
  return (
    <div className="container p-4">
      <p className="text-center mb-0">{formattedDate}</p>
    </div>
  );
};

export default Footer;
