import Header from "../../components/Header";
import { StarIcon, TrophyIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  return (
    <div className="relative sm:pb-24 bg-indigo-50 text-gray-900 dark:text-gray-900 dark:bg-gray-800 h-screen">
      <Header current={0} />
      <div className="p-8">
        <div className="flex border border-gray-200 bg-white p-4 rounded-md">
          <div className="w-4/12 flex flex-col space-y-4">
            <div>
              <img
                src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                className="rounded-md"
                alt="user-avatar"
              />
            </div>
            <div className="text-left flex items-center">
              <p className="w-4 h-4 bg-green-400 inline-block mx-4" />
              I'm Online
            </div>
          </div>
          <div className="w-8/12 text-left">
            <p className="text-4xl mb-4">User name</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <StarIcon
                  className="block h-8 w-8 text-green-500"
                  aria-hidden="true"
                />
                <span>10</span>
              </div>
              <div className="flex items-center">
                <TrophyIcon
                  className="block h-8 w-8 text-green-500"
                  aria-hidden="true"
                />
                <span>50%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl mb-2">Description</p>
              <div className="border-t-2 border-gray-200 p-4">
                Expert!!!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
