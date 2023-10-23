/* eslint-disable */

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import Fade from "react-reveal/Fade";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import ProjectCard from "./projects/ProjectCard";
import FallbackSpinner from "./FallbackSpinner";
import { Link } from "react-router-dom";

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
  linkWithoutUnderline: {
    textDecoration: "none" /* Remove the underline */,
    color: "inherit" /* Inherit the text color */,
  },
};

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);
  const numberOfItems = showMore && data ? data.length : 6;
  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Header title={header} />
      </div>
      {data ? (
        <div className="section-content-container">
          <Container style={styles.containerStyle}>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.projects?.slice(0, numberOfItems).map((project) => (
                <Fade key={project.title}>
                  <Link
                    to={`/project/${encodeURIComponent(project.title)}`}
                    style={styles.linkWithoutUnderline}
                  >
                    <ProjectCard project={project} />
                  </Link>
                </Fade>
              ))}
            </Row>

            {!showMore && (
              <Button
                style={styles.showMoreStyle}
                variant={theme.bsSecondaryVariant}
                onClick={() => setShowMore(true)}
              >
                show more
              </Button>
            )}
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
