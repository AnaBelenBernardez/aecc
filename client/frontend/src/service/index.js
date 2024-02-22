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

  return data.data[0];
};

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
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const addExperienceService = async (token, formValues) => {
  const addExperienceForm = new FormData();

  addExperienceForm.append("name", formValues.name);
  addExperienceForm.append("content", formValues.content);
  addExperienceForm.append("galician_content", formValues.galician_content);
  if (formValues.photo) {
    addExperienceForm.append("photo", formValues.photo[0][0]);
  }

  const response = await fetch(`${backAPI}/experiences/admin/add`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: addExperienceForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};
export const deleteExperienceService = async (id, token) => {
  const response = await fetch(`${backAPI}/experiences/admin/delete/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const editFaqService = async (
  question,
  galician_question,
  answer,
  galician_answer,
  idFaq,
  token
) => {
  const response = await fetch(`${backAPI}/faqs/admin/edit/${idFaq}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      question,
      galician_question,
      answer,
      galician_answer,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data[0];
};

export const deleteFaqService = async (id, token) => {
  const response = await fetch(`${backAPI}/faqs/admin/delete/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const addFaqService = async (
  question,
  galician_question,
  answer,
  galician_answer,
  token
) => {
  const response = await fetch(`${backAPI}/faqs/admin/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      question,
      galician_question,
      answer,
      galician_answer,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const addNewService = async (token, formValues) => {
  const addNewForm = new FormData();

  addNewForm.append("title", formValues.title);
  addNewForm.append("content", formValues.content);
  addNewForm.append("link", formValues.link);
  addNewForm.append("galician_title", formValues.galician_title);
  addNewForm.append("galician_content", formValues.galician_content);
  addNewForm.append("news_date", formValues.news_date);

  if (formValues.photo !== "") {
    addNewForm.append("photo", formValues.photo[0][0]);
  }

  const response = await fetch(`${backAPI}/news/admin/add`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: addNewForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const editNewService = async (formValuesEdit, idNew, token) => {
  const editNewForm = new FormData();
  editNewForm.append("title", formValuesEdit.title);
  editNewForm.append("content", formValuesEdit.content);
  editNewForm.append("link", formValuesEdit.link);
  editNewForm.append("galician_title", formValuesEdit.galician_title);
  editNewForm.append("galician_content", formValuesEdit.galician_content);
  editNewForm.append("news_date", formValuesEdit.news_date);
  
  if (Array.isArray(formValuesEdit.photo)) {
    editNewForm.append("photo", formValuesEdit.photo[0][0]);
  }

  const response = await fetch(`${backAPI}/news/admin/edit/${idNew}`, {
    method: "PUT",
    headers: {
      token: token,
    },
    body: editNewForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const addEvent = async (token, formValues) => {
  const editNewForm = new FormData();
  editNewForm.append("title", formValues.title);
  editNewForm.append("content", formValues.content);
  editNewForm.append("date_start", formValues.date_start);
  editNewForm.append("date_end", formValues.date_end);
  editNewForm.append("location", formValues.location);
  editNewForm.append("link", formValues.link);
  editNewForm.append("event_type", formValues.event_type);
  editNewForm.append("photo", formValues.photo[0]);
  editNewForm.append("galician_title", formValues.galician_title);
  editNewForm.append("galician_content", formValues.galician_content);
  const response = await fetch(`${backAPI}/events/admin/add`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: editNewForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const deleteEventService = async (id, token) => {
  const response = await fetch(`${backAPI}/events/admin/delete/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const editEventService = async (id, token, formValues) => {
  const editNewForm = new FormData();
  editNewForm.append("title", formValues.title);
  editNewForm.append("content", formValues.content);
  editNewForm.append("date_start", formValues.date_start);
  editNewForm.append("date_end", formValues.date_end);
  editNewForm.append("location", formValues.location);
  editNewForm.append("link", formValues.link);
  editNewForm.append("event_type", formValues.event_type);
  editNewForm.append("warning", Number(formValues.warning));
  editNewForm.append("warning_content", formValues.warning_content);
  editNewForm.append("galician_title", formValues.galician_title);
  editNewForm.append("galician_content", formValues.galician_content);
  editNewForm.append(
    "galician_warning_content",
    formValues.galician_warning_content
  );

  const response = await fetch(`${backAPI}/events/admin/edit/${id}`, {
    method: "PUT",
    headers: {
      token: token,
    },
    body: editNewForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const editExperienceService = async (
  formValues,
  idExperience,
  token
) => {
  const editExperienceForm = new FormData();
  editExperienceForm.append("name", formValues.name);
  editExperienceForm.append("content", formValues.content);
  editExperienceForm.append("galician_content", formValues.galician_content);

  if (Array.isArray(formValues.photo)) {
    editExperienceForm.append("photo", formValues.photo[0][0]);
  }

  const response = await fetch(
    `${backAPI}/experiences/admin/edit/${idExperience}`,
    {
      method: "PUT",
      headers: {
        token: token,
      },
      body: editExperienceForm,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const changePwd = async (token, formValues) => {
  const editPwd = new FormData();

  editPwd.append("oldPwd", formValues.oldPwd);
  editPwd.append("newPwd", formValues.newPwd);

  const response = await fetch(`${backAPI}/admin/update-password/1`, {
    method: "PUT",
    headers: {
      token: token,
    },
    body: editPwd,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const getAllEventsFilterService = async (
  typeEvent,
  locationEvent,
  eventDateStart,
  eventDateEnd
) => {
  let params = {};

  if (typeEvent !== "") params.eventType = typeEvent;
  if (locationEvent !== "") params.location = locationEvent;
  if (eventDateStart !== undefined) {
    const formatedDateStart = formatDate(eventDateStart);
    params.minDate = formatedDateStart;
  }
  if (eventDateEnd !== undefined) {
    const formatedDateEnd = formatDate(eventDateEnd);
    params.maxDate = formatedDateEnd;
  }

  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`${backAPI}/events?${queryParams}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const deletePhotoEventService = async (token, idEvent, idPhoto) => {
  const response = await fetch(
    `${backAPI}/events/admin/${idEvent}/delete/photo/${idPhoto}`,
    {
      method: "DELETE",
      headers: {
        token: token,
      },
    }
  );

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const addPhotoEventService = async (token, idEvent, photo) => {
  const addPhotoForm = new FormData();

  for (const item of photo) {
    addPhotoForm.append("photo", item);
  }

  const response = await fetch(`${backAPI}/events/admin/add-photo/${idEvent}`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: addPhotoForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const getAllSponsorsService = async () => {
  const response = await fetch(`${backAPI}/sponsors/`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const getAllAchievementsService = async () => {
  const response = await fetch(`${backAPI}/achievements`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const deleteSponsorService = async (id, token) => {
  const response = await fetch(`${backAPI}/sponsors/admin/delete/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const editSponsorService = async (formData, token, id) => {
  const response = await fetch(`${backAPI}/sponsors/admin/edit/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};
export const addSponsorService = async (formData, token) => {
  const response = await fetch(`${backAPI}/sponsors/admin/add`, {
    method: "POST",
    body: formData,
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const addAchievement = async (token, formValues) => {
  const editNewForm = new FormData();
  editNewForm.append("description", formValues.description);
  editNewForm.append("icon", formValues.icon[0]);
  editNewForm.append("galician_description", formValues.galician_description);
  const response = await fetch(`${backAPI}/achievements/admin/add`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: editNewForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const deleteAchievementService = async (id, token) => {
  const response = await fetch(`${backAPI}/achievements/admin/delete/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const editAchievementService = async (id, token, formValues) => {
  let editNewForm = new FormData();
  if (formValues.icon.length === 0) {
    editNewForm.append("description", formValues.description);
    editNewForm.append("galician_description", formValues.galician_description);
  } else {
    editNewForm.append("description", formValues.description);
    editNewForm.append("icon", formValues.icon[0]);
    editNewForm.append("galician_description", formValues.galician_description);
  }

  const response = await fetch(`${backAPI}/achievements/admin/edit/${id}`, {
    method: "PUT",
    headers: {
      token: token,
    },
    body: editNewForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const addBannerService = async (token, formValues) => {
  const addBannerForm = new FormData();

  for (const key in formValues) {
    if (formValues[key] !== "") {
      addBannerForm.append(key, formValues[key]);
    }
  }

  if (formValues.photo) {
    addBannerForm.append("photo", formValues.photo[0][0]);
  }

  const response = await fetch(`${backAPI}/banners/admin/add`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: addBannerForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const editBannerService = async (formValuesEdit, idBanner, token) => {
  const editBannerForm = new FormData();
  for (const key in formValuesEdit) {
    if (formValuesEdit[key] !== "") {
      editBannerForm.append(key, formValuesEdit[key]);
    }
  }
  if (Array.isArray(formValuesEdit.photo)) {
    editBannerForm.append("photo", formValuesEdit.photo[0][0]);
  }

  const response = await fetch(`${backAPI}/banners/admin/edit/${idBanner}`, {
    method: "PUT",
    headers: {
      token: token,
    },
    body: editBannerForm,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const deleteBannerService = async (idBanner, token) => {
  const response = await fetch(`${backAPI}/banners/admin/delete/${idBanner}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getAllBannersService = async () => {
  const response = await fetch(`${backAPI}/banners`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

