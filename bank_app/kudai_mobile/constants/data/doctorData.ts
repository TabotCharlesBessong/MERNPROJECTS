import { DoctorCardProps } from "../types";

const generateMockData = (): DoctorCardProps[] => {
  const specialities = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Urology",
  ];

  const languages = ["English", "French", "Spanish", "German", "Italian"];

  const names = ["Smith Wodel","Barry Tan","Hello Stark","Blaise Tonk"]

  const location = ["Douala, Cameroon","Buea, Cameroon","Yaounde, Cameroon","Ouesso Congo","Limbe, Cameroon","Oyom Cameroon"]

  const data: DoctorCardProps[] = [];

  for (let i = 1; i <= 10; i++) {
    const randomSpeciality =
      specialities[Math.floor(Math.random() * specialities.length)];

    const randomLanguages = 
      languages[Math.floor(Math.random() * languages.length)];

    const randomName = names[Math.floor(Math.random() * names.length)]

    const randomLocation = location[Math.floor(Math.random() * location.length)]

    const doctor: DoctorCardProps = {
      id: i,
      image: `image${i}`,
      name: `Dr ${randomName}`,
      rating: Math.floor(Math.random() * 5) + 1,
      location: `Location ${randomLocation}`,
      experience: Math.floor(Math.random() * 10) + 1,
      speciality: randomSpeciality,
      language: randomLanguages,
      fee: Math.floor(Math.random() * 5000) + 1000,
    };

    data.push(doctor);
  }

  return data;
};

export default generateMockData