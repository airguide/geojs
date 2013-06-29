//////////////////////////////////////////////////////////////////////////////
/**
 * @module ogs.geo
 */
//////////////////////////////////////////////////////////////////////////////

/*jslint devel: true, forin: true, newcap: true, plusplus: true,
   white: true, indent: 2*/
/*global geoModule, ogs, inherit, $*/

//////////////////////////////////////////////////////////////////////////////
/**
 * Layer options object specification
 */
//////////////////////////////////////////////////////////////////////////////
geoModule.layerOptions = function() {
  "use strict";
  // Check against no use of new()
  if (!(this instanceof geoModule.layerOptions)) {
    return new geoModule.layerOptions();
  }

  this.opacity = 1;
  this.showAttribution = true;
  this.visible = true;
  this.binNumber = -1;

  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Base class for all layer types ogs.geo.layer represents any object that be
 * rendered on top of the map base. This could include image, points, line, and
 * polygons.
 */
//////////////////////////////////////////////////////////////////////////////
geoModule.layer = function(options, source) {
  "use strict";
  this.events = {
    "opacitychange" : "opacitychange"
  };

  if (!(this instanceof geoModule.layer)) {
    return new geoModule.layer(options, source);
  }
  ogs.vgl.object.call(this);

  if (!options) {
    options = geoModule.layerOptions();
  }

  /** @private */
  var m_that = this,
      m_name = "",
      m_dataSource = source,
      m_opacity = options.opacity || 1.0,
      m_showAttribution = options.showAttribution || true,
      m_visible = options.visible || true,
      m_binNumber = -1;

  // TODO Write a function for this
  if (m_opacity > 1.0) {
    m_opacity = 1.0;
    console.log("[warning] Opacity cannot be greater than 1.0");
  } else if (m_opacity < 0.0) {
    console.log("[warning] Opacity cannot be less than 1.0");
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the underlying drawable entity.
   * @returns {geoModule.feature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.features = function() {
    return null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set feature.
   *
   * @param {ogs.vgl.actor}
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setFeatures = function(features) {
    // Concrete class should implement this
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get id of the layer
   *
   * @returns {String}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.id = function() {
    return m_id;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set id of the layer
   *
   * @param {String} name
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setId = function(id) {
    if (m_id !== id) {
      m_id = id;
      this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get name of the layer
   *
   * @returns {String}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.name = function() {
    return m_name;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set name of the layer
   *
   * @param {String} name
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setName = function(name) {
    if (m_name !== name) {
      m_name = name;
      this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Query opacity of the layer (range[0.0, 1.0])
   */
  ////////////////////////////////////////////////////////////////////////////
  this.opacity = function() {
    return m_opacity;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set opacity of the layer in the range of [0.0, 1.0]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setOpacity = function(val) {
    m_opacity = val;
    this.updateLayerOpacity(m_opacity);
    this.modified();
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get if layer is visible. This should be implemented by the derived class
   *
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.visible = function() {
    // return m_feature.visible();
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set layer visible true or false. This should be implemented by the
   * the derived class.
   *
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setVisible = function(flag) {
    return false;
  };

  /**
   * Get source of the layer
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.dataSource = function() {
    return m_dataSource;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set source of the layer
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setDataSource = function(source) {
    if (m_dataSource !== source) {
      m_dataSource = source;
      this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get bin number of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.binNumber = function() {
    return m_binNumber;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set bin number of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setBinNumber = function(binNumber) {
    if (m_binNumber && m_binNumber === binNumber) {
      return false;
    }

    m_binNumber = binNumber;
    this.modified();
    return true;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Virtual function to update the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.update = function(time) {
    // Concrete class should implement this
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Prepare layer for rendering
   */
  ////////////////////////////////////////////////////////////////////////////
  this.prepareForRendering = function(layersDrawables) {
    // Concrete class should implement this
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the modified time for the last update that did something
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getUpdateTime = function() {
    // Concrete class should implement this
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Virtual slot to handle opacity change Concrete class should implement this
   * method.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateLayerOpacity = function() {
    // Concrete class should implement this
  };

  return this;
};

inherit(geoModule.layer, ogs.vgl.object);