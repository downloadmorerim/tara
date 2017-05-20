/**
 * @overview Contains module component to load a module with
 */
import { ipcRenderer as ipc } from "electron"; // eslint-disable-line
import { join } from "path";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { PLUGIN_CONFIG, PLUGIN_LOCATION, PLUGIN_CORE_LOCATION } from "../renderer/constants";

export default class Module extends Component {
  constructor(props) {
    super(props);
    // Default state
    this.state = {
      contents: (<h1>Module {props.module} needed</h1>)
    };
  }

  componentWillMount() {
    // Get plugin's client & listen for it
    const plugin_config = require(PLUGIN_CONFIG);
    let pluginJSON;
    let plugin_location;
    if (plugin_config.dependencies.hasOwnProperty(this.props.module)) {
      plugin_location = join(PLUGIN_LOCATION, this.props.module);
      pluginJSON = require(join(plugin_location, "package.json"));
      // Check if
    } else {
      plugin_location = join(PLUGIN_CORE_LOCATION, this.props.module);
      pluginJSON = require(join(plugin_location, "package.json"));
    }
    // Get & send
    if (pluginJSON.tara.hasOwnProperty("client")) {
      this.setState({ contents: require(join(plugin_location, pluginJSON.tara.client)).default });
    } else {
      this.setState({ contents: require(join(plugin_location, pluginJSON.main)).default });
    }
  }
  render() {
    return (<this.state.contents />);
  }
}

Module.propTypes = {
  module: PropTypes.string.isRequired
};