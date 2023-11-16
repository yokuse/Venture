import type { NextPage } from 'next'
import Image from 'next/image'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import linechart from '../public/linechart.gif'
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ChatIcon from '@mui/icons-material/Chat';
import useUser from "../lib/useUser";
import Link from 'next/link'

const features = [
  {
    name: 'Find the best projects',
    description:
      'We lobbied to change the rules so everyday people outside the venture bubble could finally invest in private startups, a historically high performing asset class.',
    icon: SavedSearchIcon,
  },
  {
    name: 'Personalise your investments',
    description:
      'Streamline your fundraising process and tap into our team of fundraising experts who are 100% committed to making the process a success from end to end.',
    icon: LineAxisIcon,
  },
  {
    name: 'Raise capital efficiently',
    description:
      'We’ve helped over 250+ startups use the power of equity crowdfunding to raise capital efficiently, 100% online. Their work is at the heart of what we do.',
    icon: HandshakeIcon,
  },
  {
    name: 'Open Communications',
    description:
      'Support both investors and inspiring start up achieve their dreams. Venture team give you back some time so that you can focus on the important things.',
    icon: ChatIcon,
  },
]

const Home:NextPage  = () => {
  const { user, mutateUser } = useUser();
  return (
    <>
      <div className="m-10 box-content h-[400px] w-90 p-4 shadow-lg bg-indigo-50">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 py-16 px-20 "> 
            
              <h2 className=' font-bold mr-4 sm:text-4xl xl:text-7xl'>Invest in world-changing startups</h2>
              <p className="sm:text-lg xl:text-2xl">Join students funding the next wave of world-changing startups. </p>
              <button className='sm:w-24 xl:w-48 px-8 py-3'><Link className='sm:text-base' href='/invest'><a className='xl:text-lg text-white no-underline'>Invest Now</a></Link></button>
              <button className='border-none bg-transparent ml-9'><Link  href='/raise'><a className=' text-indigo-700 mr-4 no-underline'>Start your own project</a></Link><ArrowForwardIcon className='text-indigo-700'/></button>
        
          </div>
          <div className='py-4'>
          <Image src={linechart} height={350} width={330} alt="GFG logo imported from public directory" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-0.5 mx-44 my-20">
        <div>
          <h2 className='font-bold mr-4 text-3xl'>20,000+</h2>
          <p className="text-lg">Active Investors</p>
        </div>
        <div>
          <h2 className='font-bold mr-4 text-3xl'>$12.5M</h2>
          <p className="text-lg">Funding Raised</p>
        </div>
        <div>
          <h2 className='font-bold mr-4 text-3xl'>50</h2>
          <p className="text-lg">Unicorns</p>
        </div>
        <div>
          <h2 className='font-bold mr-4 text-3xl'>54%</h2>
          <p className="text-lg">of all top-tier deals</p>
        </div>
      </div>
      <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-indigo-600">Learn More</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Ideas into realities
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Together, we’re on a mission to raise global economic prosperity through the frictionless exchange of financial value.
          </p>|
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

  
      
  
    </>
  )
}

// all the pages need this property for layouts
//Home.PageLayout = IndexLayout


export default Home
