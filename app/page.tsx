import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import Dashboard from './components/Dashboard/Dashboard';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <main>
      {/* <h1 className={"font-poppins"}>Hello {session && <span>{session.user!.name}</span>}</h1> */}
      <Dashboard />
      {/* <button className={"bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"}>Complete Day!</button> */}
    </main>
  )
}
