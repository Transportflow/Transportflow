import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import Button from "./Button";

class BackButton extends Component {
  render() {
    return (
      <Button
        onClick={() =>
          !this.props.to
            ? window.history.back()
            : this.props.history.push(this.props.to)
        }
      >
        <FontAwesomeIcon className="mr-2" icon={faChevronLeft} />
        Zurück
      </Button>
    );
  }
}

export default withRouter(BackButton);
