import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthEndpoints } from "../../api/endpoints";

const ProfileAvatar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch(AuthEndpoints.logout, { credentials: "include" })
      .then(() => (window.location.href = "/"))
      .catch(() => {});
  };

  return (
    <div className="relative" data-testid="profile-avatar">
      <div
        className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-sm font-medium">U</span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-lg py-1 z-50" onClick={()=>setOpen(false)}>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
