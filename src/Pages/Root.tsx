import { Outlet } from "react-router-dom";
import Header from "../Components/Header";


function Root() {
  return (
    <>
      <div className="block relative min-w-full h-full bg-white">
        <Header />
        <form
          className="absolute top-[100px]
        left-14"
        >
        </form>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
