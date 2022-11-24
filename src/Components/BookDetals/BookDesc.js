import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BookDesc({ book }) {
    const { desc, author } = book;
  let [categories, ] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex rounded-xl bg-blue-900/20 p-1 space-x-8 justify-around text-xl font-semibold">
          <Tab className="">Book OverView</Tab>
          <Tab>About author</Tab>
          <Tab>Review</Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>{desc}</Tab.Panel>
          <Tab.Panel>
            <h1 className="text-center mt-5">
              <span className="font-semibold">Author Name :</span>
              <span className="text-xl font-bold"> {author}</span>
            </h1>
          </Tab.Panel>
          <Tab.Panel>
            <p className="text-center text-3xl mt-5">Comming sooon........</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
