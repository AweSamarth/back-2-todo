import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { create } from "zustand";
import { hehe } from "~/utils/api";
import { useRouter } from "next/router";
import { persist, createJSONStorage } from 'zustand/middleware'
import { anotherRouter } from "~/server/api/routers/anotherrouter";



export const useUserStore = create(
  
  persist((set:any) => ({
  user: "abhi toh yeh hai",
  setUser: (e:any) => set(() => ({user:e})),
}),
{
  name: 'username-storage', // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
}
))

const Home: NextPage = () => {
  const hello = hehe.example.hello.useQuery({ text: "from tRPC" });
  const router = useRouter()
  const output = hehe.another.getAll.useQuery()
  // console.log(output.data)

  const user = useUserStore((state:any)=>state.user)
  const setUser = useUserStore((state:any)=>state.setUser)
  const authentistMutation = hehe.another.authentist.useMutation();

  const handleAuthentist = async () => {
    console.log("huh ji?")
    const input = user; // Replace 'exampleInput' with the actual input value you want to provide

    try {
      authentistMutation.mutate(input)
      // Handle the successful mutation, if needed
      console.log('Mutation successful');
      router.push("/")
        } catch (error) {
      // Handle any error that occurred during the mutation
      console.error(error);
    }
  };
  return (

    
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col text-white items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl justify-self-start border-2 mb-14 mt-4"> Pretty bad auth</h1>
        <div className="flex gap-4"><label htmlFor="name">Enter a unique username</label>
        <input value={user} onChange={(event)=>setUser(event.target.value)} id="name" type="text" className="outline-none rounded-sm text-black px-1"></input></div>
        
        <button onClick={()=>{
          console.log(output.data)
          handleAuthentist()

      
      }} className="bg-black px-4 py-3 rounded-sm mt-8" >Sign in with lmao</button>



      </main>
    </>
  );
};

export default Home;