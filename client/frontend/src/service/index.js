import formatDate from "../helpers/formatDate";

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

export const addExperienceService = async (token, formValues) => {
  const addExperienceForm = new FormData();

  addExperienceForm.append('name', formValues.name);
  addExperienceForm.append('content', formValues.content);
  addExperienceForm.append('galician_content', formValues.galician_content);
  if (formValues.photo) {
    addExperienceForm.append('photo', formValues.photo[0][0]);
  }

  const response = await fetch(`${backAPI}/experiences/admin/add`, {
    method: 'POST',
    headers : {
      token: token
    },
    body: addExperienceForm
  })

  const data = response.json();

  if(!response.ok) {
    throw new Error(data.message);
  };

  return data.data
};
export const deleteExperienceService = async (id, token) => {
  const response = await fetch(`${backAPI}/experiences/admin/delete/${id}`, {
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const addFaqService = async(question, galician_question, answer, galician_answer, token) =>{

  const response = await fetch(`${backAPI}/faqs/admin/add`, {
    method: 'POST',
    headers : {
      "Content-Type": "application/json",
      token: token
    },
    body: JSON.stringify({question, galician_question, answer, galician_answer})
  })

  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
}

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
  editNewForm.append('title', formValues.title);
  editNewForm.append('content', formValues.content);
  editNewForm.append('link', formValues.link);
  editNewForm.append('galician_title', formValues.galician_title);
  editNewForm.append('galician_content', formValues.galician_content);
  if (Array.isArray(formValues.photo)) {editNewForm.append('photo', formValues.photo[0][0])};

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
export const editExperienceService = async (formValues, idExperience, token) => {
  const editExperienceForm = new FormData();
  editExperienceForm.append('name', formValues.name);
  editExperienceForm.append('content', formValues.content);
  editExperienceForm.append('galician_content', formValues.galician_content);
  if (Array.isArray(formValues.photo)) {editExperienceForm.append('photo', formValues.photo[0][0])};

  const response = await fetch(`${backAPI}/experiences/admin/edit/${idExperience}`, {
    method: 'PUT',
    headers : {
      token: token
    },
    body: editExperienceForm
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data
}

export const changePwd = async (token, formValues) => {
  const editPwd = new FormData();

  editPwd.append('oldPwd', formValues.oldPwd);
  editPwd.append('newPwd', formValues.newPwd);

  const response = await fetch(`${backAPI}/admin/update-password/1`, {
    method: 'PUT',
    headers: {
      token: token
    },
    body: editPwd
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  
  return data.data
}

export const getAllEventsFilterService = async (typeEvent, locationEvent, eventDateStart, eventDateEnd) =>{
  let params = {}
  
  if(typeEvent !== "") params.eventType = typeEvent
  if(locationEvent !== "") params.location = locationEvent
  if(eventDateStart !== undefined) {
    const formatedDateStart = formatDate(eventDateStart);
    params.minDate = formatedDateStart;}
  if(eventDateEnd !== undefined) {
    const formatedDateEnd = formatDate(eventDateEnd);
    params.maxDate = formatedDateEnd;}
  
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`${backAPI}/events?${queryParams}`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data
}