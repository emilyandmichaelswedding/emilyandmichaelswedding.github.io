import React from 'react';

export type EventItem = {
  title: string;
  description?: string;
  time?: string;
  location?: string;
};

type ScheduleDayProps = {
  heading: string;
  dateLabel: string;
  events: EventItem[];
};

const ScheduleDay: React.FC<ScheduleDayProps> = ({ heading, dateLabel, events }) => (
  <section className="mt-6">
    <h2 className="text-2xl font-semibold mb-1">{heading}</h2>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{dateLabel}</p>
    <div className="space-y-4">
      {events.map((event) => (
        <article key={event.title} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-medium">{event.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Time: {event.time || 'TBD'}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Location: {event.location || 'TBD'}</p>
          {event.description && <p className="mt-2 text-gray-700 dark:text-gray-200">{event.description}</p>}
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
    intro="We are so excited for you to celebrate with us. Below, please find the schedule of events this weekend."
  >
    <ScheduleDay
      heading="Friday Gatherings"
      dateLabel="Friday, June 26, 2026"
      events={[
        {
          title: 'Wedding Rehearsal',
          description: 'Practice run-through with the wedding party and immediate family.',
        },
        {
          title: 'Tea Ceremony',
          description: 'A tea ceremony to honor our families and traditions.',
        },
        {
          title: 'Rehearsal Dinner',
          description: 'An intimate dinner to celebrate together before the big day.',
        },
        {
          title: 'Welcome & Social Dance Lesson',
          description: 'Light bites, mingling, and a fun dance refresher for the weekend.',
        },
      ]}
    />
    <ScheduleDay
      heading="Saturday Celebrations"
      dateLabel="Saturday, June 27, 2027"
      events={[
        {
          title: 'Wedding Ceremony',
          description: 'Please arrive a bit early to settle in before the processional.',
        },
        {
          title: 'Cocktail Reception',
          description: "Enjoy drinks and hors d'oeuvres while we take photos.",
        },
        {
          title: 'Dinner Reception',
          description: 'Dinner, toasts, and dancing to celebrate the night away.',
        },
      ]}
    />
  </LandingLayout>
);

export const GeneralLanding: React.FC = () => (
  <LandingLayout
    title="Welcome to our Wedding Weekend!"
    intro="We are so excited for you to celebrate with us. Below, please find the schedule of events this weekend."
  >
    <ScheduleDay
      heading="Friday Welcome"
      dateLabel="Friday, June 26, 2026"
      events={[
        {
          title: 'Welcome & Social Dance Lesson',
          description: 'Drop in, say hello, and join a fun dance refresher ahead of the big day.',
        },
      ]}
    />
    <ScheduleDay
      heading="Saturday Celebrations"
      dateLabel="Saturday, June 27, 2027"
      events={[
        {
          title: 'Wedding Ceremony',
          description: 'Please arrive a bit early to settle in before the processional.',
        },
        {
          title: 'Cocktail Reception',
          description: "Enjoy drinks and hors d'oeuvres while we take photos.",
        },
        {
          title: 'Dinner Reception',
          description: 'Dinner, toasts, and dancing to celebrate the night away.',
        },
      ]}
    />
  </LandingLayout>
);
