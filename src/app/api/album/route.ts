import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    background: "/background.jpg",
    class: "10-А",
    teacher: {
      name: "Иванова Мария Петровна",
      photo: "/teacher.jpg",
      quote: "Учение — свет, а неучение — тьма!"
    },
    teachers: [
      { name: "Петров Сергей Викторович", photo: "/teacher1.jpg" },
      { name: "Сидорова Ольга Николаевна", photo: "/teacher2.jpg" }
    ],
    students: [
      { name: "Алексей Смирнов", photo: "/student1.jpg", quote: "Только вперёд!" },
      { name: "Анна Кузнецова", photo: "/student2.jpg", quote: "Сложности делают нас сильнее." },
      { name: "Дмитрий Иванов", photo: "/student3.jpg", quote: "Учиться — значит жить." }
    ]
  };

  return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate" } });
}
