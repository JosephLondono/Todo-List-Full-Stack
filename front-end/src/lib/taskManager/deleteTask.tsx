import { getCookie } from "cookies-next";

export const deleteTask = async (id: number) => {
  const token = getCookie("accesToken");
  try {
    const res = await fetch(`http://localhost:3000/api/v1/task/${id}/dsd`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const task = await res.json();
    return task;
  } catch (error) {
    console.error(error);
    return [];
  }
};
