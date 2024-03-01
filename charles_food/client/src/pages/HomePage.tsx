import images from "@/constant/images";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck Into Takeaway today
        </h1>
        <span className="text-xl">Food is just a click away</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={images.landing} alt="" className="" />
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway faster!
          </span>
          <span>
            Download the CharlesEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={images.appDownload} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
