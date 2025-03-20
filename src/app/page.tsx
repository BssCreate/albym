"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card";

export default function Album() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/album")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="text-center text-xl">Загрузка...</p>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: `url(${data.background})`, backgroundSize: "cover" }}
    >
      <motion.h1
        className="text-4xl font-bold mb-4 bg-black bg-opacity-50 p-4 rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Класс {data.class}
      </motion.h1>

      <Card name={data.teacher.name} photo={data.teacher.photo} quote={data.teacher.quote} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {data.teachers.map((teacher: any, index: number) => (
          <Card key={index} name={teacher.name} photo={teacher.photo} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.students.map((student: any, index: number) => (
          <Card key={index} name={student.name} photo={student.photo} quote={student.quote} />
        ))}
      </div>
    </div>
  );
}
