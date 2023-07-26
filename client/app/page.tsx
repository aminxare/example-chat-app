"use client";

import { useAuth } from "@/context/Auth";
import { Messages } from "@/feature/message";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    const replaceToAuth = () => router.replace("/auth");
    if (!getToken()) {
      replaceToAuth();
    }
  }, [getToken, router]);

  return (
    <Container sx={{ paddingTop: "1em" }}>
      <Messages />
    </Container>
  );
}
