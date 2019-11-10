import React, { Component } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export default class popularSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularSong: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/artist/${id}`)
      .then(response => {
        console.log("artists songs", response.data);
        this.setState({
          popularSong: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const popularSong = this.state.popularSong;
    return (
      (!popularSong && (
        <div>
          <h1 className="text-white">Loading...</h1>
        </div>
      )) || (
        <Container className="d-flex justify-content-center">
          <Row className="mt-5">
            <Col>
              <Card
                className="text-center text-success"
                style={{ width: "26rem" }}
                border="success"
              >
                <Card.Img variant="top" src={popularSong.album.images[0].url} />
                <Card.Body>
                  {popularSong.artists.map(artist => (
                    <Card.Title key={artist.id}>
                      <strong>{artist.name}</strong>
                    </Card.Title>
                  ))}

                  <Card.Text>
                    <strong>Popular song: </strong>
                    {popularSong.name}
                  </Card.Text>
                  <Card.Text>
                    <audio controls src={popularSong.preview_url}>
                      Code not supported
                      <code>audio</code> element.
                    </audio>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    );
  }
}
