"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import UserCard from '@/components/Card';  // Import the UserCard component

function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/userprof/getusers');
      
      if (res.status === 201) {
        toast.success("Users fetched successfully");
        setUsers(res.data); 
      } else {
        toast.error("Failed to fetch users: Unexpected response status");
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to call getUsers on component mount
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black justify-center items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-white w-full p-4">
        {loading ? (
          // Show spinner while loading
          <div className="flex justify-center items-center min-h-screen">
            <LoadingSpinner />
          </div>
        ) : (
          
          // Display user cards once data is fetched
          <div  className="grid justify-center grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.length > 0 ? (
              users.map((user) => (
                <UserCard  key={user.id} name={user.name} email={user.email} id={user.id} />
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
