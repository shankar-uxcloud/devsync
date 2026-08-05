import { Link } from "react-router-dom";

function NotFound() {
  return (

    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-8xl font-bold">

        404

      </h1>

      <p className="text-xl mt-4">

        Page Not Found

      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl"
      >
        Go Home
      </Link>

    </div>

  );
}

export default NotFound;