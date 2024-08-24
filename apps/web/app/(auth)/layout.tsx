import Navbar from "@/app/(auth)/_components/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Navbar />
      {children}
    </div>
  );
}
