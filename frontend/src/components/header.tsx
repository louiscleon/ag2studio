'use client'

import Icon from "./icons";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  Bars3Icon,
  BellIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { appContext } from "../hooks/provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ meta = { title: "Studio", description: "AgentOS" }, link }: any) => {
  const { user, logout } = React.useContext(appContext);
  const pathname = usePathname();
  const userName = user ? user.name : "Unknown";
  const userAvatarUrl = user ? user.avatar_url : "";
  const user_id = user ? user.username : "unknown";

  const links: any[] = [
    { name: "Build", href: "/build" },
    { name: "Playground", href: "/" },
    // { name: "Gallery", href: "/gallery" },
    // { name: "Data Explorer", href: "/explorer" },
  ];

  const DarkModeToggle = () => {
    const { darkMode, setDarkMode } = React.useContext(appContext);
    
    return (
      <button
        onClick={() => {
          const newMode = darkMode === "dark" ? "light" : "dark";
          console.log('Toggling dark mode to:', newMode);
          setDarkMode(newMode);
        }}
        type="button"
        className="flex-shrink-0 bg-primary p-1 text-secondary rounded-full hover:text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
      >
        <span className="sr-only">Toggle dark mode</span>
        {darkMode === "dark" ? (
          <SunIcon className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MoonIcon className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    );
  };

  return (
    <Disclosure
      as="nav"
      className="bg-primary text-primary mb-8 border-b border-secondary"
    >
      {({ open }) => (
        <>
          <div className="  px-0 sm:px-0 lg:px-0 ">
            <div className="flex justify-between h-16">
              <div className="flex  lg:px-0 ">
                <div className="flex flex-shrink-0 pt-2">
                  <Link href="/" className="block">
                    <span className="inline-block pt-2 absolute">
                      {" "}
                      <div className="inline-block w-12 text-accent pb-2 mr-1">
                        <Icon icon="ag2" size={14} />
                      </div>{" "}
                    </span>
                    <div className="pt-1 text-lg ml-14 inline-block">
                      <div className=" flex flex-col">
                        <div className="text-base font-jersey">{meta.title}</div>
                        <div className="text-xs"> {meta.description}</div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-6">
                  {/* Current: "border-accent text-gray-900", Default: "border-transparent text-secondary hover:border-gray-300 hover:text-primary" */}
                  {links.map((data, index) => {
                    const isActive = pathname === data.href;
                    const activeClass = isActive
                      ? "bg-accent  "
                      : "bg-secondary ";
                    return (
                      <div
                        key={index + "linkrow"}
                        className={`text-primary  items-center hover:text-accent  px-1 pt-1 block   text-sm font-medium `}
                      >
                        <Link
                          href={data.href}
                          className="hover:text-accent h-full flex flex-col"
                        >
                          <div className=" flex-1 flex-col flex">
                            <div className="flex-1"></div>
                            <div className="pb-2 px-3">{data.name}</div>
                          </div>
                          <div
                            className={`${activeClass}  w-full h-1 rounded-t-lg `}
                          ></div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {
                <div className="hidden lg:ml-4 md:flex md:items-center">
                  <DarkModeToggle />

                  {user && (
                    <>
                      <div className="ml-3 hidden">
                        <div className="text-sm text-primary">{userName}</div>
                        <div className="text-xs  text-secondary">{user_id}</div>
                      </div>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-4 relative flex-shrink-0 hidden">
                        <div>
                          <Menu.Button className="bg-primary rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                            <span className="sr-only">Open user menu</span>
                            {userAvatarUrl && (
                              <img
                                className="h-8 w-8 rounded-full"
                                src={userAvatarUrl}
                                alt=""
                              />
                            )}
                            {!userAvatarUrl && userName && (
                              <div className="border-2 bg-accent pt-1 h-8 w-8 align-middle text-sm text-white rounded-full">
                                {userName[0]}
                              </div>
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-secondary' : '', 'block px-4 py-2 text-sm text-primary')}
                          >
                            Your Profile
                          </a>
                        )} */}
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  onClick={() => {
                                    logout();
                                  }}
                                  className={classNames(
                                    active ? "bg-secondary" : "",
                                    "block px-4 py-2 text-sm text-primary"
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  )}
                </div>
              }
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-accent text-accent", Default: "border-transparent text-gray-600 hover:bg-primary hover:border-gray-300 hover:text-primary" */}
              {links.map((data, index) => {
                return (
                  <Disclosure.Button
                    key={index + "linkrow"}
                    as="a"
                    href={data.href}
                    className="bg-secondary border-accent text-accent block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    {data.name}
                  </Disclosure.Button>
                );
              })}
            </div>
            <div className="mt-3 space-y-1 pb-2">
              {" "}
              Dark mode <DarkModeToggle />{" "}
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-secondary">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {userAvatarUrl && (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userAvatarUrl}
                        alt=""
                      />
                    )}
                    {!userAvatarUrl && userName && (
                      <div className="border-2 bg-accent text-sm text-white h-8 w-8 pt-1   rounded-full text-center">
                        {userName[0]}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-primary">{userName}</div>
                    <div className="text-xs   text-secondary">{user_id}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-primary p-1 text-secondary rounded-full hover:text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    onClick={() => logout()}
                    className="block px-4 py-2 text-base font-medium text-secondary hover:text-primary "
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
