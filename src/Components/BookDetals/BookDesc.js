import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BookDesc({ book }) {
    const { desc, author } = book;
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
