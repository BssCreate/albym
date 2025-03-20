"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Album() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData({
      background: "/background.jpg",
      class: "10-А",
      teacher: {
        name: "Иванова Мария Петровна",
        photo: "/teacher.jpg",
        quote: "Учение — свет, а неучение — тьма!"
      },
      students: [
        { name: "Алексей Смирнов", photo: "/student1.jpg", quote: "Только вперёд!" },
        { name: "Анна Кузнецова", photo: "/student2.jpg", quote: "Сложности делают нас сильнее." }
      ]
    });
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.students.map((student: any, index: number) => (
          <Card key={index} name={student.name} photo={student.photo} quote={student.quote} />
        ))}
      </div>
    </div>
  );
}

function Card({ name, photo, quote }: { name: string; photo: string; quote?: string }) {
  return (
    <motion.div
      className="flex flex-col items-center bg-white bg-opacity-20 p-4 rounded-xl shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Image src={photo} alt={name} width={100} height={100} className="rounded-full mb-2" priority />
      <p className="text-lg font-bold">{name}</p>
      {quote && <p className="italic text-sm mt-2">"{quote}"</p>}
    </motion.div>
  );
}
