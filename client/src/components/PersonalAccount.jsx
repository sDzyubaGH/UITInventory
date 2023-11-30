import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { VscAccount } from "react-icons/vsc";

function PersonalAccount() {
  const { user } = useAuth();
  return (
    <div className="flex items-center mr-10">
      <div className=" flex border-2 py-2 pl-3 pr-2 rounded-lg border-indigo-400 ">
        <p className=" text-xl font-semibold">
          {user ? user.firstName : "Загрузка"}
        </p>
        <VscAccount className="pl-2 h-7 w-auto " />
      </div>
    </div>
  );
}

export default React.memo(PersonalAccount, (prevProps, nextProps) => {
  return prevProps.selectedFiles === nextProps.selectedFiles;
});
