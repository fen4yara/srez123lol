import { useEffect } from 'react'
import { useState } from 'react'
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Swiper, SwiperSlide } from 'swiper/react';


function App() {
  const [tempPr, settempPr] = useState([]);
  const [pr, setpr] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    async function fetchpr() {
      const call = await fetch(`https://reactapi.pautinaweb.ru/objects.php`);
      const response = await call.json();
      setpr(response);
      settempPr(response);
    }
    fetchpr();
  }, []);

  function sort(type = 'asc') {
    settempPr([...tempPr.sort((a, b) => type === 'asc' ? a.price - b.price : type === 'desc' ? b.price - a.price : '')]);
  }

  useEffect(() => {
    settempPr([...pr.filter((item) => item.name.toLowerCase().includes(search))])
  }, [search]) 

  return (
    <>
    <section className='px-5 container mx-auto pt-10'>
      <Typography variant="h2" component="h2">
      SAFQ
      </Typography>
      <div className='mt-4'>
        <div className='flex items-center justify-between gap-1'>
          <div className='flex items-center gap-1'>
          <Input value={search} onChange={(event) => setSearch(event.target.value)} />
          <SearchIcon />
          </div>
          <div className='flex gap-2'>
            <Button className='asd' variant="text" onClick={() => sort('desc')}>
              По убыванию
            </Button>
            <Button className='asd' variant="text" onClick={() => sort()}>
              По возрастанию
            </Button>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-5'>
        {tempPr.map((item) => {
          return (
            <article className='p-3 rounded-xl bg-white w-60' key={item.id}>
              <h2 className='text-xl font-bold'>{item.name} </h2>
              <p className='mt-2 text-sm'>{item.description}</p>
              <div className="flex items-end justify-between ">
                <p className='mt-8 font-bold '>{item.price} руб.</p>
                <p className=''>{item.sclad} шт</p>
              </div>
              
            </article>
          )
        })}
        </div>
      </div>
    </section>
    </>
  )
}

export default App