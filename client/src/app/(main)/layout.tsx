import "@/app/globals.css";
import { Header } from "@/components/layouts/Header";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <div
      lang="ja"
      className="h-full antialiased"
    >
      <Header />
      <div className="min-h-full flex flex-col">{children}</div>
    </div>
  );
}
