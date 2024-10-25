import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
function Popup(props) {
  const [reftitle,setReftitle]=useState('');
  const [reflink,setReflink]=useState('');
  const params=useParams();
  const collectionId=Number(params.id);

  const handleSubmit = async () => {
    if (!reftitle || !reflink) {
      toast.error('Both fields are required');
      return;
    }
    console.log('Sending data:', { reftitle, reflink, collectionId }); // Log request data
  
    try {
      const res = await axios.post("/api/userprof/createlinks", {
        reftitle,
        reflink,
        collectionId,
      });
  
      if (res.status === 201) {
        toast.success('Link added successfully');
        setReftitle('');
        setReflink('');
        props.updateLinks(res.data.res); // Call parent function to update link list
      } else {
        toast.error('Error occurred while creating');
      }
    } catch (error) {
      console.error('Error creating link:', error);
      toast.error('Error occurred while creating');
    } finally {
      props.setTrigger(false);  // Close the popup
    }
  };
  
  return props.trigger ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-yellow-400 p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-3xl text-black font-serif font-bold mb-6 ">Add Your link</h2>

        <div className="mb-4">
          <label className=" m-2 text-lg mb-2 font-mono font-extrabold justify-start items-start flex">Name:</label>
          <input
            type="text"
            value={reftitle}
            onChange={(e) => setReftitle(e.target.value)}
            placeholder="Enter name"
            className="w-full text-bold font-serif p-2 border border-gray-300 rounded-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-lg mb-2 font-mono font-extrabold justify-start items-start flex m-2">Link:</label>
          <input
            type="text"
            value={reflink}
            onChange={(e) => setReflink(e.target.value)}
            placeholder="Enter link"
            className="w-full text-bold font-serif p-2 border border-gray-300 rounded-full"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-custom-yellow rounded-lg text-black px-4 py-2  hover:bg-yellow-200"
          >
            Submit
          </button>

          <button
            onClick={() => props.setTrigger(false)}
            className="bg-custom-yellow rounded-lg text-black px-4 py-2  hover:bg-yellow-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Popup;
