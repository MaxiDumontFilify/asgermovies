import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,

} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "context/AuthContext";
import { StoreComment } from "Handlers/CommentHandler/CommentHandler";


const NewComment = ({ Moviesid }: { Moviesid: number }) => {
  const { user } = useAuth();
  const muvieId = Moviesid.toString();
  const CreateCommentHandler = StoreComment(muvieId, user);

  const { register, handleSubmit } = useForm();

  
  return (

        <Box
          sx={{
            my: 1,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Leave a comment
          </Typography>

          {/* Form */}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(CreateCommentHandler)}
            sx={{ width: "100%", mt: 1 }}
          >
            <TextField
              rows={4}
              multiline
              fullWidth
              id="outlined-multiline-static"
              label="Comment"
              {...register("comment")}
              sx={{ mt: 3, mb: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post Comment
            </Button>

            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>



  );
};

export default NewComment;
