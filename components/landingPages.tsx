import React from 'react';

export type EventItem = {
  title: string;
  description?: string;
  time?: string;
  location?: string;
  locationLink?: string;
  dressCode?: string;
};

const introCopy = "Welcome! We are so excited for you to celebrate our marriage and the start our life together. Below, please find the schedule of events for our wedding weekend.";

const fridayGeneralEvents: EventItem[] = [
  {
    title: 'Welcome & Social Dance Lesson',
    description: 'Social dance is a source of joy for both of us, and we\'ll be featuring lots of it in our wedding reception.'  
      + ' Join us for a dance lesson to get comfortable with waltz basics and get warmed up for a weekend of dance.'
      + ' No prior dance experience is necessary! <br><br>Even if you\'re not a dancer, we invite you to join in the fun! Come enjoy refreshments over a beautiful view of Victoria\'s Inner Harbour.<br><br>' 
      + '<em>Light refreshments will be served, but there will not be a full dinner.</em>',
    time: '7:00—9:00 PM',
    location: 'Victoria International Marina (1 Cooperage Place, Victoria, B.C.)',
    locationLink: 'https://maps.app.goo.gl/cH9LMUCE3v6Gkkpr9',
    dressCode: 'Semi-Formal, with Asian or Chinese attire encouraged. Wear clothing that you can comfortably move around in. For footwear, please bring soft-bottomed shoes (e.g., dance shoes) or wear socks that you are willing to dance in. Please do not wear red.'
    },
];

const fridayFamilyExtras: EventItem[] = [
  {
    title: 'Wedding Rehearsal',
    description: 'The wedding party and immediate family will work with our officiant and day-of coordinator to review ceremony details and practice the procession.',
    location: 'St. Andrew\'s Cathedral (740 View St, Victoria, B.C.)',
    locationLink: 'https://maps.app.goo.gl/PqdD5gq1n24QsK8bA',
    time: '2:30—3:30 PM',
    dressCode: 'Formal, with Asian or Chinese attire encouraged. Please do not wear red. We will be heading directly to the Chinese Tea Ceremony after this event, so please wear what you plan to the Chinese Tea Ceremony.'
  },
  {
    title: 'Chinese Tea Ceremony',
    description: 'A traditional Chinese Tea Ceremony will take place. As a sign of gratitude and respect, we will kneel before our elders and serve them tea. In turn, we will receive gifts and blessings for our new life together.',
    time: '4:30—5:00 PM',
    dressCode: 'Formal, with Asian or Chinese attire encouraged. Please do not wear red.'
  },
  {
    title: 'Rehearsal Dinner',
    description: 'Immediately following the tea ceremony, an intimate dinner will take place for wedding party and close family members, thanking them for being such an important part of our lives and this special weekend.',
    time: '5:00—6:30 PM',
    dressCode: 'Formal, with Asian or Chinese attire encouraged. Please do not wear red.'
  },
];

const saturdayEvents: EventItem[] = [
  {
    title: 'Wedding Ceremony',
    description: 'We get married! The ceremony will be a full Catholic mass lasting approximately one hour.',
    time: '1:00 PM',
    location: 'St. Andrew\'s Cathedral (740 View St, Victoria, B.C.)',
    locationLink: 'https://maps.app.goo.gl/PqdD5gq1n24QsK8bA',
    dressCode: 'Formal Attire. Examples include a suit and tie with dress pants and shoes, or a floor-length gown. Please do not wear white, ivory, or cream.'
  },
  {
    title: 'Cocktail Reception',
    description: "Drinks and canapes will be served in the Union Club's beautiful Reading Room, with Marlon, our pianist, playing live music.",
    time: '3:00—5:00 PM',
    location: 'The Union Club of British Columbia (805 Gordon St, Victoria, B.C.)',
    locationLink: 'https://maps.app.goo.gl/x6s9dZNxSGPRTw8w7'
  },
  {
    title: 'Reception (Dinner & Dancing)',
    description: "A plated dinner will be served in the Union Club's Centennial Ballroom, followed by speeches and dancing. Josh, our DJ, will be playing a mix of romantic waltzes and fun party bops so you can give your new waltz skills a whirl or simply let loose and celebrate!",
    time: '5:00 PM—12:00 AM',
    location: 'The Union Club of British Columbia (805 Gordon St, Victoria, B.C.)',
    locationLink: 'https://maps.app.goo.gl/x6s9dZNxSGPRTw8w7',
    dressCode: 'Formal Attire, with Black Tie Optional. Examples include a dark suit/tuxedo and tie with dress pants and shoes, or a floor-length gown. Please do not wear white, ivory, or cream.'
  },
];

type ScheduleDayProps = {
  heading: string;
  events: EventItem[];
};

const ScheduleDay: React.FC<ScheduleDayProps> = ({ heading, events }) => (
  <section className="mt-6">
    <h2 className="text-2xl font-semibold mb-3">{heading}</h2>
    <div className="space-y-4">
      {events.map((event) => (
        <article key={event.title} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-medium">{event.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400"><b>Time:</b> {event.time || 'TBD'}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <b>Location:</b> {
              event.locationLink ? (
                <a
                  href={event.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-300 no-underline"
                >
                  {event.location || 'View map'}
                </a>
              ) : (
                event.location || 'TBD'
              )
            }
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400"><b>Dress Code:</b> {event.dressCode || 'TBD'}</p>
          {event.description && (
            <p
              className="mt-2 text-gray-700 dark:text-gray-200 [&_a]:text-blue-700 [&_a]:dark:text-blue-300 [&_a]:no-underline"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          )}
        </article>
      ))}
    </div>
  </section>
);

type LandingLayoutProps = {
  title: string;
  intro: string;
  children: React.ReactNode;
};

const LandingLayout: React.FC<LandingLayoutProps> = ({ title, intro, children }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">{intro}</p>
    </div>
    {children}
  </div>
);

export const CloseFamilyLanding: React.FC = () => (
  <LandingLayout
    title="Welcome to our Wedding Weekend!"
    intro={introCopy}
  >
    <ScheduleDay
      heading="Friday, June 26, 2026"
      events={[...fridayFamilyExtras, ...fridayGeneralEvents]}
    />
    <ScheduleDay
      heading="Saturday, June 27, 2026"
      events={saturdayEvents}
    />
  </LandingLayout>
);

export const GeneralLanding: React.FC = () => (
  <LandingLayout
    title="Welcome to our Wedding Weekend!"
    intro={introCopy}
  >
    <ScheduleDay
      heading="Friday, June 26, 2026"
      events={fridayGeneralEvents}
    />
    <ScheduleDay
      heading="Saturday, June 27, 2026"
      events={saturdayEvents}
    />
  </LandingLayout>
);