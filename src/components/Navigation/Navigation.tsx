import { BsFillLightningChargeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="w-full bg-indigo-500 h-[80px] flex items-center justify-center drop-shadow-xl mb-4">
      <div className="flex max-w-7xl w-full h-full justify-between">
        <Link to="/" className=" mb-6 flex items-center  h-full ">
          <BsFillLightningChargeFill
            size="3rem"
            className="text-gray-50 mr-2"
          />
          <p className="text-3xl text-gray-50">PublishIT</p>
        </Link>
        <div className="flex items-center">
          <ul className="flex h-3/5 items-center w-full gap-4">
            <li className="h-full flex items-center">
              <Link
                className="text-gray-50 text-xl py-2 px-3 font-semibold h-full"
                to="/"
              >
                Strona główna
              </Link>
            </li>
            <li className="h-full flex items-center">
              <Link
                className="text-gray-50 text-xl py-2 px-3 font-semibold h-full"
                to="/"
              >
                Zapisane posty
              </Link>
            </li>
            <li className="h-full flex items-center">
              <Link
                className="text-indigo-500 bg-gray-50 rounded-md py-2 px-3 text-xl font-semibold h-full "
                to="/"
              >
                Dodaj post
              </Link>
            </li>
            <li>
              <button className=" bg-gray-50 rounded-full p-0.5 m-auto h-full flex items-center">
                <img
                  className="rounded-full flex"
                  src="https://i.pravatar.cc/50"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
