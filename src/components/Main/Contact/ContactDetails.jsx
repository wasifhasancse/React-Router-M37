import { Suspense, useState } from "react";
import { Link, Navigate, useLoaderData } from "react-router";

const ContactDetails = () => {
  const [showData, setShowData] = useState(false); // use Suspense if call api data, or any section.
  const userDetailsData = useLoaderData();
  const [navigateElement, setNavigateElement] = useState(false);//<Navigate>change link conditionaly
  if (navigateElement) {
    return <Navigate to={"/"}></Navigate>; //this <Navigate> work base on conditon
  }
  return (
    <div className="p-3 border">
      <div>Name: {userDetailsData.name}</div>
      <div>Email: {userDetailsData.email}</div>
      <div>
        <button
          onClick={() => setShowData(!showData)}
          className="py-3 hover:text-red-200 hover:underline"
        >
          {showData ? "Hide" : "Show"} Data
        </button>
      </div>
      {showData && (
        <Suspense fallback={<span>loading 3 .... </span>}>
          <div>Phone: {userDetailsData.phone}</div>
          <div>Website: {userDetailsData.website}</div>
          <div>
            <button
              onClick={() => setNavigateElement(true)}
              className="hover:underline"
            >
              Home
            </button>
          </div>
        </Suspense>
      )}
      <Link to={"/contact"} className="hover:underline">
        Back
      </Link>
    </div>
  );
};

export default ContactDetails;
