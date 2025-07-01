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
    <form
      className="flex flex-col justify-center items-center h-screen"
      onSubmit={submit}
    >
      <input
        className="border-b bg-neutral-950 p-3 mb-6"
        name="email"
        placeholder="Your Email Address"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="border-b bg-neutral-950 p-3 mb-6"
        name="password"
        placeholder="Your Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <p className="text-red-400">{errMessage}</p>
      <button
        className="block p-2 text-white bg-green-600 rounded-lg w-36 mb-6 mt-3 hover:bg-green-700"
        type="submit"
      >
        Sign In
      </button>
      <Link href="/sign-up">
        <p className="text-neutral-400">
          Don&apos;t have an account?{" "}
          <span className="text-blue-600 hover:text-blue-700">Sign up</span>{" "}
          instead
        </p>
      </Link>
    </form>
  );
}
