const { useState } = require("react");


const SelectInput = ({setStatus, eventType, options, text}) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [textToDefault, setTextToDefault] = useState('');
  const handleClick = () => {
    setSelectOpen(true);
    if (selectOpen) {
      if (text === 'Tipo de evento') {
        setTextToDefault('Todos los tipos');
      }
      if (text === 'Localidades') {
        setTextToDefault('Todas las localidades');
        }
    }
  }
  console.log(textToDefault);
  function handleChange(e){
    const {name} = e.target;
    const value = e.target.value;
    switch(name){
        case 'typeEvent':
            setStatus(value);
            console.log(value)
            break;
        case 'locationEvent':
            setStatus(value);
            console.log(value)
            break;
        default: 
            break;
    }
  }
  console.log(textToDefault);


  return (
    <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-6 lg:flex-col lg:gap-2 lg:items-start'>
      <label htmlFor={eventType} className='font-bold'> {text}</label>
        <select onClick={handleClick} onChange={handleChange} name={eventType} id={eventType} className='w-full font-light h-14 border border-[#cccccc] pl-4 rounded-s md:w-64'>
          <option value='' selected>{textToDefault ? textToDefault : text}</option>
          {
            options.map((option) => {
              return <option value={option} key={option}>{option}</option>
            })
          }
        </select>
    </div>
  );
}



export default SelectInput;