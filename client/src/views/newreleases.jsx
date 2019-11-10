import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export default class artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newreleases: null
    };
  }

  componentDidMount() {
    axios
      .get("/newreleases")
      .then(response => {
        console.log(response.data);
        this.setState({
          newreleases: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const newreleases = this.state.newreleases;
    return (
      (!newreleases && (
        <div>
          <h1 className="text-white">Loading...</h1>
        </div>
      )) || (
        <Container>
          <h1 className="text-success text-center mt-5">New Released Songs</h1>
          <Row className="mt-5">
            {newreleases.map((releaseItems, index) => (
              <Col className="mb-5">
                <Card
                  style={{ width: "11rem", height: "42rem" }}
                  border="success"
                  className="rounded-pill"
                >
                  <Card.Img
                    src={releaseItems.images[0].url}
                    className="rounded-circle"
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-lighter  ml-5 ml-3">
                      <h5>
                        <strong className=" ml-3">{index + 1}</strong>
                      </h5>
                    </Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    {releaseItems.artists.map(artist => (
                      <Container>
                        <ListGroupItem>
                          <h6>
                            <strong>{artist.name}</strong>{" "}
                          </h6>
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Title: </strong>
                          {releaseItems.name}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Release Date: </strong>
                          {releaseItems.release_date}
                        </ListGroupItem>
                        <Card.Body>
                          <Card.Link
                            className="text-success"
                            href={`/artist/${artist.id}`}
                          >
                            <Button variant="success" className="rounded-pill">
                              View Popular Song
                            </Button>
                          </Card.Link>
                        </Card.Body>
                      </Container>
                    ))}
                  </ListGroup>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )
    );
  }
}
