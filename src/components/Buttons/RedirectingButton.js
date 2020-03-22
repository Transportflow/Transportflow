import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "./Button";

class RedirectingButton extends Component {
  render() {
    return (
      <Link to={this.props.to}>
        <Button>
          <span className="mr-2">{this.props.text || "Weiter"}</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </Link>
    );
  }
}

export default RedirectingButton;
