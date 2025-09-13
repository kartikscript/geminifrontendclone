import { nanoid } from "nanoid";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

export const Chats: Chat[] = [
  {
    id: nanoid(),
    title: "Project Discussion with John",
    messages: [
      { id: nanoid(), role: "user", content: "Hey John, have you checked the latest commit on the repo?" },
      { id: nanoid(), role: "assistant", content: "Yes, I did. The login bug seems fixed, but the signup flow is still failing." },
      { id: nanoid(), role: "user", content: "Exactly, I noticed that too. I'll patch it today and push another commit." },
      { id: nanoid(), role: "assistant", content: "Perfect. Once that's done, we should be able to run full tests." },
      { id: nanoid(), role: "user", content: "Cool, let's aim to wrap this up before Friday." },
    ],
  },
  {
    id: nanoid(),
    title: "Weekend Travel Plans",
    messages: [
      { id: nanoid(), role: "user", content: "So, are we still going to Manali this weekend?" },
      { id: nanoid(), role: "assistant", content: "Yes! I already booked the hotel. It's near the river, looks amazing." },
      { id: nanoid(), role: "user", content: "Nice! What about transport, should we rent a car or go by bus?" },
      { id: nanoid(), role: "assistant", content: "I think renting a car will be more flexible. Plus, we can stop on the way for photos." },
      { id: nanoid(), role: "user", content: "Agreed. Let's leave early Saturday morning." },
      { id: nanoid(), role: "assistant", content: "Done. I'll share the itinerary in the group chat tonight." },
    ],
  },
  {
    id: nanoid(),
    title: "AI App Feature Brainstorm",
    messages: [
      { id: nanoid(), role: "user", content: "I was thinking, our AI app should support PDF uploads too." },
      { id: nanoid(), role: "assistant", content: "Good idea. Many people want summaries of documents, not just plain text." },
      { id: nanoid(), role: "user", content: "Exactly, and we can even extract key points for students." },
      { id: nanoid(), role: "assistant", content: "That would make it super useful. Let's create a backlog item for this." },
      { id: nanoid(), role: "user", content: "Cool, I'll draft the feature requirements today." },
      { id: nanoid(), role: "assistant", content: "Awesome, let's review tomorrow during standup." },
    ],
  },
  {
    id: nanoid(),
    title: "Daily Fitness Check-in",
    messages: [
      { id: nanoid(), role: "user", content: "I ran 3 km today morning, felt great!" },
      { id: nanoid(), role: "assistant", content: "Nice! I did 20 minutes of strength training. My arms are sore." },
      { id: nanoid(), role: "user", content: "Haha, that's a good sore. Planning to do yoga in the evening." },
      { id: nanoid(), role: "assistant", content: "Good balance. I'll probably just take a walk tonight." },
      { id: nanoid(), role: "user", content: "Let's try a HIIT workout together this weekend." },
    ],
  },
  {
    id: nanoid(),
    title: "Customer Support - App Crash",
    messages: [
      { id: nanoid(), role: "user", content: "Hi, my app keeps crashing when I try to upload a photo." },
      { id: nanoid(), role: "assistant", content: "I'm sorry to hear that. Could you let me know what device and OS you're using?" },
      { id: nanoid(), role: "user", content: "I'm on Android 13, Samsung Galaxy S21." },
      { id: nanoid(), role: "assistant", content: "Thanks. We recently fixed a similar issue. Can you update to the latest version 2.3.1?" },
      { id: nanoid(), role: "user", content: "Okay, I'll update and try again." },
      { id: nanoid(), role: "assistant", content: "Great. Let me know if the problem persists after updating." },
      { id: nanoid(), role: "user", content: "Updated and it's working fine now. Thanks a lot!" },
    ],
  },
];
