import React, { useState } from 'react'
import { editFaqService } from '../../../service';

function EditFaq({currentFaq, faqsList, setFaqsList, faqId, setClickedEdit}) {

  const [question, setQuestion] = useState(currentFaq.question);
  const [galician_question, setGalicianQuestion] = useState(currentFaq.galician_question);
  const [answer, setAnswer] = useState(currentFaq.answer);
  const [galician_answer, setGalicianAnswer] = useState(currentFaq.galician_answer);
  const [errorEdit, setErrorEdit] = useState("");

  function handleChange(e){
      const {name} = e.target;
      const value = e.target.value;

      switch(name){
          case 'question':
              setQuestion(value);
              break;
          case 'galician_question':
              setGalicianQuestion(value);
              break;
          case 'answer':
              setAnswer(value);    
              break;
          case 'galician_answer':
              setGalicianAnswer(value);    
              break;
          default: 
              break;
      }
  }

  async function handleSubmit(e){
      e.preventDefault();

      let editedFaq;

      try{
          const tokenJson = window.localStorage.getItem('login');
          const tokenObj = JSON.parse(tokenJson);

          editedFaq = await editFaqService(question, galician_question, answer, galician_answer, faqId, tokenObj.state.token);
      }catch(e){
          setErrorEdit(e.message);
      } finally{
          setClickedEdit(false);

          const findFaq = faqsList.find((faq) => faq.id === parseInt(faqId));
          const indexEditedFaq = faqsList.indexOf(findFaq);
          const newFaqsList = [...faqsList];
          newFaqsList.splice(indexEditedFaq, 1, editedFaq);

          setFaqsList(newFaqsList);
      }
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-[90vw] h-[60vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center'>
        <form onSubmit={handleSubmit}>
          <fieldset>
              <ul className="flex flex-col gap-6">
                  <li>
                    <h3 className="text-primaryGreen font-bold text-lg">Formulario en castellano</h3>
                    <label htmlFor='question' className='text-sm font-bold'>
                        Pregunta
                        <input onChange={handleChange} type="text" name="question" id="question" required minLength={5} maxLength={300} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={currentFaq.question}></input>
                    </label>
                    <label htmlFor='answer' className='text-sm font-bold'>
                        Respuesta
                        <input onChange={handleChange} type="text" name="answer" id="answer" required minLength={5} maxLength={300} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={currentFaq.answer}></input>
                    </label>
                  </li>
                  <li>
                    <h3 className="text-primaryGreen font-bold text-lg">Formulario en gallego</h3>
                    <label htmlFor='galician_question' className='text-sm font-bold'>
                        Pregunta
                        <input onChange={handleChange} type="text" name="galician_question" id="question" required minLength={5} maxLength={300} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={currentFaq.galician_question}></input>
                    </label>
                    <label htmlFor='galician_answer' className='text-sm font-bold'>
                        Resposta
                        <input onChange={handleChange} type="text" name="galician_answer" id="galician_answer" required minLength={5} maxLength={300} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={currentFaq.galician_answer}></input>
                    </label>
                  </li>
              </ul>
              <button type="submit" className='border border-primaryGreen py-2 px-6 mt-6 rounded-3xl font-bold text-sm text-primaryGreen self-end'>Guardar cambios</button>
          </fieldset>
          {errorEdit && <p>{errorEdit}</p>}
        </form>
      </div>
    </div>
  )
}

export default EditFaq