const backAPI = process.env.NEXT_PUBLIC_BACK_URL;

export const getAllEventsService = async () => {
  const response = await fetch(`${backAPI}/events`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message); 
  }

  return data.data;
};

export const getAllNewsService = async () => {
  const response = await fetch(`${backAPI}/news`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
}

export const getAllExperiencesService = async () => {
  const response = await fetch(`${backAPI}/experiences`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data.data;
}