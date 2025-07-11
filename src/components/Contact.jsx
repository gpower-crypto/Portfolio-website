import React, {
  useEffect,
  useState,
  useContext,
} from "react";
import {
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const styles = {
  contactContainer: {
    marginTop: 50,
    marginBottom: 50,
  },
  contactCard: {
    padding: 30,
    margin: 20,
    borderRadius: 15,
    textAlign: "center",
    minHeight: 200,
  },
  contactTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: 15,
  },
  contactDescription: {
    fontSize: "1rem",
    marginBottom: 20,
    lineHeight: "1.6",
  },
  contactInfo: {
    fontSize: "1.1rem",
    fontWeight: "500",
    marginBottom: 15,
  },
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  socialIcon: {
    margin: "0 10px",
  },
  introText: {
    fontSize: "1.2rem",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: "1.8",
  },
};

function Contact(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.contact, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Header title={header} />
      </div>
      {data ? (
        <div className="section-content-container">
          <Container style={styles.contactContainer}>
            <Fade>
              <p style={{ ...styles.introText, color: theme.color }}>
                {data.intro}
              </p>
            </Fade>

            <Row>
              {data.contactMethods.map((method, index) => (
                <Col md={4} key={method.title}>
                  <Fade delay={index * 200}>
                    <Card
                      style={{
                        ...styles.contactCard,
                        backgroundColor: theme.cardBackground,
                        border: `1px solid ${theme.cardBorderColor}`,
                        color: theme.color,
                      }}
                    >
                      <div style={styles.contactTitle}>{method.title}</div>
                      <p style={styles.contactDescription}>
                        {method.description}
                      </p>
                      <div style={styles.contactInfo}>{method.value}</div>
                      {method.social && (
                        <div style={styles.socialContainer}>
                          <SocialIcon
                            style={styles.socialIcon}
                            url={method.link}
                            network={method.social}
                            bgColor={theme.socialIconBgColor}
                            target="_blank"
                            rel="noopener"
                            height={40}
                            width={40}
                          />
                        </div>
                      )}
                      {method.link && !method.social && (
                        <a
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: theme.accentColor,
                            textDecoration: "none",
                            fontWeight: "bold",
                          }}
                        >
                          {method.linkText || "Visit"}
                        </a>
                      )}
                    </Card>
                  </Fade>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Contact.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Contact;
