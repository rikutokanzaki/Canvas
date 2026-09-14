import "@/app/globals.css";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <div
      lang="ja"
      className="h-full antialiased"
    >
      <div className="flex min-h-full flex-col">{children}</div>
    </div>
  );
}
