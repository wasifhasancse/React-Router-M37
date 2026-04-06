import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

const AboutDetails = () => {
  const navigate = useNavigate(); //Navigate is the path link for onClick, and set path in onclick
  const postDetailsData = useLoaderData(); // CreateBrowserRouter loader fetch data received
  const { id } = useParams(); //{..}use dynamic path name
  const location = useLocation();
  // console.log(location)
  return (
    <div className="p-3 border max-w-md">
      <p>Post: {id}</p>
      <p>Path Location: {location.pathname}</p>
      <div className="line-clamp-1">Title: {postDetailsData.title}</div>
      <div className="line-clamp-1">Des: {postDetailsData.body}</div>
      <button onClick={() => navigate("/about")} className="hover:underline">
        Back
      </button>
    </div>
  );
};

export default AboutDetails;
