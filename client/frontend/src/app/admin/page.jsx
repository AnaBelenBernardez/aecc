"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSchema } from "@/lib/validations/forms";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { loginService } from "../../service";
import { useRouter } from "next/navigation";
import { useLoginStore } from "../../store";

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const setToken = useLoginStore((state) => state.setToken);
  const setId = useLoginStore((state) => state.setId);

  async function onSubmit(data) {
    const userData = await loginService(data.username, data.password);
    if (userData.status === "No autorizado") {
      toast({
        variant: "destructive",
        title: userData.status,
        description: userData.message,
        className: "bg-secondRed text-white ",
      });
      return;
    }
    setToken(userData.data.token);
    setId(userData.data.info.id);
    router.push("/admin/dashboard");
  }

  return (
    <main>
      <div className="flex flex-col justify-center items-center mb-9">
        <Form {...form}>
          <Image
            src="/logos/CC_Logo_transicion_color_pos.rgb.svg"
            alt="logo"
            width={150}
            height={150}
            className="mt-10 mb-6"
          />
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" bg-secondLightGray rounded-xl flex flex-col justify-center items-center gap-5 w-[400px] h-[400px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Introduzca su usuario"
                      {...field}
                      className="border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0  focus:border-b-green-600 w-72 placeholder:italic placeholder:text-slate-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-secondRed" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Introduzca su contraseña"
                      {...field}
                      className="border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 w-72 placeholder:italic placeholder:text-slate-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-secondRed" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold sm:px-16 px-10 sm:py-4 py-2 mt-5 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
      <Toaster />
    </main>
  );
};

export default LoginPage;
