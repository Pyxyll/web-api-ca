import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid2";

const TemplatePersonPage = ({ movie, children }) => {
  return (
    <>
      {/* <MovieHeader movie={movie} /> */}

      <Grid size={{ xs: 9 }}>{children}</Grid>
    </>
  );
};

export default TemplatePersonPage;
