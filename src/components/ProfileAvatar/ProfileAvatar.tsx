import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthEndpoints } from "../../api/endpoints";

const ProfileAvatar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    fetch(AuthEndpoints.logout, { credentials: "include" })
      .then(() => (window.location.href = "/"))
      .catch(() => {});
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef} data-testid="profile-avatar">
      <div
        className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-sm font-medium">U</span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-lg py-1 z-50">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
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
