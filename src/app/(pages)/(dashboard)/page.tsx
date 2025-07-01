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
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <h2>Your Posts:</h2>
      <ul>
        {user.posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}
          </li>
        ))}
      </ul>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
