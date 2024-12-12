import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken } from "../lib/authenticate";

export default function Favourites() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = readToken();
    if (!savedToken) {
      router.push("/login"); // Redirect to login if no token
    } else {
      setToken(savedToken);
    }
  }, []);

  if (!token) {
    return null; // Render nothing until authentication check is complete
  }

  return (
    <div className="container py-5">
      <h1>Favourites</h1>
      <p>This is your favourites page. Add items to your favourites list here.</p>
    </div>
  );
}
