import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Bot, Copy, Plus, SendHorizonal } from 'lucide-react'
import { useChatStore } from '@/store'
import { Button } from './ui/button';
import { toast } from 'sonner';


 const randomReplies = [
  "That’s interesting! Can you tell me a little more about what you mean? I want to make sure I fully understand before giving you a detailed response.",
  "I can definitely help you with that. Based on what you said, there are a few directions we could explore together. Which one do you want to start with?",
  "Could you clarify a bit? For example, do you mean this in a technical sense, or more like a general overview? That way, I can tailor the response better.",
  "Great point! Let’s dive deeper into that idea. I think if we break it down step by step, we can get a clearer picture and maybe even find some unexpected insights.",
  "Hmm, that’s an interesting thought. Let me think this through carefully… okay, here’s one possible perspective that might help shed some light on it.",
  "Here’s what I found on that topic. There are multiple aspects to consider, and I think it’s worth looking at both the benefits and the challenges before making a decision.",
  "That sounds exciting! I can imagine a few scenarios where this could be really useful, and I’d love to walk you through them so we can expand on the idea.",
  "Absolutely, I agree with you. It seems like you’ve noticed something important, and building on that could lead us to a stronger solution or a more refined explanation.",
  "I’m not completely sure yet, but let’s explore this together. Sometimes the best answers come from asking the right follow-up questions, so let’s try that approach.",
  "Good question! Let’s figure it out step by step. I’ll share my thoughts, and then we can see where it leads — it might even open up some new ideas along the way."
];

type ModalProps = {
  children: React.ReactNode;
  isPageOpen: boolean;
  setOpenModal: (open: boolean) => void;
  title: string;
  description: string;
};

export const Modal = ({
  children,
  isPageOpen,
  setOpenModal,
  title,
  description,
}: ModalProps) => {
  return (
    <div onClick={()=>setOpenModal(false)} className={`fixed inset-0 z-30 size-full ${isPageOpen ? " visible" : "invisible"}  bg-stone-900/50  flex justify-center items-center`}>
      <main onClick={e=>e.stopPropagation()} className={`w-[40%] h-[60%] ${isPageOpen ? "scale-100" : "scale-0"} overflow-y-auto transition-all duration-300 bg-stone-800 dark:bg-stone-700  text-white dark:text-black rounded-md p-4 text-center flex flex-col justify-center items-center gap-2`}>
        <h2 className="text-2xl dark:text-white">{title}</h2>
        <p className="text-sm opacity-70 mb-6 dark:text-white">{description}</p>
        {children}
      </main>
    </div>
  );
};

const Chat = () => {
  const chats = useChatStore((state) => state.chats)
  const addChat = useChatStore((state) => state.addChat)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const addMessage = useChatStore((state) => state.addMessage)
  const activeChat = chats.find((chat) => chat.id === activeChatId)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const [inputValue, setInputValue] = useState('')
  const [AIThinking, setAIThinking] = useState(false)
  const [openModal, setOpenModal] = useState(false)
console.log(openModal)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeChat?.messages])

  
  const handleSend = () => {
    if (!inputValue.trim()) return
    if(!activeChat){
      setOpenModal(true)
      return
    }

    // Add user message
    addMessage(activeChat?.id, "user", inputValue )

    // Add assistant random reply
    setAIThinking(true)
    const randomReply = randomReplies[Math.floor(Math.random() * randomReplies.length)]
    setTimeout(() => {
      setAIThinking(false)
      addMessage(activeChat?.id, "assistant", randomReply )
    }, 5000) // small delay for realism

    setInputValue("") // clear input
  }

  // Allow Enter key to send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

 const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Text copied to your Clipboard')
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};


  return (
    <section className="relative w-full sm:w-[80%] lg:w-3xl mx-auto flex flex-col flex-1 overflow-hidden pb-2">

      {activeChat ? (
        // 👇 This grows and scrolls properly
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {activeChat.messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 group flex items-center gap-2  ${
                msg.role === 'user' &&
                'max-w-[60%] w-fit bg-stone-200 dark:bg-stone-700 ml-auto rounded-4xl rounded-tr-lg'
              }`}
            >
              {msg.role === 'assistant' && (
                <Bot className="p-2 min-w-10 size-10 bg-stone-200 dark:bg-stone-700 rounded-full" />
              )}
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <Copy className='group-hover:visible invisible transition-all cursor-pointer min-w-8 size-8 p-2 rounded-md hover:bg-stone-300 hover:dark:bg-stone-700' onClick={()=>copyToClipboard(msg.content)} />
            </div>
          ))}
          {AIThinking && (<h2 className='p-4 flex gap-2 items-center font-semibold '><Bot className="p-2 animate-pulse size-10 bg-stone-200 dark:bg-stone-500 rounded-full"/>AI is thinking...</h2>)}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-3 text-4xl font-medium items-center justify-center p-4">
          <h2>Hello User,</h2>
          <p className="opacity-60 text-center text-lg">Select a chat or start a new one to get started.</p>
        </div>
      )}

      {/* Input Bar */}
      <div className="sm:w-full w-[90%] mx-auto sticky bottom-0 left-0 p-2 sm:p-4 flex items-center sm:gap-4 border rounded-2xl ">
        <Plus className="size-10 p-2 rounded-full cursor-pointer hover:bg-black/10 transition-all" />
        <Input
          value={inputValue}
          autoFocus
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="placeholder:font-medium w-full bg-transparent! border-none focus:ring-0 shadow-none focus-visible:ring-0"
          placeholder="Ask Gemini"
        />
        <SendHorizonal onClick={handleSend} className="size-10 p-2 rounded-full cursor-pointer hover:bg-black/10 transition-all"/>
      </div>

      <p className="opacity-60 text-xs text-center mt-1">
        Gemini can make mistakes, so double check it
      </p>
     {openModal && <Modal setOpenModal={setOpenModal} isPageOpen={openModal} title='Create New Chat' description='Get started with a new chat session' >
        <Button onClick={()=>{
          addChat('New Chat')
          toast.success('New Chat Created, please resend your message')
          setOpenModal(false)
        }} className="mt-4 cursor-pointer text-black dark:text-white px-6 py-2 rounded-md" variant={'outline'}>Create</Button>
      </Modal>}
    </section>
  )
}

export default Chat
