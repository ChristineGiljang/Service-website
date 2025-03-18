const ServiceProviderButton = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="rounded-md border border-blue-600 bg-accent px-12 py-3 text-sm font-medium text-white transition hover:bg-[#006666] hover:white focus:ring-3 focus:outline-non"
      >
        Be a Service Provider
      </button>
    );
  };
  
  export default ServiceProviderButton;