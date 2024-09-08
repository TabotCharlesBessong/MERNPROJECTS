// utils/randomData.ts
export interface Conversation {
  id: string;
  name: string;
  profilePic: string;
  lastMessage: string;
}

export interface Message {
  id: string;
  text: string;
  time: string;
  fromSender: boolean;
}

export const generateRandomConversations = (): Conversation[] => {
  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Alice",
      profilePic: "https://via.placeholder.com/50",
      lastMessage: "See you soon!",
    },
    {
      id: "2",
      name: "Bob",
      profilePic: "https://via.placeholder.com/50",
      lastMessage: "Thanks for the update.",
    },
    {
      id: "3",
      name: "Charlie",
      profilePic: "https://via.placeholder.com/50",
      lastMessage: "Are you coming to the meeting?",
    },
  ];
  return conversations;
};

export const generateRandomMessages = (conversationId: string): Message[] => {
  const messages: Message[] = [
    {
      id: "101",
      text: "Hey, how are you?",
      time: "10:00 AM",
      fromSender: true,
    },
    {
      id: "102",
      text: "I am fine, thank you!",
      time: "10:05 AM",
      fromSender: false,
    },
    {
      id: "103",
      text: "What about our meeting?",
      time: "10:10 AM",
      fromSender: true,
    },
    {
      id: "104",
      text: "Yes, I will be there.",
      time: "10:15 AM",
      fromSender: false,
    },
  ];
  return messages;
};
