"use client"

import SpinnerLoading from "@/src/components/loading/SpinnerLoading";
import { useUserLogin } from "@/src/hook/useUserLogin";
import { getProfileUser } from "@/src/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import React from "react";
import { CgProfile } from "react-icons/cg";

const BusinessProfile = () => {
  const dispatch = useAppDispatch();
  const [userLogin, setUserLogin] = useUserLogin();
  const [userData, setUserData] = React.useState();
  const { loadingUser } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getProfileUser(userLogin?.email)).then((result) => {
      if (getProfileUser.fulfilled.match(result)) {
        setUserData(result.payload);
        console.log(result.payload);
      }
    });
  }, [userLogin]);

  if (loadingUser) {
    return <SpinnerLoading />;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                Jane Doe
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                Owner at Her Company Inc.
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">Nov 07, 2016</span>
                </li>
              </ul>
            </div>
            <div className="my-4"></div>
       
          </div>
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <CgProfile />
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">Jane</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">Doe</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">Female</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+11 998001001</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">
                      Beech Creek, PA, Pennsylvania
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Permanant Address
                    </div>
                    <div className="px-4 py-2">
                      Arlington Heights, IL, Illinois
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        jane@example.com
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">Feb 06, 1998</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Experience</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    <li>
                      <div className="text-teal-600">
                        Owner at Her Company Inc.
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                        Owner at Her Company Inc.
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                        Owner at Her Company Inc.
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                        Owner at Her Company Inc.
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Education</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    <li>
                      <div className="text-teal-600">
                        Masters Degree in Oxford
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                        Bachelors Degreen in LPU
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
