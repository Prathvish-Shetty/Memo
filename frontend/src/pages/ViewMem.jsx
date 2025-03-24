import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMemFromLink } from "../services/memService.js";

function ViewMem() {
  const { id } = useParams();
  const [mem, setMem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMem() {
      try {
        const fetchedMem = await getMemFromLink(id);
        setMem(fetchedMem);
      } catch (error) {
        console.error("Error fetching shared mem:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMem();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!mem) return <p className="text-center">Mem not found.</p>;

  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="card bg-base-200 shadow-md p-4 flex flex-col gap-3 w-96">
        <h3 className="text-lg font-bold">{mem.title}</h3>
        <p className="h-auto">{mem.content}</p>
      </div>
    </div>
  );
}

export default ViewMem;