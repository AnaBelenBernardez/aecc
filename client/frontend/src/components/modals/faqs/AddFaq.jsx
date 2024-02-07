"use client"

import { useState } from 'react';
import { addFaqService } from '../../../service';

function AddFaq ({setClickedAdd, faqsList, setFaqsList, token}){
  const [question, setQuestion] = useState("");
  const [galician_question, setGalicianQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [galician_answer, setGalicianAnswer] = useState("");
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

    let newFaq;

    try{
      newFaq = await addFaqService(question, galician_question, answer, galician_answer, token);
    }catch(e){
      setErrorEdit(e.message);
    } finally{
      setClickedAdd(false);

      const newFaqsList = [...faqsList];

      newFaqsList.push(newFaq);

      setFaqsList(newFaqsList);
    }
}

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-[90vw] h-[50vh] md:h-[60vh] lg:h-[65vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center md:h-[50vh] lg:h-[60vh]'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 overflow-auto md:overflow-hidden">
          <fieldset>
              <ul className='flex flex-col gap-6'>
                  <li className='flex flex-col gap-2'>
                    <h3 className="text-primaryGreen font-bold text-lg">Formulario en castellano</h3>
                    <label htmlFor='question' className='text-sm font-bold'>
                        Pregunta
                        <input onChange={handleChange} type="text" name="question" id="question" required minLength={5} maxLength={300} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                          file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                          border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                          font-normal not-italic w-full">
                        </input>
                    </label>
                    <label htmlFor='answer' className='text-sm font-bold'>
                        Respuesta
                        <input onChange={handleChange} type="text" name="answer" id="answer" required minLength={5} maxLength={300} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                          file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                          border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                          font-normal not-italic w-full">
                        </input>
                    </label>
                  </li>
                  <li className='flex flex-col gap-2'>
                    <h3 className="text-primaryGreen font-bold text-lg">Formulario en gallego</h3>
                    <label htmlFor='galician_question' className='text-sm font-bold'>
                        Pregunta
                        <input onChange={handleChange} type="text" name="galician_question" id="question" required minLength={5} maxLength={300} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                          file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                          border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                          font-normal not-italic w-full">
                        </input>
                    </label>
                    <label htmlFor='galician_answer' className='text-sm font-bold'>
                        Resposta
                        <input onChange={handleChange} type="text" name="galician_answer" id="galician_answer" required minLength={5} maxLength={300} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                          file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                          border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                          font-normal not-italic w-full">
                        </input>
                    </label>
                  </li>
                  {errorEdit && <li className='flex flex-col gap-2'><p className="text-xs text-secondRed">{errorEdit}</p></li>}
                  <li className='flex flex-col items-center lg:flex-row lg:self-end lg:gap-4'>
                    <button type="submit" className='self-center border-2 mt-4 w-[157px] h-[42px] border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold py-2 px-6 lg:self-end lg:mb-2
                  hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
                    >
                      GUARDAR
                    </button>
                    <button 
                      type='button' 
                      className='flex self-center mt-2 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
                      onClick={() => setClickedAdd(false)}
                    >
                      CANCELAR
                    </button>
                  </li>
              </ul>
          </fieldset>
        </form>
      </div>
    </div>
  )
};

export default AddFaq;