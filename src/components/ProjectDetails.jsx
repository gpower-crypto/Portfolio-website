// ProjectDetails.js
/* eslint-disable */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import projectsData from "./projects/projects.json";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

const styles = {
  container: {
    padding: "20px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "20px 0",
    textAlign: "left",
  },
  body: {
    fontSize: "18px",
    lineHeight: "1.6",
    textAlign: "left",
    marginBottom: "20px",
  },
};

const ProjectDetails = () => {
  // Get the project title from the URL
  const { title } = useParams();

  // Find the project data based on the title
  const project = projectsData.projects.find((p) => p.title === title);

  const [isOpen, setIsOpen] = useState(false);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div style={styles.container}>
      {/* Title */}
      <div style={{ margin: "30px" }}>
        <h2 style={styles.title}>{project.title}</h2>
      </div>
      {/* Overview Header */}
      <h3 style={styles.header}>Overview</h3>
      {/* Overview Body */}
      <p style={styles.body}>{project.overview}</p>

      {/* Tech Stacks and Frameworks Header */}
      <h3 style={styles.header}>Tech Stacks and Frameworks</h3>
      {/* Tech Stacks and Frameworks Body */}
      <ul style={styles.body}>
        {project.techStacksAndFrameworks.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>

      {/* Links Header */}
      <h3 style={styles.header}>GitHub Links</h3>
      {/* Links Body */}
      <p style={styles.body}>
        {project.links
          .filter(
            (link) =>
              link.text.toLowerCase().includes("github") &&
              !link.text.toLowerCase().includes("readme")
          )
          .map((link, index) => (
            <span key={index}>
              -{" "}
              <a target="_blank" href={link.href} style={styles.link}>
                {link.text}
              </a>
              <br />
            </span>
          ))}
      </p>

      {/* Project Images and Videos Body */}
      <p style={styles.body}>
        {project.images && project.images.length > 0 && (
          <div>
            <h3 style={styles.header}>Project Images</h3>

            {project.images.map((image, index) => (
              <span key={index}>
                -{" "}
                <a
                  href={image}
                  style={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Image {index + 1}
                </a>
                <br />
              </span>
            ))}
          </div>
        )}
        {/* Video Modal */}
        <ModalVideo
          channel="youtube"
          youtube={{ start: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId={project.video}
          onClose={() => setIsOpen(false)}
        />

        {/* Video Link */}
        {project.video && (
          <div>
            <h3 style={styles.header}>Video</h3>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
              style={styles.link}
            >
              Click to watch the video
            </a>
          </div>
        )}
      </p>

      {/* See More Header */}
      <h3 style={styles.header}>See More</h3>
      {/* See More Body */}
      <p style={styles.body}>
        {project.links
          .filter(
            (link) =>
              !link.text.toLowerCase().includes("github") &&
              !link.text.toLowerCase().includes("Expo Live Link")
          )
          .map((readmeLink, index) => (
            <span key={index}>
              -{" "}
              <a
                href={readmeLink.href}
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {readmeLink.text}{" "}
              </a>
              <br />
            </span>
          ))}
      </p>
    </div>
  );
};

export default ProjectDetails;
