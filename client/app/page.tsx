"use client";

import { useSocket } from "@/context/Socket";
import { Messages } from "@/feature/message";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const [token] = useLocalStorage("token", null);
  const router = useRouter();
  const { connect } = useSocket();

  useEffect(() => {
    const replaceToAuth = () => router.replace("/auth");
    if (!token) {
      replaceToAuth();
      return;
    }

    connect(token)
      .then((id: any) => console.log("id: ", id))
      .catch((err) => replaceToAuth());
  }, [token, router, connect]);

  return (
    <Container sx={{ paddingTop: "1em" }}>
      <Messages />
    </Container>
  );
}
