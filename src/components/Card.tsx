import { motion } from "framer-motion";

interface CardProps {
  name: string;
  photo: string;
  quote?: string;
}

export default function Card({ name, photo, quote }: CardProps) {
  return (
    <motion.div
      className="flex flex-col items-center bg-white bg-opacity-20 p-4 rounded-xl shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src={photo}
        alt={name}
        className="w-24 h-24 rounded-full mb-2 object-cover border-4 border-white"
      />
      <p className="text-lg font-bold">{name}</p>
      {quote && <p className="italic text-sm mt-2">"{quote}"</p>}
    </motion.div>
  );
}
