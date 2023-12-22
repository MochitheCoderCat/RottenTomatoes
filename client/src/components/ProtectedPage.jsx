import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apis/users";
import { useNavigate } from "react-router-dom";

function ProtectedPage({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUser(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getCurrentUser();
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center bg-primary p-5">
        <span
          className="font-semibold text-green-400 tracking-wider text-2xl cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          ROTTEN POTATOES
        </span>

        <div className="bg-white rounded px-5 py-2 flex gap-2">
          <i class="ri-shield-user-line"></i>
          <span
            className="text-primary text-sm cursor-pointer underline"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Shanshan
          </span>
          <i
            className="ri-logout-box-r-line ml-8"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          ></i>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}

export default ProtectedPage;
