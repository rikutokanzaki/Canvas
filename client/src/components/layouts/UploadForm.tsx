"use client";

import Image from "next/image";
import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from "react";

const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const UploadForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const selectFile = (selectedFile?: File) => {
    setSubmitted(false);
    if (!selectedFile) return;

    if (!acceptedImageTypes.includes(selectedFile.type)) {
      setError("JPEG、PNG、WebP、GIF形式の画像を選択してください。");
      return;
    }

    setError(null);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("投稿する画像を選択してください。");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    setSubmitted(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <main className="flex flex-1 justify-center px-5 py-10 sm:py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-xl border border-amber-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-emerald-800">POST MEMORY</p>
          <h1 className="text-3xl font-bold tracking-tight text-stone-800">思い出を投稿する</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">写真とひとことを添えて、みんなの思い出を残しましょう。</p>
        </div>

        <label className="mb-2 block text-sm font-semibold text-stone-700" htmlFor="image-upload">写真</label>
        <div
          onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative rounded-lg border-2 border-dashed p-5 text-center transition sm:p-8 ${isDragging ? "border-emerald-600 bg-emerald-50" : "border-amber-300 bg-amber-50/50"}`}
        >
          <input ref={inputRef} id="image-upload" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleChange} className="sr-only" />
          {previewUrl ? (
            <div className="mx-auto max-w-sm">
              <Image src={previewUrl} alt="preview-image" width={640} height={480} unoptimized className="max-h-72 w-full rounded-md object-contain" />
              <p className="mt-3 truncate text-sm font-medium text-stone-700">{file?.name}</p>
              <button type="button" onClick={clearFile} className="mt-2 text-sm font-medium text-emerald-800 underline underline-offset-4 hover:text-emerald-600">画像を変更する</button>
            </div>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-800" aria-hidden="true">↑</div>
              <p className="font-medium text-stone-700">ここに画像をドラッグ＆ドロップ</p>
              <p className="mt-1 text-sm text-stone-500">または</p>
              <button type="button" onClick={() => inputRef.current?.click()} className="mt-4 rounded-md bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">ファイルを選択</button>
              <p className="mt-3 text-xs text-stone-500">JPEG、PNG、WebP、GIFに対応</p>
            </>
          )}
        </div>
        {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-7">
          <label htmlFor="description" className="mb-2 block text-sm font-semibold text-stone-700">ひとこと <span className="font-normal text-stone-500">（任意）</span></label>
          <textarea id="description" name="description" rows={4} maxLength={280} placeholder="この写真の思い出を書いてください" className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none resize-none placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
        </div>

        <button type="submit" className="mt-8 w-full rounded-md bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">投稿する</button>
        {submitted && <p role="status" className="mt-4 rounded-md bg-emerald-50 p-3 text-center text-sm text-emerald-800">投稿の準備ができました。アップロード先のAPIを接続すると送信できます。</p>}
      </form>
    </main>
  );
};
