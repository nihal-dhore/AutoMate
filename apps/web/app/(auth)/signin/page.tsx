"use client";
import SigninForm from "@/components/signin-form";
import { signinWithGoogleAction } from "app/actions/signinAction";
import { useToast } from "@repo/ui/components/use-toast";

export default function Signin() {
  const { toast } = useToast();
  async function signInHandler() {
    try {
      const res = await signinWithGoogleAction();
      toast({
        title: "Signed in with Google",
      });
    } catch (error) {
      toast({
        title: "Error while signing in",
      });
    }
  }
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <SigninForm />
      <button className="px-8 py-2 border rounded-lg" onClick={signInHandler}>
        Signin with Google
      </button>
    </div>
  );
}
