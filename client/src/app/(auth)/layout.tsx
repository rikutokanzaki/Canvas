import "@/app/globals.css";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <div
      lang="ja"
      className="h-full antialiased"
    >
      <div className="min-h-full flex flex-col">{children}</div>
    </div>
  );
}
