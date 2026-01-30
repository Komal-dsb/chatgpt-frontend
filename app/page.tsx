"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { chatItem } from "@/types/common";

export default function Page() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState();
  const [loading, setLoading] = useState(false);

  const [chatList, setChatList] = useState<chatItem[]>([]);
  const id = "RL2vTUvt9ZcULqXPbqaz7pskKySxsjwX";
 

  console.log(chatList);

  useEffect(() => {
     const userId = async () => {
    
    const user_id = await fetch(`http://localhost:5000/chats?userId=${id}`);
    const list = await user_id.json();
    const finalChatList = list?.value;
    setChatList(finalChatList);
  };

  userId()
  }, []);

  const router = useRouter();

  // const handleClick = async () => {
  //   const data = await fetch("http://localhost:5000/check");
  //   const res = await data.json();

  //   console.log("BACKEND DATA:", res);
  // };

  const question = async () => {
    setLoading(true);

    const data = await fetch(`http://localhost:5000/ai`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: message,
        userId : id
      }),
    });

    const res = await data.json();
    setLoading(false);
    setAnswer(res.value);
    console.log("@@@@@@@@", res);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar chatList={chatList} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <Button
            onClick={handleSignOut}
            className="bg-white text-black border-2 border-gray-200 hover:text-black hover:bg-white"
          >
            Logout
          </Button>
        </header>
        <div className="flex min-h-screen px-4 justify-center items-start pt-20  ">
          <div className="w-full max-w-4xl">
            <Label
              htmlFor="message"
              className="mb-2 text-center font-bold text-2xl py-6 block"
            >
              What can I help with?
            </Label>

            <div className="relative">
              {/* Textarea */}
              <Textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Anything"
                className="pr-14 resize-none"
                rows={6}
              />

              {/* Send Button */}
              <Button
                type="submit"
                size="icon"
                className="absolute bottom-3 right-3 rounded-full h-10 w-10"
                onClick={question}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-10 px-6">
              <h1>Your Answer</h1>
              {loading ? (
                <p>Loading......</p>
              ) : (
                <p className="text-xl italic">{answer}</p>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
