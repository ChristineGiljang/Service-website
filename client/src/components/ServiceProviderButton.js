const ServiceProviderButton = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="bg-[#008080] hover:bg-[#006666] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        Be a Service Provider
      </button>
    );
  };
  
  export default ServiceProviderButton;