import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

function MemModal({ isOpen, onClose, onSubmit, initialData }) {
  const modalRef = useRef(null);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { title: "", content: "", isPublic: false },
  });


  // Handle opening and closing the modal using ref
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  // Reset form when modal opens with initialData
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setValue("isPublic", initialData.isPublic || false); // Ensure checkbox updates correctly
    } else {
      reset({ title: "", content: "", isPublic: false });
    }
  }, [initialData, reset, setValue]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box bg-base-200">
        <form method="dialog" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
          <h3 className="font-bold text-lg">{initialData ? "Edit Mem" : "Create Mem"}</h3>

          <label className="fieldset-label">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            {...register("title", { required: true })}
          />

          <label className="fieldset-label">Content</label>
          <textarea
            placeholder="Content"
            className="textarea textarea-bordered w-full"
            {...register("content", { required: true })}
          />

          <label className="fieldset-label">Make Public (Anyone with the link can view it)</label>
          <input
            type="checkbox"
            className="toggle"
            {...register("isPublic")}
          />

          <button type="submit" className="btn bg-amber-100 text-black">{initialData ? "Update" : "Create"}</button>
        </form>
      </div>
    </dialog>
  );
}

export default MemModal;
