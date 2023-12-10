"use client";

import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        let jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-row justify-center flex-wrap gap-4 p-8 mt-12">
      {data &&
        data.map((item: any, index) => {
          return (
            <div
              className="flex flex-col rounded-md overflow-hidden bg-white shadow-md max-w-xs w-full"
              key={item.id}
            >
              <div className="px-4 py-2 bg-gray-100 rounded-t-md">
                <h3 className="text-xl font-bold text-gray-800">
                  USER ID: {item.userId}
                </h3>
              </div>
              <div className="px-4 py-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h2>
                <p className="text-base text-gray-600">{item.body}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;
