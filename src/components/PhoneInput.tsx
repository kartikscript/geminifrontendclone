import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useRouter } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useChatStore } from "@/store";

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

type Country = {
  name: { common: string };
  idd: { root: string; suffixes: string[] };
  flags: { png: string; alt: string };
};

export default function PhoneInput() {


  const [countries, setCountries] = useState<Country[]>([]);
  const [otp, setOtp] = useState("");
  const [isVerifyPageOpen, setIsVerifyPageOpen] = useState(false)
  const router = useRouter()
  const systemOtp = "123456";

  const setIsAuthenticated = useChatStore((state)=>state.setAuth)
  // const [selectedCode, setSelectedCode] = useState("+91");

  const formSchema =  z.object({
    phone: z.string().min(10).max(10),
    dialCode: z.string().min(2)
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      dialCode: "+91-India"
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("Full Phone Number: ", values.dialCode.split('-')[0]+values.phone);
    toast.success(`For demo purpose your OTP is ${systemOtp}`, {duration: 4000});
    setIsVerifyPageOpen(true);
  }
  
  function submitOTP() {
    console.log(otp, 'tee',systemOtp);
    if(otp.length < 6){
      toast.error("Please enter a valid 6 digit OTP");
      return;
    }
    if(otp !== systemOtp){
      toast.error("Invalid OTP, Please try again");
      return;
    }
    toast.success("OTP Verified Successfully!");
    router.navigate({to: '/'});
    setIsAuthenticated(true)
  }

  const getPhoneDials = async () =>{
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags");
    const data = await res.json();
    const filtered = data.filter(
      (c: Country) => c.idd && c.idd.root && c.idd.suffixes.length
    );
    
    setCountries(filtered.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common)));
  }
  useEffect(() => {
    getPhoneDials()
  }, []);

  return (
    <section className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="dialCode"
              render={({ field }) => (
                <FormItem className="w-fit">
                  <FormControl>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-fit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="w-fit">
                        <SelectGroup>
                          <SelectLabel>All Country Dial Codes</SelectLabel>
                          {
                            countries.map((c, i) =>(
                                  <SelectItem key={i} value={c.idd.root + c.idd.suffixes[0]+'-'+c.name.common}>
                                    <img loading="lazy" src={c.flags.png} alt={c.flags.alt} className="w-5 h-3 inline mr-1"/>
                                    {c.name.common}
                                    ({c.idd.root}
                                    {c.idd.suffixes[0]})  
                                  </SelectItem>
                              )
                            )
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="px-4 py-2 cursor-pointer bg-stone-800 text-white rounded-md">Submit</Button>
        </form>
      </Form>  
        <div className={`fixed inset-0 size-full ${isVerifyPageOpen ?" visible":"invisible"}  bg-stone-900 z-30 sm:bg-stone-900/50 flex justify-center items-center`}>
            <main className={`sm:w-[40%] sm:h-[60%] ${isVerifyPageOpen ? "scale-100":"scale-0"} transition-all duration-300 bg-stone-800 text-white rounded-md p-4 text-center flex flex-col justify-center items-center gap-2`}>
              <h2 className="text-2xl">Please Enter Your One Time Password</h2>
              <p className="text-sm opacity-70 mb-6">We have sent you an otp to your registered mobile number</p>
              <InputOTP autoFocus value={otp} onChange={(val)=>setOtp(val)} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button onClick={submitOTP} className="mt-4 cursor-pointer dark:text-white text-black px-6" variant={'outline'}>Verify</Button>
            </main>
        </div>
      
    </section>
    // <div>

    //   <Input/>
    
    // </div>
  );
}
