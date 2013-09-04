//////////////////////////////////////////////////////////////////////////////
/**
 * @module ogs.geo
 */

/*jslint devel: true, forin: true, newcap: true, plusplus: true*/
/*jslint white: true, indent: 2*/

/*global geoModule, ogs, inherit, $, HTMLCanvasElement, Image*/
/*global vglModule, document*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of latlng
 *
 * A latlng encapsulates geodesy coordinates defined by latitude and
 * longitude
 * @returns {geoModule.latlng}
 */
//////////////////////////////////////////////////////////////////////////////
geoModule.latlng = function(lat, lng) {
  "use strict";
  if (!(this instanceof geoModule.latlng)) {
    return new geoModule.latlng(lat, lng);
  }

  /** @priave */
  var m_lat = lat,
      m_lng = lng;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return latitude
   */
  //////////////////////////////////////////////////////////////////////////////
  this.lat = function() {
    return m_lat;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return longitude
   */
  //////////////////////////////////////////////////////////////////////////////
  this.lng = function() {
    return m_lng;
  };

  return this;
};
