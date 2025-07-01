"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
    await fetch("/api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/sign-in");
  };

  return (
    <form
      className="flex flex-col justify-center items-center h-screen"
      onSubmit={submit}
    >
      <input
        className="border-b bg-neutral-950 p-3 mb-6"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="border-b bg-neutral-950 p-3 mb-6"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="border-b bg-neutral-950 p-3 mb-6"
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button
        className="block p-2 text-white bg-green-600 rounded-lg w-36 mb-6 mt-3 hover:bg-green-700"
        type="submit"
      >
        Sign Up
      </button>
      <Link href="/sign-in">
        <p className="text-neutral-400">
          Already have an account?{" "}
          <span className="text-blue-600 hover:text-blue-700">Sign in</span>{" "}
          instead
        </p>
      </Link>
    </form>
  );
}
