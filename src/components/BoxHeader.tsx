import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";

type Props = {
  sidetext: string;
  subtitle: string;
  title: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sidetext }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin={"1.5rem 1rem 0 1rem"}>
      <FlexBetween>
        {icon}
        <Box width={"100%"}>
          <Typography variant="h4" mb="-.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight={"700"} color={"#f2b455"}>
        {sidetext}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;
