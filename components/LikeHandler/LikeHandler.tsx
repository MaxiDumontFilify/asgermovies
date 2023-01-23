import { db } from "config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";


export function like22(user: any, like: boolean, movie: any, setLike: React.Dispatch<React.SetStateAction<boolean>>) {
    return async () => {
      const ref = collection(db, "users", user.uid, "likedMovies");
      if (!like) {
        try {
          await addDoc(ref, {
            id: movie.id,
          });
          setLike(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const q = query(ref, where("id", "==", movie.id));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
          setLike(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
  }