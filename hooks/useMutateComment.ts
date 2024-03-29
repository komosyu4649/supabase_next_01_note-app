// import React from 'react';
// import { useMutation } from 'react-query';
// import useStore from '../store';
// import { EditedComment } from '../types/types';
// import { revalidateSingle } from '../utils/revalidation';
// import { supabase } from '../utils/supabase';

// export const useMutateComment = () => {
//   const reset = useStore((state) => state.resetEditedComment);

//   const createCommentMutation = useMutation(
//     async (comment: Omit<Comment, 'created_at' | 'id'>) => {
//       const { data, error } = await supabase.from('comments').insert(comment);
//       if (error) throw new Error(error.message);
//       return data;
//     },
//     {
//       onSuccess: (res) => {
//         revalidateSingle(res[0].note_id);
//         reset();
//         alert('success');
//       },
//       onError: (err: any) => {
//         alert(err.message);
//         reset();
//       },
//     }
//   );

//   const updateCommentMutation = useMutation(
//     async (comment: EditedComment) => {
//       const { data, error } = await supabase
//         .from('comments')
//         .update({ content: comment.content })
//         .eq('id', comment.id);
//     },
//     {
//       onSuccess: (res) => {
//         revalidateSingle(res[0].note_id);
//         reset();
//         alert('success');
//       },
//       onError: (err: any) => {
//         alert(err.message);
//         reset();
//       },
//     }
//   );

//   const deleteCommentMutation = useMutation(
//     async (id: string) => {
//       const { data, error } = await supabase
//         .from('comments')
//         .delete()
//         .eq('id', id);
//       if (error) throw new Error(error.message);
//       return data;
//     },
//     {
//       onSuccess: (res) => {
//         revalidateSingle(res[0].note_id);
//         reset();
//         alert('success');
//       },
//       onError: (err: any) => {
//         alert(err.message);
//         reset();
//       },
//     }
//   );

//   return {
//     createCommentMutation,
//     updateCommentMutation,
//     deleteCommentMutation,
//   };
// };

import { useMutation } from 'react-query';
import { supabase } from '../utils/supabase';
import useStore from '../store';
import { revalidateSingle } from '../utils/revalidation';
import { Comment, EditedComment } from '../types/types';

export const useMutateComment = () => {
  const reset = useStore((state) => state.resetEditedComment);
  const createCommentMutation = useMutation(
    async (comment: Omit<Comment, 'created_at' | 'id'>) => {
      const { data, error } = await supabase.from('comments').insert(comment);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id);
        reset();
        alert('Successfully completed !!');
      },
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );
  const updateCommentMutation = useMutation(
    async (comment: EditedComment) => {
      const { data, error } = await supabase
        .from('comments')
        .update({ content: comment.content })
        .eq('id', comment.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id);
        reset();
        alert('Successfully completed !!');
      },
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );
  const deleteCommentMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id);
        reset();
        alert('Successfully completed !!');
      },
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );
  return {
    deleteCommentMutation,
    createCommentMutation,
    updateCommentMutation,
  };
};
