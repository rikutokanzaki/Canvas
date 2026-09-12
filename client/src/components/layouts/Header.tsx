import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-emerald-800 bg-emerald-900 text-white shadow-sm">
      <div className="m-auto w-11/12 h-full flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold tracking-wide hover:text-amber-200">
          Canvas
        </Link>
        <nav aria-label="メインナビゲーション" className="flex items-center gap-1 text-sm font-medium sm:gap-3">
          <Link href="/" className="rounded-md px-3 py-2 hover:bg-emerald-800 hover:text-amber-100">
            ホーム
          </Link>
          <Link href="/#albums" className="rounded-md px-3 py-2 hover:bg-emerald-800 hover:text-amber-100">
            アルバム
          </Link>
          <Link href="/upload" className="rounded-md bg-amber-300 px-3 py-2 text-emerald-950 hover:bg-amber-200">
            投稿する
          </Link>
          <Link href="/auth" className="rounded-md px-3 py-2 hover:bg-emerald-800 hover:text-amber-100">
            ログアウト
          </Link>
        </nav>
      </div>
    </header>
  );
}
