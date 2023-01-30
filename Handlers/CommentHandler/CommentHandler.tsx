import { db } from "config/firebase";
import { addDoc, collection } from "firebase/firestore";

export function StoreComment(muvieId: string, user: any) {
    return async (data: any) => {
      const comment: string = data.comment;
      const ref = collection(db, "Movies", muvieId, "Comments");
      if (!data.comment) {
        return;
      }
      try {
        await addDoc(ref, {
          email: user.email,
          comment: comment,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  