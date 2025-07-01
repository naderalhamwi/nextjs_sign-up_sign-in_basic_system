"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errMessage, setErrMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // This code runs only in the browser
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMessage(""); // Clear previous error
    const res = await fetch("/api/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/");
      }
    } else {
      let message = "Sign In failed. Please try again.";
      try {
        const errorData = await res.json();
        if (errorData && errorData.error) {
          message = errorData.error;
        }
      } catch {}
      setErrMessage(message);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Sign In</button>
      <br />
      <p className="text-red-400">{errMessage}</p>
      <Link href="/sign-up">Sign up</Link>
    </form>
  );
}
