const backAPI = process.env.NEXT_PUBLIC_BACK_URL;

export const getAllEventsService = async () => {
  const response = await fetch(`${backAPI}/events`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const getEventService = async (id) => {
  const response = await fetch(`${backAPI}/events/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data[0]
}

export const getAllNewsService = async () => {
  const response = await fetch(`${backAPI}/news`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const getAllExperiencesService = async () => {
  const response = await fetch(`${backAPI}/experiences`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const getAllFaqsService = async () => {
  const response = await fetch(`${backAPI}/faqs`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const loginService = async (name, pwd) => {
  const response = await fetch(`${backAPI}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, pwd }),
  });

  const data = await response.json();

  if (!response.ok) {
    return data;
  }

  return data;
};

export const deleteNewService = async (id, token) => {
  const response = await fetch(`${backAPI}/news/admin/delete/${id}`, {
    method: "DELETE",
    headers: {
      token: token
    }
  }
  );

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};


export const editFaqService = async (question, galician_question, answer, galician_answer, idFaq, token) =>{

  const response = await fetch(`${backAPI}/faqs/admin/edit/${idFaq}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({question, galician_question, answer, galician_answer}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data[0];
}



export const addNewService = async (token) => {
  const response = await fetch(`${backAPI}/news/admin/add`, {
    method: 'POST',
    headers : {
      "Content-type": "multipart/form-data",
      token: token
    },
  })

  const data = response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }
}