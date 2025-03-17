const ServiceProviderButton = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:white focus:ring-3 focus:outline-non"
      >
        Be a Service Provider
      </button>
    );
  };
  
  export default ServiceProviderButton;