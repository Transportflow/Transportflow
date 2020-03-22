import React from "react";

class Button extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={
          "bg-gray-300 dark\\:bg-gray-700 dark\\:text-gray-400 dark-hover\\:bg-gray-900 hover:shadow-md transition-bg cursor-pointer duration-200 px-4 py-3 mx-auto rounded-lg inline-flex items-center " +
          this.props.className
        }
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
