"use client";
import { ROLE } from "@/lib/axios";
import { useEffect, useState } from "react";

const useRole = () => {
  const [role, setRole] = useState("USER");

  useEffect(() => {
    setRole(localStorage.getItem(ROLE) ?? "USER");
  }, []);

  return { isAdmin: role === "ADMIN", role, setRole };
};

export default useRole;
