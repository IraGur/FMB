"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "./context/userContext";

export default function Home() {
   const router = useRouter();
   const [formData, setFormData] = useState({
      email: "eva@yahoo.com",
      password: "123456",
   });
   const [error, setError] = useState();
   const { setUser } = useContext(UserContext);

   const onInputChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => {
         return { ...prev, ...{ [name]: value } };
      });
   };

   // Async function for handling login
   const login = async () => {
      setError(); // Clear previous errors
      const res = await fetch("/api/users", {
         method: "POST",
         body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === 200) {
         const user = data.user;
         setUser(user);
         localStorage.setItem("user", JSON.stringify(user));
         if (user.isHR) {
            router.push("/dashboard");
         } else {
            router.push("/calendar");
         }
      } else {
         setError(data.error);
      }
   };

   return (
      <div className="min-h-full flex items-center justify-center mt-32 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md w-full space-y-8">
            <div>
               <h2 className="mt-6 text-center text-3xl font-extrabold text-grey-900">
                  Sign in to your account
               </h2>
            </div>
            <form className="bg-white p-8 border-green shadow-md rounded-md">
               <label className="block mb-4">
                  Email:
                  <input
                     onChange={onInputChange}
                     type="email"
                     name="email"
                     className="border border-gray-300 p-2 w-full rounded-md"
                     required
                     value={formData.email}
                  />
               </label>
               <label className="block mb-4">
                  Password:
                  <input
                     onChange={onInputChange}
                     type="password"
                     name="password"
                     className="border border-gray-300 p-2 w-full rounded-md"
                     required
                     value={formData.password}
                  />
               </label>
               <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded-md w-full"
                  onClick={login}
               >
                  Log In
               </button>
               <div className="text-red-600 text-center p-2">{error}</div>
            </form>
         </div>
      </div>
   );
}
