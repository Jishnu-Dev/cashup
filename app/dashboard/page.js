import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Image from "next/image";

export default function Page() {
  return (

    <section className='grid grid-flow-row gap-12'>
      <Greenting />
      <Grid />
  </section>
     )
}

const Greenting = () => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-900 flex justify-between p-6">
      <div className="flex flex-col gap-8">
        <Clock />
        <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
        <h1 className="text-4xl font-bold text-white">Welcome back Admin!</h1>
        <p className="text-white/80">Hello there, Welcome back to the dashboard. <br />Take a look at today's overview.</p>
        </div>
        <button className='bg-transparent hover:bg-white hover:text-black text-white border border-white p-3 rounded-2xl'>
          See Analytics
        </button>
        </div>
      </div>
      <Image
        src="/images/greetings-hero.svg"
        alt="Welcome"
        width={250}
        height={250}
        />
    </div>
  )
}

const Clock = () => {
  const presentDateTime = new Date().toLocaleString()
  return (
    <div className="flex gap-2 items-center">
      <CalendarTodayIcon className='text-white' />
      <p className="text-white">{presentDateTime}</p>
  </div>
)
}

const Grid = () => {
  return (
    <div className='grid grid-cols-2 gap-8'>
      {
        [...Array(5)].map((_, i)=>(
          <div className='rounded-2xl h-44 w-full bg-white border glass'>
            
            </div>
        ))
      }
    </div>
  )
}
