import { create } from "zustand";
import { nanoid } from "nanoid";
import { Chats } from "./constants";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  image:string | null
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

type ChatStore = {
  chats: Chat[];
  activeChatId: string | null;
  isAuthenticated : boolean
  // Actions
  setAuth :(val:boolean) => void
  setActiveChat: (id?: string) => void;
  addChat: (title: string) => void;
  removeChat: (id: string) => void;
  addMessage: (chatId: string , role: "user" | "assistant", content: string,image:string|null) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
  resetStore: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  chats: Chats as Chat[],
  activeChatId: null,
  isAuthenticated:false,

  setAuth:(val) =>{
    set(()=>({isAuthenticated:val}))
  },

  setActiveChat: (id) =>
    set(() => ({ activeChatId: id || null })),

  addChat: (title) =>
    set((state) => {
      const newChat: Chat = {
        id: nanoid(),
        title,
        messages: [],
      };
      // Chats.push(newChat); // also add to constants for sidebar display
      return {
        chats: [...state.chats, newChat],
        activeChatId: newChat.id, // auto-focus new chat
      };
    }),

  removeChat: (id) =>{
    set((state) => ({
      chats: state.chats.filter((c) => c.id !== id),
      activeChatId: state.activeChatId === id ? null : state.activeChatId,
    }))
    Chats.filter(c => c.id !== id)
  },

  addMessage: (chatId, role, content,image) =>{

    if(role === 'user'){
      set((state) => ({
        chats: state.chats.map((c) =>{
  
          return (
            c.id === chatId
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    { id: nanoid(), role, content,image },
                  ],
                }
              : c
          )
        }
        ),
      }))
    }
    if(role === 'assistant'){

      let i = 0;
      const messageId = nanoid();
    const interval = setInterval(() => {
      // setMessage((prev) => prev + content[i]);
      set((state) => ({
        chats: state.chats.map((c) =>{
          return (
            c.id === chatId
            ///this is tricky... if message exists, update it, else create new
              ? (
                  c.messages.some(m => m.id === messageId)
                  ? {
                    ...c, 
                    messages: c.messages.map(m => 
                      m.id === messageId 
                      ? { ...m, content: m.content + content[i], image }
                      : m
                    )
                  }
                  :
                {
                    ...c,
                    messages: [
                      ...c.messages,
                      { id: messageId, role, content: content[i],image },
                    ],
                })
              //this istricky
              : c
          )
        }
        ),
      }))
      i++;

      if (i === content.length) {
        clearInterval(interval); // stop when done
      }
    }, 25);

    }
  },

  deleteMessage: (chatId, messageId) =>
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: c.messages.filter((m) => m.id !== messageId),
            }
          : c
      ),
    })),

  resetStore: () => set(() => ({ chats: [], activeChatId: null })),
}));
