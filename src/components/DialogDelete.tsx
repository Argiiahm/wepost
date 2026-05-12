import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type Props = {
  post: any;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  getMe: () => void;
};

const DialogDelete = ({
  post,
  isDialogOpen,
  setIsDialogOpen,
  getMe,
}: Props) => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${baseURL}/post/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed delete post");
        return;
      }

      getMe();
      toast.success("Post deleted successfully");
      setIsDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message);
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
        <DialogPanel className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
          <DialogTitle className="text-xl font-semibold text-white">
            Delete Post
          </DialogTitle>

          <p className="mt-2 text-sm text-zinc-400">
            Are you sure want to delete this post?
          </p>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogDelete;
