"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/component/loading";

type Post = {
  id: number;
  title: string;
  content: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  posts: Post[];
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/sign-in");
    fetch("/api/me", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) router.push("/sign-in");
        else setUser(data);
      });
  }, []);

  if (!user) return <Loading />;

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl">Welcome, {user.name}</h1>
      <p>User Email {user.email}</p>
      <button
        className="block p-1 text-white bg-red-600 rounded-lg w-36 mb-6 mt-3 hover:bg-red-700"
        onClick={logout}
      >
        Sign Out
      </button>
    </div>
  );
}
