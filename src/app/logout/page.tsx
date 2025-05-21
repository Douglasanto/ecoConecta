"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("userLogado"); // remova o nome correto
    router.push("/");
  }, [router]);

  return <p>Saindo...</p>;
}
