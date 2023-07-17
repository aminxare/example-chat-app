"use client";

import { useAuth } from "@/context/Auth";
import { useSocket } from "@/context/Socket";
import { Messages } from "@/feature/message";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { connect, connected } = useSocket();
  const { verifyToken, getUser } = useAuth();
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    const replaceToAuth = () => router.replace("/auth");
    (async function () {
      if (!token) {
        replaceToAuth();
      } else {
        if (!getUser()) {
          const isTokenVerified = await verifyToken(token);
          if (!isTokenVerified) replaceToAuth();
        }
      }
    })();
    
    if (!connected)
      connect(token)
        .then((id: any) => console.log("id: ", id))
        .catch((err) => replaceToAuth());
  }, [token, router, connect, verifyToken, getUser, connected]);

  return (
    <Container sx={{ paddingTop: "1em" }}>
      <Messages />
    </Container>
  );
}
