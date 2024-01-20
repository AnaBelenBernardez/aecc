export const getAllEventsService = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/events`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message); 
  }

  return data.data;
};