"use client";

import React from "react";
import { projects } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section className="w-full bg-[#121212] py-24 px-4 md:px-12 lg:px-24 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
          <p className="text-xl text-white/60 max-w-2xl">
            A showcase of my recent projects, blending clean code with creative design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass rounded-2xl p-6 group hover:bg-white/10 transition-colors duration-300 relative overflow-hidden flex flex-col"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-3xl rounded-full"
                style={{ backgroundColor: project.color }}
              />

              <div className="text-4xl mb-6">{project.emoji}</div>
              
              <h3 className="text-2xl font-semibold mb-3 z-10">{project.title}</h3>
              <p className="text-white/70 mb-6 flex-grow z-10">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 z-10">
                {project.tech.slice(0, 4).map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 z-10">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium hover:text-white text-white/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium hover:text-white text-white/80 transition-colors"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
