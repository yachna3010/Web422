import { useEffect } from "react";
import { useRouter } from "next/router";
import { readToken } from "../lib/authenticate";

export default function Search() {
  const router = useRouter();

  useEffect(() => {
    const token = readToken();
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, []);

  return (
    <div className="container py-5">
      <h1>Search</h1>
      <p>Search functionality goes here.</p>
    </div>
  );
}
