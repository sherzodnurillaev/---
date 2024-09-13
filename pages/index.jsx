import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("Samarkand");
  const [inputValue, setInputValue] = useState("");

  const key = process.env.NEXT_PUBLIC_API_KEY
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.weatherstack.com/current', {
          params: {
            access_key: key,
            query: query
          }
        });
        console.log(response);
        
        setData(response.data.current);
      } catch (error) {
        console.error('Ошибка при загрузке данных о погоде:', error);
      }
    };

    fetchData();
  }, [query]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(inputValue);
  };

  if (data === null) {
    return <p>Загрузка данных...</p>;
  }

  const img = data != null ? data.weather_icons : ""

  console.log(img);
  


  const getCurrentDateString = () => {
    const now = new Date();
  
    const day = now.getDate(); // Получаем день месяца
    const monthIndex = now.getMonth(); // Получаем индекс месяца (0 = январь, 1 = февраль и т.д.)
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const month = monthNames[monthIndex]; // Получаем название месяца по индексу
  
    return `today, ${day} ${month}`;
  };
  
  
  
  return (
    <>
      <div className="nav bg-[#30d2fb] w-[100%] h-[100vh]">
        <div className="pt-[50px] px-[30px]">
          <form className="relative" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here"
              value={inputValue}
              onChange={handleInputChange}
              className="w-[100%] h-[50px] rounded-[12px] px-[55px] text-[18px]"
            />
            <Image
              src="/arrow.png"
              alt=""
              width={24}
              height={24}
              className="absolute top-[14px] left-[15px]"
            />
            <Image
              src="/micro.png"
              alt=""
              width={22}
              height={22}
              className="absolute top-[14px] right-[15px]"
            />
          </form>
        </div>

        <Image
          src={img[0]}
          alt=""
          width={200}
          height={200}
          className="mx-auto mt-[132px]"
        />

        <div className="absolute bottom-[80px] left-[30px] right-[30px]">
          <div className="mid bg-[#30d2fb] w-[100%] h-[335px] border-[2px] rounded-[20px] ">
            <p className="text-white text-[20px] font-bold w-[200px] mx-auto mt-[17px]">{getCurrentDateString()}</p>
            <div className="">
                <p className="text-[100px] font-bold text-white shadow-black mx-auto w-[150px]">{data.temperature}</p>
            </div>
            <div className="flex items-center gap-[20px] pl-[5px] justify-center">
                <img src="/windy.png" alt="" className="w-[30px]" />
                <div className="w-[3px] h-[30px] bg-white"></div>
                <p className="text-white text-[20px] font-bold"> {data.wind_speed                } km/h</p>
            </div>
            <div className="flex items-center gap-[20px] pr-[15px] justify-center mt-[20px]">
                <img src="/hum.png" alt="" className="w-[30px] pr-[5px]" />
                <div className="w-[3px] h-[30px] bg-white"></div>
                <p className="text-white text-[20px] font-bold"> {data.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
