const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          CharlesEats.com
        </span>
        <span className="text-white font-bold flex gap-4 tracking-tight">
          <span>Privacy policy</span>
          <span>Terms of service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
