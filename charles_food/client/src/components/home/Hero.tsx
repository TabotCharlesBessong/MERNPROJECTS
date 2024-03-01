import images from "@/constant/images"

const Hero = () => {
  return (
    <div>
      <img src={images.hero} alt="" className="w-full max-h-[600px] object-cover" />
    </div>
  )
}

export default Hero