import * as React from 'react';
import CircularProgress, {
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function RatingCircle(value: number, ) {
    const simple = Math.round(value);
    const porcentage = simple+"%";
        

    return <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
      }}
    >
      <CircularProgress variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: "white",
            fontSize: "0.7rem",
            fontWeight: "bold",
            textShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >{`${porcentage}`}</Typography>
      </Box>
    </Box>;
  }