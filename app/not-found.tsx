import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <h2>Page Not Found</h2>
      The Requested Page could not be Found
      <Link href="/">Return to Home</Link>
    </div>
  );
};
export default NotFound;
