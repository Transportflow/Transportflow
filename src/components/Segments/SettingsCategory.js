import React, {Component} from 'react';

/*
PROPS
title
description
 */
class SettingsCategory extends Component {
    render() {
        return (
            <>
                <h2 className="dark\:text-gray-200 font-semibold font-inter text-xl">{this.props.title}</h2>
                <p className="font-inter text-gray-700 dark\:text-gray-400 mb-2">{this.props.description}</p>
            </>
        );
    }
}

export default SettingsCategory;