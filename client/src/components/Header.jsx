/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const searchVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.8,
      },
    },
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative overflow-hidden">
      <motion.div
        className="text-center mt-20 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Badge */}
        <motion.div
          variants={badgeVariants}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary cursor-pointer"
        >
          <p>New: AI feature integrated</p>
          <motion.img
            src={assets.star_icon}
            className="w-2.5"
            alt=""
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Animated Title */}
        <motion.h1
          variants={titleVariants}
          className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700"
        >
          Your own{" "}
          <motion.span
            className="text-primary"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #3B82F6)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            blogging
          </motion.span>
          <br />
          platform.
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          variants={itemVariants}
          className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500"
        >
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </motion.p>

        {/* Animated Search Form */}
        <motion.form
          onSubmit={onSubmitHandler}
          variants={searchVariants}
          whileHover={{ scale: 1.02 }}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
            whileFocus={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
          />
          <motion.button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Search
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Animated Clear Button */}
      <motion.div className="text-center">
        {input && (
          <motion.button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer hover:bg-gray-50 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Clear Search
          </motion.button>
        )}
      </motion.div>

      {/* Animated Background */}
      <motion.img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: 0.5,
          scale: 1,
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default Header;
