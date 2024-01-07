const SelectInput = ({ eventType, options, text}) => {
  return (
    <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-6 lg:flex-col lg:gap-2 lg:items-start'>
      <label htmlFor={eventType} className='font-bold'> {text}</label>
        <select name={eventType} id={eventType} className='w-full font-light h-14 border border-[#cccccc] pl-4 rounded-s md:w-56'>
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