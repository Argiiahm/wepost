import React, { useState } from "react";
import toast from "react-hot-toast";
import * as v from "valibot";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

// props
type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  fetchPosts: () => void;
};

// type form post
type FormPost = {
  title: string;
  content: string;
};

// schema valibot
const schemaPost = v.object({
  title: v.pipe(v.string(), v.minLength(1, "title is required")),
  content: v.pipe(v.string(), v.minLength(1, "content is required")),
});

const DialogPost = ({ isDialogOpen, setIsDialogOpen, fetchPosts }: Props) => {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState<FormPost>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  // handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // validasi valibot
    const result = v.safeParse(schemaPost, form, {
      abortPipeEarly: true,
    });
    if (!result.success) {
      const errors = result.issues.map((issue) => issue.message);
      setError(errors);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${baseURL}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        const errors = data.errors
          ? Object.values(data.errors).flat()
          : [data.message || "Something went wrong"];

        setError(errors as string[]);
        toast.error("Failed create post");
        return;
      }
      fetchPosts();
      toast.success("Post created");
      setForm({
        title: "",
        content: "",
      });

      setError([]);
      setIsDialogOpen(false);
    } catch (err: any) {
      setError([err.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <DialogPanel className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
          <div className="mb-6">
            <DialogTitle className="text-xl font-semibold text-white">
              Create Post
            </DialogTitle>

            <Description className="mt-1 text-sm text-zinc-400">
              Share something with everyone.
            </Description>
            {error.length > 0 && (
              <div className="mt-4">
                {error.map((err, index) => (
                  <p key={index} className="text-red-700">
                    {err}
                  </p>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              placeholder="Post title"
              onChange={handleChange}
              className="w-full border-b border-zinc-700 bg-transparent pb-3 text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
            />

            <textarea
              placeholder="What's on your mind?"
              name="content"
              onChange={handleChange}
              className="min-h-[140px] w-full resize-none border-b border-zinc-700 bg-transparent pb-3 text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
              >
                {loading ? "wait.." : "Publish"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogPost;
