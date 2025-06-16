import { Link } from "react-router-dom";
import { AuthEndpoints } from "../../api/endpoints";
import { useUser } from "../../context/useUser";
import Button from "../Button/Button";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import QuestionMark from "./QuestionMark/QuestionMark";

export default function Navbar() {
  const { isLogged } = useUser();

  return (
    <nav className="w-full bg-gray-800 p-4 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-semibold tracking-wide text-white drop-shadow-sm inline-block">
          <span className="text-blue-400">Book</span>
          <span className="text-gray-300">ing</span>
        </Link>

        {!isLogged ? (
          <div className="relative flex items-center gap-2">
            <Button
              color="blue"
              onClick={() => (window.location.href = AuthEndpoints.login)}
            >
              Login
            </Button>
            <QuestionMark />
          </div>
        ) : (
          <ProfileAvatar />
        )}
      </div>
    </nav>
  );
}
