import { IPrescription, IMedication } from "@/constants/types";
// import { v4 as uuidv4 } from "uuid";

const doctorNames = ["Dr. Smith", "Dr. Johnson", "Dr. Brown", "Dr. Garcia"];
const patientNames = ["John Doe", "Jane Doe", "Alice Smith", "Bob Johnson"];
const instructions = [
  "Take with food",
  "Take on an empty stomach",
  "Avoid dairy products",
  "Do not drive after taking",
];
const investigations = ["Blood test", "X-ray", "MRI", "Ultrasound"];
const medications = ["Ibuprofen", "Paracetamol", "Amoxicillin", "Metformin"];
const dosages = ["500mg", "200mg", "100mg", "250mg"];
const frequencies = [
  "Once a day",
  "Twice a day",
  "Three times a day",
  "Every 6 hours",
];

const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const generatePrescription = (numPrescriptions: number): IPrescription[] => {
  const mockData: IPrescription[] = [];

  const generateRandomId = () => Math.floor(Math.random() * 1000).toString();

  for (let i = 0; i < numPrescriptions; i++) {
    const prescriptionId = generateRandomId();
    const numMedications = Math.floor(Math.random() * 4) + 1;
    const meds: IMedication[] = [];

    for (let j = 0; j < numMedications; j++) {
      meds.push({
        id: generateRandomId(),
        prescriptionId,
        name: getRandomElement(medications),
        dosage: getRandomElement(dosages),
        frequency: getRandomElement(frequencies),
        duration: Math.floor(Math.random() * 14) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    mockData.push({
      id: prescriptionId,
      consultationId: generateRandomId(),
      instructions:
        Math.random() > 0.5 ? getRandomElement(instructions) : undefined,
      investigation:
        Math.random() > 0.5 ? getRandomElement(investigations) : undefined,
      medications: meds,
      createdAt: new Date(),
      updatedAt: new Date(),
      doctorName: getRandomElement(doctorNames),
      patientName: getRandomElement(patientNames),
    });
  }

  return mockData;
};
