import { Box, Button, Grid, Stack } from "@mui/material";
import MessageList from "./MessageList";
import { useState } from "react";

export default function Chat() {
  return (
    <Grid container spacing={2} height={"90vh"}>
      <Grid item sm={4} sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
        <MessageList onSelect={(id) => console.log(id)} />
      </Grid>
      <Grid item sm={8}>
        s
      </Grid>
    </Grid>
  );
}
