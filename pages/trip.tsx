"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ButtonAppBar from '../components/navbar';
import FooterBar from '../components/footer';
import { title } from 'process';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';

type AccessLevel = 'family' | 'general' | null;
const ACCESS_COOKIE_KEY = 'accessLevel';

type TravelStep = {
	title: string;
	details: (string | Record<string, string>)[];
};

type TravelPath = {
	title: string;
	intro?: string;
	steps: TravelStep[];
};

type Accommodation = {
	name: string;
	walkNote: string;
	contact: { label: string; value: string; href?: string }[];
	bookingNote?: string;
	cutoffDate?: string;
	rates: { label: string; price: string }[];
	extraNote?: string;
	imageUrl?: string;
};

const introParas: string[] = [
	"We're so thrilled for you to join us this June in Victoria, British Columbia, Canada.",
	"We hope that the information below is useful as you plan your trip. This is an opinionated guide based on what has worked for the bride and groom in their myriad travels to Victoria over the years.",
	"Victoria is located on Vancouver Island. Despite the name, the city of Vancouver is <em>not</em> on Vancouver Island. For this reason, you can either fly directly into Victoria, or fly into Vancouver/Seattle and take a ferry or sea plane to the island. There is no way to drive to Victoria from the mainland.",
];

const travelPaths: TravelPath[] = [
	{
		title: 'Way 1: Flying to Victoria International Airport (YYJ)',
		intro: 'This is generally the most convenient way to get to Victoria.',
		steps: [
			{
				title: 'Travel Overview',
				details: [
					'Fly to Victoria International Airport (YYJ).',
					'Drive ~40 minutes downtown. You can take an Uber, taxi, or bus. You can also consider renting a car; rental car services are available at YYJ.',
				],
			},
		],
	},
	{
		title: 'Way 2: Flying to YVR, then taking BC Ferries to Swartz Bay',
		intro: "This is a great option for experiencing the picturesque Gulf Islands via BC Ferries. (In the summer, the islands are beautifully lush, and sometimes you can spot dolphins or whales!) You may also consider this option if flights to Vancouver are significantly cheaper than flights to Victoria.",
		steps: [
			{
				title: 'Travel Overview',
				details: [
					'Fly to Vancouver International Airport (YVR).',
					'Get to Tsawwassen Ferry Terminal. There are a few options:',
					'&nbsp;&nbsp;(1) <em>Public Transit:</em> Take the Canada Line to Bridgeport Station, then board the 620 bus to Tsawwassen (45-55 min.).',
					'&nbsp;&nbsp;(2) <em>Car:</em> Take an Uber/taxi (25-50 min. depending on traffic).',
					'Purchase a ticket to BC Ferries (to Swartz Bay). Ferries run roughly once every 2 hours, cost $20 CAD/person, and last 90 minutes.',
					'From Swartz Bay, take an Uber, taxi, or bus downtown (~40 minutes). Note that there are no car rental options at the Swartz Bay ferry terminal.',
				],
			},
			{
				title: 'Helpful Resources',
				details: [
					{'Canada Line (YVR-Airport Station to Bridgeport)':'https://www.translink.ca/schedules-and-maps/line/canada-line/direction/0/schedule'},
					{'620 Bus (Bridgeport to Tsawwassen)': 'https://www.translink.ca/schedules-and-maps/route/620/direction/1/schedule'},
					{'BC Ferries (Tsawwassen to Swartz Bay)': 'https://www.bcferries.com/routes-fares/schedules/seasonal/TSA-SWB'},
				]
			}
		],
	},
	{
		title: 'Way 3: Sea Plane from Vancouver or Seattle',
		intro: 'You can also access Victoria using a short (30-minute) sea plane flight from either Vancouver or Seattle. These propeller planes take off and land on water. They also land directly in the Inner Harbour (downtown), where most of our events take place.',
		steps: [
			{
				title: 'Travel Overview',
				details: [
					'From Vancouver: Book a flight from either Vancouver Harbour (located downtown, near Canada Place) or Vancouver Airport (YVR South Seaplane Terminal, which can be accessed by bus from the main YVR airport) to Victoria Inner Harbour (YYJ).',
					'From Seattle: Book a flight from Seattle Lake Union (in downtown Seattle) to Victoria Inner Harbour (YYJ). Note that the terminal is quite far from SEA-TAC airport, so this option only makes sense if you\'re already in Seattle or driving up from the south.',
				]
			},
			{
				title: 'Helpful Resources',
				details: [
					{'YVR South Seaplane Terminal (Harbour Air)': 'https://harbourair.com/locations/yvr-south-river/'}
				]
			}
		],
	},
	{
		title: 'Way 4: Ferry from Seattle to Victoria',
		intro: 'The Clipper Ferry runs once a day, departing from Pier 69 in downtown Seattle and arriving at Victoria\'s Inner Harbour. Note that the pier is quite far away from SEA-TAC airport, so this option only makes sense if you\'re already in Seattle or driving up from the south.',
		steps: [
			{
				title: 'Travel Overview',
				details: [
					'From Pier 69, take the Clipper Ferry to Victoria Inner Harbour (470 Belleville Street). The ferry departs once daily and takes approximately 2 hours and 45 minutes.'
				]
			}
		]
	}
];

const gettingAroundParas: string[] = [
	"Once you are downtown, all of our wedding venues are located conveniently within walking distance. This means that, if you are staying downtown, you should not need to rely heavily on Uber/taxi or public transportation to get around.",
	"In the downtown Inner Harbour area, where most of our events will take place, Victoria has a Harbour Ferry service (known to locals as the \"water taxis\") that transports passengers to Harbourside locations in brightly-colored small boats. We recommend making use of this service both as a way of getting around and as a fun experience!",
	"Victoria has Uber. However, Uber is relatively new to the area, and its network is less robust than the ones in many major U.S. cities (e.g., Bay Area, Boston, New York). For our friends traveling from the United States, please note that a slightly longer wait time can be normal and plan accordingly.",
	"Victoria also has a public bus system that can get you between downtown and other parts of the city. However, if you're interested in exploring more of the Island on your own, you may consider renting a car for greater convenience.",
];

const accommodations: Accommodation[] = [
	{
		name: 'Hotel Grand Pacific',
		walkNote: '(18 minute walk to St. Andrew\'s Cathedral and 9 minute walk to the Union Club)',
		contact: [
			{ label: 'Toll Free', value: '1-800-663-7550', href: 'tel:1-800-663-7550' },
			{ label: 'Direct', value: '(250) 386-0450', href: 'tel:2503860450' },
			{ label: 'Email', value: 'reserve@hotelgrandpacific.com', href: 'mailto:reserve@hotelgrandpacific.com' },
		],
		bookingNote: 'Please make reservations with the hotel directly. To qualify for the group rate, please ask for the <em>Xinlan Emily Hu & Michael John Cooper Wedding rate.</em>',
		extraNote: 'All rates are for single/double occupancy.',
		cutoffDate: 'Cut-off Date: May 15, 2026',
		rates: [
			{ label: 'Traditional Standard Room', price: '$289' },
			{ label: 'Signature Standard Room', price: '$369' },
		],
		imageUrl: '/HotelGrandPacific.jpg',
	},
	{
		name: 'Chateau Victoria',
		walkNote: '(7 minute walk to St. Andrew\'s Cathedral and 4 minute walk to the Union Club)',
		contact: [
			{label: 'Toll Free', value: '1-800-663-5891', href: 'tel:1-800-663-5891' },
			{ label: 'Direct', value: '(250) 382-4221', href: 'tel:2503824221' },
			{ label: 'Website', value: 'www.chateauvictoria.com', href: 'https://www.chateauvictoria.com' },
		],
		bookingNote: 'Please make reservations with the hotel directly. To qualify for the group rate, please mention that you are part of <em>Emily & Michael\'s Wedding.</em> Our block code is 260626WED.',
		extraNote: 'All rates are for single/double occupancy.',
		cutoffDate: 'Cut-off Date: April 26, 2026 at 5 PM local time',
		rates: [
			{ label: 'Traditional Room', price: '$294' },
			{ label: 'One-Bedroom Suite', price: '$340' },
		],
		imageUrl: '/ChateauVictoria.webp',
	},
	{
		name: 'The Union Club of British Columbia',
		walkNote: '(9 minute walk to St. Andrew\'s Cathedral and the location of our reception)',
		contact: [
			{ label: 'Phone', value: '1-800-808-2218 (ext. 0)', href: 'tel:1-800-808-2218' },
			{ label: 'Email', value: 'reservations@unionclub.com', href: 'mailto:reservations@unionclub.com' },
		],
		bookingNote: 'Please make reservations with the hotel directly. To qualify for the group rate, please mention that you are part of the <em>Hu/Cooper Wedding.</em> All rooms have one bed, except for the Twin Bedded Room. Suites have separate sitting rooms.',
		extraNote: 'All rates are for single/double occupancy.',
		rates: [
			{ label: 'Deluxe Queen Room', price: '$269' },
			{ label: 'Parliament-View King Room', price: '$339' },
			{ label: 'Twin Bedded Room', price: '$319' },
			{ label: 'King Suite', price: '$379' },
			{ label: 'City-View King Room', price: '$319' },
			{ label: 'Harbour Suite', price: '$409' },
		],
		imageUrl: '/UnionClubofBC.jpg',
	},
];

const recs = {
	downtown: [
		'Inner Harbour / Parliament Buildings (walk along the waterfront—or take a Harbour Ferry!—to see the iconic architecture designed by Sir Francis Rattenbury. Also available are horse-drawn carriage rides!)',
		'Whale Watching (Prince of Whales); <em>make sure to dress warmly; you may get wet!</em>',
		'Beacon Hill Park (+ Beacon Drive In Restaurant for soft-serve ice cream)',
		'Royal B.C. Museum (You can\'t miss the Woolly Mammoth or Old Town!)',		
		'Chinatown (the oldest one in Canada!)',
		'Ogden Point Breakwater',
		'Miniature World',
		'Fisherman\'s Wharf'],
	victoriaArea: [
		'Dallas Road & Beach Drive',
		'Butchart Gardens',
		'Butterfly Gardens',
		'Art Gallery of Greater Victoria',
		'Sooke Park',
		'Goldstream Provincial Park',
		'Elk Lake / Beaver Lake',
	],
	island: [
		'Duncan (Totem Poles)',
		'Strathcona Provincial Park',
		'Tofino',
	],
};

const TravelPage: React.FC = () => {
	const router = useRouter();
	const [isMobile, setIsMobile] = useState(false);
	const [authorized, setAuthorized] = useState(false);
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';

	const frameColors = isDark
		? {
			background: '#2a2a2a',
			borderColor: '#404040',
			insetColor: '#2a2a2a',
			shadowColor: 'rgba(255, 255, 255, 0.1)',
		}
		: {
			background: 'white',
			borderColor: 'rgba(255, 255, 255, 0.9)',
			insetColor: 'rgba(255, 255, 255, 1)',
			shadowColor: 'rgba(0, 0, 0, 0.1)',
		};

	const [firstAround, secondAround, ...restAround] = gettingAroundParas;

	useEffect(() => {
		setIsMobile(window.innerWidth < 650);
		const handleResize = () => setIsMobile(window.innerWidth < 650);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const cookieAccess = Cookies.get(ACCESS_COOKIE_KEY) as AccessLevel | undefined;
		const sessionAccess = sessionStorage.getItem('accessLevel') as AccessLevel;
		const access = cookieAccess ?? sessionAccess;
		if (access === 'family' || access === 'general') {
			setAuthorized(true);
		} else {
			router.replace('/');
		}
	}, [router]);

	if (!authorized) return null;

	return (
		<div>
			<title>Travel to Victoria | Emily & Michael</title>
			<ButtonAppBar />
			<main style={{ width: isMobile ? '90%' : '75%', margin: 'auto', paddingBottom: '72px' }}>
				<section className="mt-8 space-y-3">
					<h1 className="text-3xl font-semibold">Your Trip to Victoria</h1>
					{introParas.map((para, idx) => (
						<p
							key={`${idx}-${para.slice(0, 20)}`}
							className="text-gray-700 dark:text-gray-200 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: para }}
						/>
					))}
				</section>

				<section className="mt-10 space-y-4">
					<h2 className="text-2xl font-semibold">Getting to Victoria</h2>
					<div className="grid gap-4">
						{travelPaths.map((path) => (
							<article key={path.title} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
								<h3 className="text-xl font-semibold mb-2">{path.title}</h3>
								{path.intro && <p className="text-gray-700 dark:text-gray-200 mb-3">{path.intro}</p>}
								{path.steps.length > 0 && path.steps.map((step) => (
									<div key={step.title} className="mb-3">
										<p className="font-medium text-gray-800 dark:text-gray-100">{step.title}</p>
										<ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
											{step.details.flatMap((d, idx) => {
												if (typeof d === 'string') {
													const plain = d.replace(/&nbsp;/g, '').trim();
													const isIndentedOption = plain.startsWith('(1)') || plain.startsWith('(2)');
													return [
														<li
															key={`${step.title}-${idx}`}
															className={isIndentedOption ? 'list-none ml-6' : ''}
															dangerouslySetInnerHTML={{ __html: d }}
														/>
													];
												}
												if (d && typeof d === 'object' && !Array.isArray(d)) {
													return Object.entries(d).map(([text, href], linkIdx) => (
														<li key={`${step.title}-${idx}-${linkIdx}`}>
															<a href={href} className="text-blue-700 dark:text-blue-300 no-underline" target="_blank" rel="noopener noreferrer">
																{text}
															</a>
														</li>
													));
												}
												return [];
											})}
										</ul>
									</div>
								))}
							</article>
						))}
					</div>
				</section>

				<section className="mt-10 space-y-4">
					<h2 className="text-2xl font-semibold">Getting Around Victoria</h2>
					<div className="space-y-3 text-gray-700 dark:text-gray-200">
						<div className="grid md:grid-cols-2 gap-4 items-stretch">
							<div className="space-y-3">
								{firstAround && <p>{firstAround}</p>}
								{secondAround && <p>{secondAround}</p>}
							</div>
							<div className="flex justify-center md:justify-end md:h-full">
								<div
									style={{
										borderRadius: '8px',
										boxShadow: `0 4px 8px ${frameColors.shadowColor}, 0 0 0 1px ${frameColors.borderColor}, inset 0 0 0 8px ${frameColors.insetColor}`,
										background: frameColors.background,
										padding: '12px',
										height: '100%',
									}}
								>
									<img
										src="/HarbourFerry.jpg"
										alt="Victoria Harbour Ferry on the Inner Harbour"
										className="w-full max-w-sm md:max-w-xs h-full max-h-full object-cover rounded-md"
										loading="lazy"
									/>
								</div>
							</div>
						</div>
						{restAround.map((para) => (
							<p key={para}>{para}</p>
						))}
					</div>
				</section>

				<section className="mt-10 space-y-4">
					<h2 className="text-2xl font-semibold">Accommodation</h2>
					<p className="text-gray-700 dark:text-gray-200">We have put together a collection of hotel options that offer discounted rates to attendees of our wedding. All rates are in Canadian dollars (CAD) and require additional local taxes and fees (17.16%).</p>
					<div className="grid gap-6">
						{accommodations.map((hotel) => (
							<article key={hotel.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm">
								<div className="grid md:grid-cols-3 gap-4">
									<div className="md:col-span-2 space-y-3">
										<div>
											<h3 className="text-xl font-semibold">{hotel.name}</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400">{hotel.walkNote}</p>
										</div>
										{hotel.cutoffDate && <p className="text-gray-700 dark:text-gray-200 text-sm font-medium">{hotel.cutoffDate}</p>}
										<div className="space-y-1 text-gray-700 dark:text-gray-200">
											{hotel.contact.map((c) => (
												<div key={c.label + c.value} className="flex gap-2 text-sm">
													<span className="font-medium text-gray-800 dark:text-gray-100">{c.label}:</span>
													{c.href ? (
														<a href={c.href} className="text-blue-700 dark:text-blue-300 no-underline" target="_blank" rel="noopener noreferrer">
															{c.value}
														</a>
													) : (
														<span>{c.value}</span>
													)}
												</div>
											))}
										</div>
										{hotel.bookingNote && (
											<p
												className="text-gray-700 dark:text-gray-200 text-sm"
												dangerouslySetInnerHTML={{ __html: hotel.bookingNote }}
											/>
										)}
										{hotel.extraNote && <p className="text-gray-700 dark:text-gray-200 text-sm">{hotel.extraNote}</p>}
									
										<div className="space-y-1 text-gray-700 dark:text-gray-200 text-sm">
											<p className="font-medium text-gray-800 dark:text-gray-100">Rate Per Night:</p>
											<ul className="list-disc list-inside space-y-1">
												{hotel.rates.map((rate) => (
													<li key={rate.label}>{rate.label} — {rate.price}</li>
												))}
											</ul>
										</div>
									</div>
									<div className="md:col-span-1 flex md:items-center md:justify-center">
										{hotel.imageUrl ? (
											<div
												style={{
													borderRadius: '8px',
													boxShadow: `0 4px 8px ${frameColors.shadowColor}, 0 0 0 1px ${frameColors.borderColor}, inset 0 0 0 8px ${frameColors.insetColor}`,
													background: frameColors.background,
													padding: '12px',
												}}
											>
												<img
													src={hotel.imageUrl}
													alt={hotel.name}
													loading="lazy"
													className="w-full h-64 md:h-auto md:max-h-72 object-cover rounded-md"
												/>
											</div>
										) : (
											<div className="w-full h-full min-h-[180px] rounded-md bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm">
											</div>
										)}
									</div>
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="mt-10 space-y-4">
					<h2 className="text-2xl font-semibold">Our Recommendations for Things to Do</h2>
					<p className="text-gray-700 dark:text-gray-200">Victoria (and Vancouver Island) is a beautiful part of the world. We chose this city as our wedding location because it blends the excitement of a destination wedding (especially for those who haven't been to Victoria before!) with the sentimentality of being Michael's hometown. Although we hope our venues and activities highlight some of the best that this city has to offer, if you have a bit of extra time, we encourage you to check out some of the following local attractions.</p>
					<div className="grid md:grid-cols-3 gap-6">
						<div>
							<h3 className="text-lg font-semibold mb-2">Downtown (Walkable)</h3>
							<ul className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-200">
								{recs.downtown.map((item) => (
									<li key={item} dangerouslySetInnerHTML={{ __html: item }} />
								))}
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Victoria-Area (Driveable / Transit-able)</h3>
							<ul className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-200">
								{recs.victoriaArea.map((item) => (
									<li key={item} dangerouslySetInnerHTML={{ __html: item }} />
								))}
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Vancouver Island (if you have a car & extra days to explore)</h3>
							<ul className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-200">
								{recs.island.map((item) => (
									<li key={item} dangerouslySetInnerHTML={{ __html: item }} />
								))}
							</ul>
						</div>
					</div>
				</section>
			</main>
			<FooterBar isMobile={isMobile} />
		</div>
	);
};

export default TravelPage;

