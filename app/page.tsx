'use client'
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

export default function Page() {

    const handleClick    = async() => {
       
      const data = await fetch("http://localhost:5000/check")
      const res = await data.json();
      
        console.log("BACKEND DATA:", res);
      };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
       <div className="flex min-h-screen px-4 justify-center items-start pt-20  ">
      <div className="w-full max-w-4xl">
        <Label htmlFor="message" className="mb-2 text-center font-bold text-2xl py-6 block">
         What can I help with?
        </Label>

        <div className="relative">
          {/* Textarea */}
          <Textarea
            id="message"
            placeholder="Ask Anything"
            className="pr-14 resize-none"
            rows={6}
          />

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            className="absolute bottom-3 right-3 rounded-full h-10 w-10"
            onClick={handleClick}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
      </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
