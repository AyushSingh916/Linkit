"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link"; // Import Link for client-side navigation
import Popup from "@/components/Popup";

function Profile() {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const params = useParams();
  const collectionId = params.id ? Number(params.id) : null;
  const [hide, setHide] = useState(true);
  const [collectionName, setCollectionName] = useState<string>('');
  const [links, setLinks] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [timeoutReached, setTimeoutReached] = useState<boolean>(false); // Track spinner timeout
  const [bool,setBool]=useState(false);
  useEffect(() => {
    const fetchLinks = async () => {
      if (userId) {
        try {
          const rescol = await axios.post("/api/userprof/getlinks", {
            collectionId,
          });
          console.log(rescol.data.res); 
          setLinks(rescol.data.res || []); 
        } catch (error) {
          console.error("Error fetching links:", error);
          toast.error("Failed to fetch links");
        }
      }
    };

    const getCollectionName = async () => {
      try {
        const res = await axios.post("/api/userprof/getcname", {
          id: collectionId,
        });
        setCollectionName(res.data.ref);
      } catch (error) {
        console.error("Error fetching collection name:", error);
        toast.error("Failed to fetch collection name");
      } finally {
        setLoading(false); 
      }
    };

    // Show spinner for 5 seconds and then check for data
    setTimeout(() => {
      setTimeoutReached(true);
    }, 2000);

    getCollectionName(); 
    fetchLinks();   
  }, [userId]);

  const handleClick = async () => {
    setBool(true)
    setHide(false);
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center bg-black px-4 lg:px-24 xl:px-48 relative">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Button positioned in the top-left corner */}


      {/* Home Button positioned in the top-right corner */}
      


      <div className="text-4xl sm:text-5xl flex flex-col md:flex-row md:text-6xl lg:text-7xl items-center text-center md:text-left">
        <span className="text-custom-yellow">{collectionName}</span>
      </div>
      <div className="text-white font-serif text-center md:text-left">
        Here is the list of links
      </div>
      <div className="flex flex-col gap-3 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-col gap-4">
          {/* Show loading spinner for 5 seconds, then show links or "No data found" */}
          {loading || !timeoutReached ? (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          ) : links.length > 0 ? (
            links.map((e: any) => (
              <div
                className="text-custom-yellow text-sm lg:text-xl p-3 md:p-4 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center justify-between"
                key={e.id}
              >
                <span onClick={()=>{
                   window.location.href = e.reflink;
                }} className="flex-grow text-center cursor-pointer">{e.reftitle}</span>
              </div>
            ))
          ) : (
            <div className="text-white text-center">Oops! No data found.</div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            onClick={handleClick}
            className="bg-custom-yellow rounded-md h-10 p-2 w-full sm:w-full sm:px-6"
            disabled={!hide}
          >
            {hide ? "Add Links" : <LoadingSpinner />}
          </button>
        </div>
      </div>
      <Popup trigger={bool} setTrigger={setBool}></Popup>
      <div className="flex justify-center items-center">
  <Link href="/pages/console">
    <button className="bg-custom-yellow rounded-md h-10 p-2">
      Go to Collections
    </button>
  </Link>
</div>
    </div>
  );
}

export default Profile;
