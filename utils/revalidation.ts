export const revalidateList = () => {
  fetch('/api/revalidate');
};
export const revalidateSingle = () => {
  fetch(`/api/revalidate/${id}`);
};
