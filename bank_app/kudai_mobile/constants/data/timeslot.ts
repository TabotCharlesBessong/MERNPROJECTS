export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isWeekly: boolean;
}

export const generateRandomTimeSlots = (size: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let i = 0; i < size; i++) {
    const startHour = Math.floor(Math.random() * 24);
    const startMinute = Math.floor(Math.random() * 60);
    const endHour = Math.floor(Math.random() * 2) + startHour
    const endMinute = Math.floor(Math.random() * 30) + startMinute

    const startTime = `${startHour.toString().padStart(2, "0")}:${startMinute
      .toString()
      .padStart(2, "0")}`;
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;

    slots.push({
      id: i.toString(),
      startTime,
      endTime,
      isAvailable: Math.random() > 0.5,
      isWeekly: Math.random() > 0.5,
    });
  }
  return slots;
};
