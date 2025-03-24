import { useState, useEffect } from 'react'
import Mem from '../components/Mem.jsx'
import MemModal from '../components/MemModal.jsx'
import { createMem, updateMem, deleteMem, getMyMems } from '../services/memService.js'

function Mems() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingMem, setEditingMem] = useState(null);
  const [mems, setMems] = useState([]); // Store mems
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  useEffect(() => {
    async function fetchMems() {
      try {
        const data = await getMyMems();
        setMems(data);
      } catch (error) {
        console.error("Error fetching mems:", error);
      }
    }
    fetchMems();
  }, []);

  // Open modal for creating a new mem
  const handleOpenCreate = () => {
    setEditingMem(null);
    setModalOpen(true);
  };

  // Open modal for editing a mem
  const handleOpenEdit = (mem) => {
    setEditingMem(mem);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMem(id);
      setMems((prevMems) => prevMems.filter((mem) => mem._id !== id));
      // console.log("Mem Deleted:", id);
    } catch (error) {
      console.error("Error deleting mem:", error);
    }
  };

  const handleSubmit = async (memData) => {
    try {
      if (editingMem) {
        const updatedMem = await updateMem(editingMem._id, memData);
        setMems((prevMems) => prevMems.map((mem) => (mem._id === editingMem._id ? updatedMem : mem)));
        // console.log("Mem Updated:", updatedMem);
      } else {
        const newMem = await createMem(memData);
        setMems((prevMems) => [newMem, ...prevMems]);
        // console.log("Mem Created:", newMem);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving mem:", error);
    }
  };

  const filteredMems = mems.filter((mem) =>
    mem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mem.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='min-h-[85vh] h-auto flex flex-col justify-around items-center py-2 px-4'>
      <div className="flex items-center gap-4 p-4 bg-base-100 shadow-sm">
        {/* Search Field */}
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input
            type="search"
            className="grow"
            placeholder="Search Mems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        {/* Create Mem Button */}
        <button className="btn bg-amber-100 text-black" onClick={handleOpenCreate}>Create Mem</button>
      </div>
      {/* Display Mems */}
      <div className={`grid gap-4 md:m-4 ${filteredMems.length === 1 ? "grid-cols-1 place-items-center" : "grid-cols-1 sm:grid-cols-2"}`}>
      {filteredMems.length > 0 ? (
          filteredMems.map((mem) => (
            <Mem key={mem._id} mem={mem} onEdit={() => handleOpenEdit(mem)} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No mems found.</p>
        )}
      </div>
      {/* Modal Component */}
      <MemModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingMem}
      />
    </div>
  )
}

export default Mems