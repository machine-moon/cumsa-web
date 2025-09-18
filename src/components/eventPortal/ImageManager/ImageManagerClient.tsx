"use client";
import React, { useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EventPreview } from "../EventPreview";

const ACCEPT = "image/png,image/jpeg,image/jpg,image/webp,image/gif";

export type ImageInfo = {
  url: string;
  name: string;
  size: number;
  mtime: number;
};

export function ImageManagerClient({
  images,
  uploadAction,
  deleteAction,
  renameAction,
  usageAction,
}: {
  images: ImageInfo[];
  uploadAction: (formData: FormData) => Promise<boolean>;
  deleteAction: (formData: FormData) => Promise<boolean>;
  renameAction: (formData: FormData) => Promise<boolean>;
  usageAction: (formData: FormData) => Promise<number>;
}) {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<ImageInfo | null>(null);
  const [style, setStyle] = useState<"cover" | "contain" | "fill" | "scale-down" | "none">("cover");

  const [sort, setSort] = useState<"name" | "sizeAsc" | "sizeDesc" | "dateNew" | "dateOld">("name");
  const [timeRange, setTimeRange] = useState<"any" | "7d" | "30d" | "365d">("any");
  const [page, setPage] = useState(1);
  const pageSize = 24;

  const [busy, setBusy] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const fileRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const now = Date.now();
  const timeCutoff = useMemo(() => {
    if (timeRange === "7d") return now - 7 * 24 * 60 * 60 * 1000;
    if (timeRange === "30d") return now - 30 * 24 * 60 * 60 * 1000;
    if (timeRange === "365d") return now - 365 * 24 * 60 * 60 * 1000;
    return 0;
  }, [timeRange, now]);

  const filteredSorted = useMemo(() => {
    const q = filter.trim().toLowerCase();
    let list = images.slice();

    if (q) list = list.filter((i) => i.name.toLowerCase().includes(q));

    if (timeRange !== "any") list = list.filter((i) => i.mtime >= timeCutoff);

    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "sizeAsc") list.sort((a, b) => a.size - b.size);
    if (sort === "sizeDesc") list.sort((a, b) => b.size - a.size);
    if (sort === "dateNew") list.sort((a, b) => b.mtime - a.mtime);
    if (sort === "dateOld") list.sort((a, b) => a.mtime - b.mtime);

    return list;
  }, [images, filter, sort, timeRange, timeCutoff]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const items = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page]);

  function extOf(n: string) {
    const i = n.lastIndexOf(".");
    return i >= 0 ? n.slice(i) : "";
  }

  function formatSize(n: number) {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  }

  const [message, setMessage] = useState<string>("");

  function notify(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  }

  async function handleUploadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fileRef.current?.files?.[0]) return;
    const file = fileRef.current.files[0];
    const ext = extOf(file.name).toLowerCase();
    const base = (nameRef.current?.value || "").trim();
    if (!base) return;
    const saveAs = `${base}${ext}`;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("saveAs", saveAs);
      const ok = await uploadAction(fd);
      if (!ok) {
        notify("Upload failed. File may already exist or is invalid.");
        return;
      }
      setTimeout(() => {
        startTransition(() => router.refresh());
      }, 400);
      setFilter("");
      setSelected(null);
      if (fileRef.current) fileRef.current.value = "";
      if (nameRef.current) nameRef.current.value = "";
      notify("Upload successful.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(name: string) {
    const url = `/api/event-images/${name}`;
    const fdCheck = new FormData();
    fdCheck.append("url", url);
    const used = await usageAction(fdCheck);
    if (used > 0) {
      notify(`Cannot delete. In use by ${used} event(s).`);
      return;
    }
    if (!confirm(`Delete ${name}?`)) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("name", name);
      const ok = await deleteAction(fd);
      if (!ok) {
        notify("Delete failed. File may not exist or is in use.");
        return;
      }
      startTransition(() => router.refresh());
      if (selected?.name === name) setSelected(null);
      notify("Delete successful.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRename(oldName: string) {
    const i = oldName.lastIndexOf(".");
    const oldBase = i >= 0 ? oldName.slice(0, i) : oldName;
    const ext = i >= 0 ? oldName.slice(i) : "";
    const newBase = prompt("New name (without extension)", oldBase)?.trim();
    if (!newBase) return;
    const newName = `${newBase}${ext}`;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("oldName", oldName);
      fd.append("newName", newName);
      const ok = await renameAction(fd);
      if (!ok) {
        notify("Rename failed. File may already exist or extension mismatch.");
        return;
      }
      startTransition(() => router.refresh());
      if (selected?.name === oldName)
        setSelected({ ...selected, name: newName, url: `/api/event-images/${newName}` });
      notify("Rename successful.");
    } finally {
      setBusy(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const n = f.name.replace(/\.[^.]+$/, "");
    if (nameRef.current) nameRef.current.value = n;
    const url = URL.createObjectURL(f);
    setSelected({ url, name: f.name, size: f.size, mtime: Date.now() });
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
          <span>{message}</span>
          <button
            onClick={() => setMessage("")}
            className="ml-2 text-xs px-2 py-1 bg-white/20 rounded"
          >
            Dismiss
          </button>
        </div>
      )}
      <section className="border rounded-lg p-4 bg-white/70">
        <h3 className="font-semibold mb-3">Upload</h3>
        <form onSubmit={handleUploadSubmit} className="space-y-3">
          <label
            htmlFor="image-upload"
            className="block w-full border-2 border-gray-200 rounded-lg px-3 py-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            style={{ textAlign: "center" }}
          >
            <span className="text-[var(--navy)]/80">Click to upload image</span>
            <input
              id="image-upload"
              type="file"
              accept={ACCEPT}
              onChange={onFileChange}
              ref={fileRef}
              required
              className="hidden"
            />
          </label>
          {selected && (
            <input
              placeholder="Save name (without extension)"
              ref={nameRef}
              required
              defaultValue={selected.name.replace(/\.[^.]+$/, "")}
              className="block w-full border-2 border-gray-200 rounded-lg px-3 py-2"
            />
          )}
          <button
            disabled={busy || isPending}
            className="btn-cozy btn-primary w-full"
            type="submit"
          >
            {busy || isPending ? "Working..." : "Upload"}
          </button>
          <p className="text-[10px] text-[var(--navy)]/60">
            Existing file names are not overwritten.
          </p>
        </form>
      </section>

      <section className="border rounded-lg p-4 bg-white/70">
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <h3 className="font-semibold">Preview</h3>
          <label className="text-xs text-[var(--navy)]/80 flex items-center gap-2">
            <span>image style</span>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as typeof style)}
              className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-xs"
              title="Image style"
            >
              <option value="cover">cover</option>
              <option value="contain">contain</option>
              <option value="fill">fill</option>
              <option value="scale-down">scale-down</option>
              <option value="none">none</option>
            </select>
          </label>
        </div>
        {selected ? (
          <div className="space-y-3">
            <div className="relative aspect-[4/3] border rounded-lg overflow-hidden">
              <Image src={selected.url} alt={selected.name} fill className="object-contain" />
            </div>
            <div className="text-xs text-[var(--navy)]/70 truncate">{selected.name}</div>
            <a href={selected.url} target="_blank" className="btn-cozy btn-outline w-full">
              Open full size
            </a>
            <div>
              <span className="text-sm font-medium text-[var(--navy)]">Sample Event</span>
              <div className="mt-2">
                <EventPreview
                  event={{
                    title: "Sample Event",
                    date: "2025-01-01",
                    location: "Sample Location",
                    image: selected.url,
                    imageStyle: style,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-[var(--navy)]/70">Select an image to preview</div>
        )}
      </section>

      <section className="border rounded-lg p-4 bg-white/70">
        <h3 className="font-semibold mb-3">Manage Images</h3>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            placeholder="Search by name"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-auto flex-1 border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-[var(--blue)] focus:outline-none"
          />
          <select
            value={timeRange}
            onChange={(e) => {
              setTimeRange(e.target.value as "any" | "7d" | "30d" | "365d");
              setPage(1);
            }}
            className="border-2 border-gray-200 rounded-lg px-3 py-2"
            title="Time range"
          >
            <option value="any">any time</option>
            <option value="7d">last 7 days</option>
            <option value="30d">last 30 days</option>
            <option value="365d">last year</option>
          </select>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as "name" | "sizeAsc" | "sizeDesc" | "dateNew" | "dateOld");
              setPage(1);
            }}
            className="border-2 border-gray-200 rounded-lg px-3 py-2"
            title="Sort"
          >
            <option value="name">name</option>
            <option value="sizeAsc">size ↑</option>
            <option value="sizeDesc">size ↓</option>
            <option value="dateNew">date (newest)</option>
            <option value="dateOld">date (oldest)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((img) => (
            <div
              key={img.name}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(img)}
              className={`group relative border rounded-lg overflow-hidden cursor-pointer ${selected?.name === img.name ? "ring-2 ring-[var(--blue)]" : ""}`}
            >
              <div className="relative aspect-[4/3]">
                <Image src={img.url} alt={img.name} fill className="object-cover" />
              </div>
              <div className="p-2 text-[10px] flex items-center justify-between gap-2">
                <span className="truncate" title={img.name}>
                  {img.name}
                </span>
                <span className="shrink-0 text-[var(--navy)]/60">{formatSize(img.size)}</span>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRename(img.name);
                  }}
                  className="px-2 py-1 bg-white/80 rounded text-[var(--navy)] border"
                >
                  Rename
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(img.name);
                  }}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-[var(--navy)]/70 mt-4">
          <div>
            Page {page} of {totalPages} · {filteredSorted.length} image(s)
          </div>
          <div className="flex gap-2">
            <button
              className="btn-cozy btn-outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <button
              className="btn-cozy btn-outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
