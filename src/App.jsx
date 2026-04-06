import { Outlet, useNavigation } from "react-router";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavItems from "./components/NavItems/NavItems";


function App() {
  const navigation = useNavigation() //use for show loading in outlate navigation time
  const isNavigation = Boolean(navigation.location) //store the navigation link untill response the link
  return (
    <>
      <div>
        <NavItems />
        <section className="flex flex-col items-center justify-center gap-5 my-10">
          {isNavigation && <p>Loading ..</p>}
          <Outlet />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default App;
