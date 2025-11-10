export default async function getCsrfToken() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/csrf`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data.csrfToken;
  } catch (error) {
    console.error(error);
  }
}
