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

export const deleteFaqService = async (id, token) => {
  const response = await fetch(`${backAPI}/faqs/admin/delete/${id}`, {
    method: "DELETE",
    headers: {
      token: token
    }
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const addNewService = async (token, formValues) => {
  const addNewForm = new FormData();

  addNewForm.append('title', formValues.title);
  addNewForm.append('content', formValues.content);
  addNewForm.append('link', formValues.link);
  addNewForm.append('galician_title', formValues.galician_title);
  addNewForm.append('galician_content', formValues.galician_content);
  addNewForm.append('photo', formValues.photo[0][0]);

  const response = await fetch(`${backAPI}/news/admin/add`, {
    method: 'POST',
    headers : {
      token: token
    },
    body: addNewForm
  })

  const data = response.json();

  if(!response.ok) {
    throw new Error(data.message);
  };

  return data.data
};

export const editNewService = async (formValues, idNew, token) => {
  const editNewForm = new FormData();
  console.log(formValues.photo);

  editNewForm.append('title', formValues.title);
  editNewForm.append('content', formValues.content);
  editNewForm.append('link', formValues.link);
  editNewForm.append('galician_title', formValues.galician_title);
  editNewForm.append('galician_content', formValues.galician_content);
  editNewForm.append('photo', formValues.photo);

  const response = await fetch(`${backAPI}/news/admin/edit/${idNew}`, {
    method: 'PUT',
    headers : {
      token: token
    },
    body: editNewForm
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data
}