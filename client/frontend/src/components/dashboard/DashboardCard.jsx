export const DashboardCard = ({ children, title }) => {
  return (
    <div className="m-12 bg-primaryGreen max-w-[300px] rounded-xl hover:bg-green-600 hover:scale-110 duration-700 p-5 flex flex-col items-center">
      <figure>{children}</figure>
      <h4 className="py-2 text-white font-bold text-xl">{title}</h4>
    </div>
  );
};
