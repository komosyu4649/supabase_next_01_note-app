import React from 'react';
import { useMutation } from 'react-query';
import useStore from '../store';
import { revalidateList, revalidateSingle } from '../utils/revalidation';
import { supabase } from '../utils/supabase';
import { EditedNote, Note } from '../types/types';

export const useMutateNote = () => {
  const reset = useStore((state) => state.resetEditedNote);

  const createNoteMutation = useMutation(
    async (note: Omit<Note, 'created_at' | 'id' | 'comments'>) => {
      const { data, error } = await supabase.from('notes').insert(note);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        revalidateList();
        reset();
        alert('success');
      },
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const updateNoteMutation = useMutation(async (note: EditedNote) => {
    const { data, error } = await supabase
      .from('note')
      .update({ title: note.title, content: note.content })
      .eq('id', note.id);
    if (error) throw new Error(error.message);
    return data;
  }, {
      onSuccess: (res) => {
          revalidateList()
          revalidateSingle(res[0].id)
          reset()
          alert("success")
      }, 
      onError: (err: any) => {
        alert(err.message)
        reset()
      } 
  });

  return <div></div>;
};
