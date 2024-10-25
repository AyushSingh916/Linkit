"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function Profile() {
  const { data: session, status } = useSession();
  //@ts-ignore
  const userId = session?.user.id;
  const [cname, setCname] = useState<string>("");
  const [hide, setHide] = useState(true);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      if (userId) {
        // Ensure userId is available before making the request
        try {
          const rescol = await axios.post("/api/userprof/getcollections", {
            num: userId,
          });
          setCollections(rescol.data); // Ensure this matches the response structure
        } catch (error) {
          console.error("Error fetching collections:", error);
          toast.error("Failed to fetch collections");
        }
      }
    };

    fetchCollections(); // Call the fetch function
  }, [userId]); // Run effect when userId changes

  const handleClick = async () => {
    setHide(false);
    try {
      const res = await axios.post("/api/userprof/createcollections", {
        ref: cname,
      });
      if (res.status === 201) {
        // Check if the response is successful
        toast.success("Collection added");
        setCname('')
        //@ts-ignore
        setCollections((prev) => [...prev, res.data]); // Update collections with new entry
      } else {
        toast.error("Error occurred while creating");
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      toast.error("Error occurred while creating");
    } finally {
      setHide(true); // Ensure hide is set to true regardless of success or failure
    }
  };
const handleUpdate=async()=>{

}
const handleDelete = async (id: string) => {
  try {
    const res = await axios.delete(`/api/userprof/deletecollections/${id}`);
    
    if (res.status === 200) {
      toast.success("Collection Deleted");
      //@ts-ignore
      setCollections((prev) => prev.filter((collection) => collection.id !== id)); // Update state to remove the deleted collection
    } else {
      toast.error("Error in Deleting Collection");
    }
  } catch (error) {
    console.error("Error in Deleting Collection:", error);
    toast.error("An error occurred while deleting the collection");
  }
};

const router= useRouter();
const handleCollectionClick=(id:Number)=>{
router.push(`/pages/console/${id}`)
}

  return (
    <div className="flex flex-col gap-4 px-6 min-h-screen justify-center items-center bg-black">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-5xl flex md:text-6xl lg:text-7xl">
        <span className="text-custom-yellow">Welcome,</span>
        <span className="text-white">{session?.user?.name}</span>
      </div>
      <div className="text-white font-serif">
        Here is the list of collections
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex flex-col gap-4">
          {collections.map((e: any) => (
  <div onClick={()=>{handleCollectionClick(e.id)}}
    className="text-custom-yellow text-sm cursor-pointer lg:text-2xl p-4 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center justify-between"
    key={e.id}
  >
    {/* Collection name */}
    <span className="flex-grow text-center">{e.ref}</span>
  </div>
))}

          </div>
        </div>

        <div className="flex flex-row gap-2">
          <button
            onClick={handleClick}
            className="bg-custom-yellow rounded-md h-10 p-2 w-full"
            disabled={!hide}
          >
            {hide ? "Add Collection" : "Adding..."}
          </button>
          <input
  className="text-custom-yellow rounded-xl px-4 bg-black border-2 w-full border-custom-yellow focus:outline-none placeholder:text-gray-400"
  placeholder="Collection name"
  type="text"
  value={cname}
  onChange={(e) => {
    setCname(e.target.value);
  }}
/>

      </div>
      </div>
      <div className="flex justify-center items-center">
  <Link href="/">
    <button className="bg-custom-yellow rounded-md h-10 p-2">
      Home
    </button>
  </Link>
</div>
    </div>
  );
}

export default Profile;
