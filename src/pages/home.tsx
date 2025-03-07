import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('prevuser') || 'null');

  const handleNavigate = () => {
    if (user) {
      navigate('/user-booking');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center mt-32">
        <div className="text-center w-full md:w-1/2">
          <h1 className="text-7xl font-bold text-gray-800 mb-4">
            Prevent <span className="text-primary ">Better</span> <br /> Than
            Cure
          </h1>
          <p className="text-gray-600 mb-8">
            Provide proper protection for relatives and the people around you.
          </p>
          <button
            onClick={handleNavigate}
            className="bg-[#6c63ff] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Make an Appointment
          </button>
        </div>

        <div className="text-center w-full md:w-[40%]">
          <img src="/assets/svgs/doc.svg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
