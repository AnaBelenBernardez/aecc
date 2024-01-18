const FormInput = ({ htmlFor, text, type}) => {
  return (
    <div className='flex flex-col gap-2 lg:flex-col lg:gap-2 lg:items-start lg:w-full'>
      <label htmlFor={htmlFor} className='font-bold'>{text}</label>
      <input 
        type={type} 
        name={htmlFor} 
        id={htmlFor} 
        className='w-full font-light h-14 border border-[#cccccc] pl-4 rounded-s md:w-80 lg:w-full'/>
    </div>
  );
};

export default FormInput;