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

    const defaultValueFaq = faqsList.find((faq) => faq.id === parseInt(faqId));


    if(!question || question.length === 0){
        setQuestion(defaultValueFaq.question);
    }
    if(!galician_question || galician_question === 0){
        setGalicianQuestion(defaultValueFaq.galician_question);
    }
    if(!answer || answer.length === 0){
        setAnswer(defaultValueFaq.answer);
    }
    if(!galician_answer || galician_answer.length === 0){
        setGalicianAnswer(defaultValueFaq.galician_answer);
    }

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
      <form onSubmit={handleSubmit}>
        <fieldset>
            <ul>
                <li>
                    Castellano
                    <label htmlFor='question'>
                        <input onChange={handleChange} type="text" name="question" id="question" required minLength={5} maxLength={300} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={currentFaq.question}></input>
                    </label>
                    <label htmlFor='answer'>
                        <input onChange={handleChange} type="text" name="answer" id="answer" required minLength={5} maxLength={300} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={currentFaq.answer}></input>
                    </label>
                </li>
                <li>
                    Gallego
                    <label htmlFor='galician_question'>
                        <input onChange={handleChange} type="text" name="galician_question" id="question" required minLength={5} maxLength={300} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={currentFaq.galician_question}></input>
                    </label>
                    <label htmlFor='galician_answer'>
                        <input onChange={handleChange} type="text" name="galician_answer" id="galician_answer" required minLength={5} maxLength={300} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={currentFaq.galician_answer}></input>
                    </label>
                </li>
            </ul>
        </fieldset>
        {errorEdit && <p>{errorEdit}</p>}
        <button type="submit">Guardar cambios</button>
      </form>
  )
}

export default EditFaq