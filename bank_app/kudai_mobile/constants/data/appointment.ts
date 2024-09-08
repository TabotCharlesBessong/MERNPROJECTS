interface Appointment {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  reason: string;
  appointmentStatus: "Pending" | "Approved" | "Cancelled";
}

interface AppointmentsScreenProps {
  // Props if any
}

interface RenderAppointmentItemProps {
  item: Appointment;
}

export const generateRandomAppointments = () => {
  const doctorNames = [
    "Dr. Smith",
    "Dr. Doe",
    "Dr. Brown",
    "Dr. White",
    "Dr. Green",
  ];
  const doctorSpecialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Neurology",
    "General Medicine",
  ];

  const dates = [
    "June 12, 2024",
    "June 15, 2024",
    "June 20, 2024",
    "June 25, 2024",
    "June 30, 2024",
  ];
  const times = ["10:00 AM", "02:00 PM", "04:00 PM", "08:00 AM", "11:00 AM"];

  const statuses = ["Pending", "Approved", "Cancelled"];

  const generateRandomId = () => Math.floor(Math.random() * 1000).toString();

  const generateAppointments = (count: number) => {
    return Array.from({ length: count }, () => ({
      id: generateRandomId(),
      doctorName: doctorNames[Math.floor(Math.random() * doctorNames.length)],
      doctorSpecialty:
        doctorSpecialties[Math.floor(Math.random() * doctorSpecialties.length)],
      date: dates[Math.floor(Math.random() * dates.length)],
      time: times[Math.floor(Math.random() * times.length)],
      reason: "Hello i have a pain in my stomach is like my liver is down",
      appointmentStatus: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  };

  return {
    upcoming: generateAppointments(6),
    past: generateAppointments(4),
  };
};
