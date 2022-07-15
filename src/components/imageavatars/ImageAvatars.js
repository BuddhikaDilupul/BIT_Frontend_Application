import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
export default function ImageAvatars() {
  return (
    <Stack direction="row" spacing={2}>
     <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
      <Avatar
        alt="Remy Sharp"
        src="\avatars\loguser.jpg"
        sx={{ width: 150, height: 150}}
      />
      </Grid>
    </Stack>
  );
}
