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
    if (!token) {
      router.replace("/auth");
      return;
    }

    connect(token).then((id: any) => console.log('id: ', id)).catch(console.error);
  }, [token, router, connect]);

  return (
    <Container sx={{ paddingTop: "1em" }}>
      <Messages />
    </Container>
  );
}
