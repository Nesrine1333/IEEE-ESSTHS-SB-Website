import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import routes from "../routes";
import NavModal from "./NavModal";
// import SmallLogo from "../../assets/logo/logo-10-percent.png";
import SmallLogo from "../../assets/logo/rsz_d2ycfxl.png";

import ThemeToggle from "./ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { useEffect } from "react";


import './Navigation.css'

export default function Navigation() {
	const [toggleModal, setToggleModal] = useState(false);
	const [currentIcon, setcurrentIcon] = useState(SmallLogo);

	const { chapterSlug } = useParams();
	useEffect(() => {
		const faviconMap = {
			"/": `/assets/logo/rsz_d2ycfxl.png`,
			"cs": "/assets/logos/cs.png",
			"wie": "/assets/logos/wie.png",
			"sight": "/assets/logos/sight.png",
			"aess": "/assets/logos/aess.png",
			"iip": "/assets/logos/iip.png",
			"ras": "/assets/logos/ras.png",
		};
		console.log("chapterSlug", chapterSlug);

		if (chapterSlug) {
			setcurrentIcon(faviconMap[chapterSlug]);
		} else {
			setcurrentIcon(SmallLogo);
		}
		// Default favicon
	}, [chapterSlug]);
	return (
		<div >
			<nav className="nav-background border-color-[#ffffff] border-[#7f9ab3]-300 fixed z-20 w-full rounded border border-b-2  px-2 py-1 backdrop-blur-lg sm:px-8">
				<div className="mx-auto flex flex-wrap items-center justify-between ">
					<Link to="/" className="flex items-center">
						<img
							loading="lazy"
							src={currentIcon}
							className={`mr-3 h-6 sm:h-12 md:h-16`}
							alt="IEEE ESSTHS"
						/>
					</Link>
					<div className="flex items-center gap-2 ">
						<div className="hidden w-auto items-center justify-between lg:flex">
							<ul className="flex flex-col rounded-lg border border-gray-100 p-4 dark:border-gray-700 md:mt-0 md:flex-row md:border-0 md:text-sm md:font-medium">
								{routes
									.filter((r) => !r.mobile)
									.map((route) => (
										<li className="" key={route.title}>
											<NavLink
												className={({ isActive, isPending }) =>
													twMerge(
														"hover: focus: block p-4 px-4 text-gray-600 transition-all duration-75 hover:font-bold focus:font-bold dark:text-gray-400 dark:hover:text-gray-200",
														isActive
															? "font-bold text-black dark:text-gray-200"
															: isPending
															? ""
															: ""
													)
												}
												to={route.href}
											>
												{route.title}
											</NavLink>
										</li>
									))}
								<li className="">
									<NavLink
										className={({ isActive, isPending }) =>
											twMerge(
												"hover: focus: block p-4 px-4 text-gray-600 transition-all duration-75 hover:font-bold focus:font-bold dark:text-gray-400 dark:hover:text-gray-200",
												isActive
													? "font-bold text-black dark:text-gray-200"
													: isPending
													? ""
													: ""
											)
										}
										to={"https://tsyp.ieee.tn/"}
										target="_blank"
									>
										TSYP
									</NavLink>
								</li>
								{/* <li>
									<a
										href="#"
										className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white  md:bg-transparent md:p-0 md:text-blue-700"
										aria-current="page"
									>
										Keynote
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
									>
										Stage J
									</a>
								</li> */}
							</ul>
						</div>

						{false && (
							<div className="hidden lg:block">
								<ThemeToggle />
							</div>
						)}

						<Link
							target="_blank"
							to="https://forms.gle/rWezNMjFbYPWCmWk8"
							className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-700 to-[#3c7cec] p-0.5 text-sm font-medium  transition-shadow hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500  dark:focus:ring-purple-800"
						>
							{/* <button
								type="button"
								className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium  transition-shadow hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500  dark:focus:ring-purple-800"
							> */}
							<span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
								<FontAwesomeIcon icon={faExternalLink} className="mr-1.5" />
								Join us
							</span>
							{/* </button> */}
						</Link>
						{/* <button
							type="button"
							className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
						>
							Get started
						</button> */}

						{/* <ThemeToggle /> */}

						<button
							data-collapse-toggle="navbar-cta"
							type="button"
							className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
							aria-controls="navbar-cta"
							aria-expanded="false"
							onClick={() => setToggleModal(!toggleModal)}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="h-6 w-6"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>

				<NavModal toggleModal={toggleModal} setToggleModal={setToggleModal} />
			</nav>
		</div>
	);
}
