import { Header } from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1b2a]">
      <Header />
      {children}
    </div>
  );
}
