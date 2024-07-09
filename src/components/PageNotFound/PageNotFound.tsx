// PageNotFound.js
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col h-[95vh] justify-center items-center mt-8 gap-6 text-center">
      <h2 className="text-3xl font-bold text-red-600">404 Page Not Found</h2>
      <p className="text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link to="home">
        <button className="mt-4 px-6 py-3 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors">
          GO HOME
        </button>
      </Link>
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </div>
  );
};

export default PageNotFound;
