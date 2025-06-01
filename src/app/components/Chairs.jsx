import {chairsData} from "../data/chairs"


export default function Chairs() {
	return (
		<div className="xflex container mx-auto flex-1 p-4 py-8 2xl:px-24">
			<div className="mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold items-center">Meet our Chairs</div>
			<div className="grid grid-cols-12 gap-4  sm:grid-cols-12  md:grid-cols-10 md:gap-4 ">
				{chairsData
					?.filter((s) => !!s?.active)
					?.map((speaker) => (
						// <Link
						// 	key={speaker.name}
						// 	to={speaker.name}
						// 	className="col-span-6 rounded-xl border-2 p-2 transition hover:border-gray-600 focus:border-gray-900 dark:border-gray-800 dark:hover:border-gray-600 dark:focus:border-gray-500 md:col-span-3 lg:col-span-2"
						// >
						<div
							key={speaker.name}
							className="col-span-6 rounded-xl border-2 p-2 transition hover:border-gray-600 focus:border-gray-900 dark:border-gray-800 dark:hover:border-gray-600 dark:focus:border-gray-500 md:col-span-3 lg:col-span-2    "
						>
							<img
								style={{
									objectPosition: "center top",
								}}
								src={speaker.imageSmall.url}
								alt=""
								className="aspect-[12/16] w-full rounded-lg object-cover sm:aspect-[12/16]"
								loading="lazy"
							/>
							<div className="text-center -mt-12">
							<div className="font-bold">{speaker.name}</div>
							{/* <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
								@{speaker.twitterUsername}
							</div> */}
							<div className="text-sm">
								{speaker.title}
								{false && `, ${speaker.company.name}`}
							</div>
							</div>
							
						</div>
						// </Link>
					))}
			</div>
		</div>
	);
}

