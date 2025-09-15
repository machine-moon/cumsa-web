"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoCalendarOutline,
  IoLocationSharp,
  IoCash,
  IoTimeOutline,
  IoArrowForward,
  IoClose,
} from "react-icons/io5";
import { to12Hour } from "@/lib/to12Hour";

type Event = {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  fee?: string;
  link?: string;
  image?: string;
  imageStyle?: "cover" | "contain" | "fill" | "scale-down" | "none";
  description?: string;
};

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!event) return null;

  const getImageClassName = (style: string | undefined) => {
    switch (style) {
      case "contain":
        return "object-contain";
      case "fill":
        return "object-fill";
      case "scale-down":
        return "object-scale-down";
      case "none":
        return "object-none";
      case "cover":
      default:
        return "object-cover";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    },
  };

  const infoCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 500, damping: 30 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[60vh] overflow-hidden"
          >
            <motion.div
              variants={contentVariants}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-3xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                <span className="text-xs font-medium text-gray-600">✨ Event Details</span>
              </div>
              <motion.button
                onClick={onClose}
                className="p-1.5 hover:bg-white/70 rounded-full transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose className="w-4 h-4 text-gray-500" />
              </motion.button>
            </motion.div>

            <div className="overflow-y-auto max-h-[calc(60vh-60px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                <motion.div variants={contentVariants} className="lg:col-span-2 space-y-3 p-4">
                  <motion.div
                    variants={contentVariants}
                    className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  >
                    <Image
                      src={event.image || "/MSA.png"}
                      alt={event.title}
                      fill
                      className={`${getImageClassName(event.imageStyle)}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                  </motion.div>

                  <motion.h2
                    variants={contentVariants}
                    className="text-lg font-bold text-gray-800 leading-tight"
                  >
                    {event.title}
                  </motion.h2>
                </motion.div>

                <motion.div variants={contentVariants} className="lg:col-span-3 p-4 space-y-3">
                  <motion.div className="space-y-2">
                    <motion.div
                      variants={infoCardVariants}
                      className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg"
                      whileHover={{ scale: 1.02, backgroundColor: "rgb(239 246 255)" }}
                    >
                      <div className="p-1 bg-blue-100 rounded-md">
                        <IoCalendarOutline className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium text-xs">
                        {formatDate(event.date)}
                      </span>
                    </motion.div>

                    {event.time && (
                      <motion.div
                        variants={infoCardVariants}
                        className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg"
                        whileHover={{ scale: 1.02, backgroundColor: "rgb(255 247 237)" }}
                      >
                        <div className="p-1 bg-orange-100 rounded-md">
                          <IoTimeOutline className="w-3 h-3 text-orange-600" />
                        </div>
                        <span className="text-gray-700 font-medium text-xs">
                          {to12Hour(event.time)}
                        </span>
                      </motion.div>
                    )}

                    <motion.div
                      variants={infoCardVariants}
                      className="flex items-center gap-2 p-2 bg-green-50 rounded-lg"
                      whileHover={{ scale: 1.02, backgroundColor: "rgb(240 253 244)" }}
                    >
                      <div className="p-1 bg-green-100 rounded-md">
                        <IoLocationSharp className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-xs">{event.location}</span>
                    </motion.div>

                    {event.fee && (
                      <motion.div
                        variants={infoCardVariants}
                        className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg"
                        whileHover={{ scale: 1.02, backgroundColor: "rgb(254 249 195)" }}
                      >
                        <div className="p-1 bg-yellow-100 rounded-md">
                          <IoCash className="w-3 h-3 text-yellow-600" />
                        </div>
                        <span className="text-gray-700 font-medium text-xs">{event.fee}</span>
                      </motion.div>
                    )}
                  </motion.div>

                  {event.description && (
                    <motion.div
                      variants={contentVariants}
                      className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-3 rounded-xl border border-gray-100"
                    >
                      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--blue)" }}>
                        About this Event
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-xs">
                        {event.description}
                      </p>
                    </motion.div>
                  )}

                  {event.link && (
                    <motion.div variants={contentVariants} className="pt-2">
                      <Link
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <motion.div
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 font-medium rounded-xl transition-all duration-200 shadow-md text-sm"
                          style={{
                            background: "var(--blue)",
                            color: "#fff",
                          }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 8px 25px -8px rgba(59, 130, 246, 0.5)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <IoArrowForward className="w-3 h-3" />
                          Register for Event
                        </motion.div>
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
