import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import Dashboard from './components/Dashboard/Dashboard';
import SongGridCard from './components/SongGrid/SongGridCard';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <main className="flex flex-row h-screen">
      {/* <h1 className={"font-poppins"}>Hello {session && <span>{session.user!.name}</span>}</h1> */}
      <Dashboard />
      <SongGridCard />
    </main>
  )
}
