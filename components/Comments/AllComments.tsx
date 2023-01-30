import { Divider, List, ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";

function AllComments({ comments }: { comments: DocumentData[] }) {
  return (
    <List
    sx={{
      width: "100%",
      maxWidth: "100%",
      bgcolor: "background.paper",
      position: "relative",
      overflow: "auto",
      maxHeight: 300,
      "& ul": { padding: 0 },
    }}
    subheader={<li />}
  >
    <Typography component="h1" variant="h5" sx={{
      my: 1,
      mx: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    }}>
      Comments:
    </Typography>
    
  <Divider />
  {comments.map((comment: DocumentData,) => (
            <li key={`section-${comment.comment}`}>
              <ul>
                <ListSubheader>{comment.email.split("@")[0]}:</ListSubheader>
                <ListItem>
                  <ListItemText >
                    {comment.comment}
                  </ListItemText>
                </ListItem>
                <Divider />
              </ul>
            </li>
          ))}
</List>
  );
}

export default AllComments;


