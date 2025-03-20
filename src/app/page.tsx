"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Album() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/album.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="text-center text-xl">Загрузка...</p>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{ backgroundImage: data.background, backgroundSize: "cover" }}
    >
      {/* Заголовок */}
      <motion.h1
        className="text-4xl font-bold mb-4 bg-black bg-opacity-50 p-4 rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Класс {data.class}
      </motion.h1>

      {/* Классный руководитель */}
      <motion.div
        className="flex flex-col items-center bg-white bg-opacity-20 p-4 rounded-xl shadow-lg mb-6 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={data.teacher.photo}
          alt={data.teacher.name}
          className="w-32 h-32 rounded-full mb-2 object-cover border-4 border-white"
        />
        <p className="text-xl font-bold">{data.teacher.name}</p>
        <p className="italic text-sm mt-2">"{data.teacher.quote}"</p>
      </motion.div>

      {/* Учителя */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {data.teachers.map((teacher: any, index: number) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-white bg-opacity-20 p-4 rounded-xl shadow-lg text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
          >
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="w-24 h-24 rounded-full mb-2 object-cover border-4 border-white"
            />
            <p className="text-lg">{teacher.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Ученики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.students.map((student: any, index: number) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-white bg-opacity-20 p-4 rounded-xl shadow-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <img
              src={student.photo}
              alt={student.name}
              className="w-24 h-24 rounded-full mb-2 object-cover border-4 border-white"
            />
            <p className="text-lg">{student.name}</p>
            <p className="italic text-sm mt-2">"{student.quote}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
