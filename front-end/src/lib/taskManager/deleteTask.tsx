export const deleteTask = async (id: number, accessToken: string) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL_PROD_BACKEND ||
        process.env.NEXT_PUBLIC_URL_DEV_BACKEND
      }/api/v1/task/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    const task = await res.json();
    return task;
  } catch (error) {
    console.error(error);
    return [];
  }
};
