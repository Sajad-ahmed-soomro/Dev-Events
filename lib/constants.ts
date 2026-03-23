export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string; // e.g., "2025-11-07"
  time: string; // e.g., "09:00 AM"
};

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Summit US 2025",
    slug: "react-summit-us-2025",
    location: "San Francisco, CA, USA",
    date: "2025-11-07",
    time: "09:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "Google I/O Extended 2025",
    slug: "google-io-extended-2025",
    location: "Mountain View, CA, USA",
    date: "2025-06-15",
    time: "10:00 AM",
  },
  {
    image: "/images/event3.png",
    title: "AWS re:Invent 2025",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, NV, USA",
    date: "2025-12-01",
    time: "08:00 AM",
  },
  {
    image: "/images/event4.png",
    title: "Microsoft Build 2025",
    slug: "microsoft-build-2025",
    location: "Seattle, WA, USA",
    date: "2025-05-20",
    time: "09:30 AM",
  },
  {
    image: "/images/event5.png",
    title: "HackZurich 2025",
    slug: "hackzurich-2025",
    location: "Zurich, Switzerland",
    date: "2025-09-12",
    time: "11:00 AM",
  },
  {
    image: "/images/event6.png",
    title: "JSConf EU 2025",
    slug: "jsconf-eu-2025",
    location: "Berlin, Germany",
    date: "2025-07-10",
    time: "10:00 AM",
  },
];