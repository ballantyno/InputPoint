var InputPoint = (function (isAbstract) {
  /* Setup Class Defaults */
  ClassVehicle.setupClass(isAbstract, InputPoint);
  
  /* Tiny References */
  var C = InputPoint;
  var p = C.prototype;
  
  /* ----- Static Variables ----- */
  
  /* ----- Static Methods ----- */

  /**
   * @constructor
   * A device agnositic point reader. Handles both Mouse and Touch interface events and becomes a 
   * simple xy point.
   *
   * @param {Event} e - The input point (a MouseEvent or a TouchEvent)
   * @param {boolean?} parseGlobal - Optional. Parses the event globally. Defaults to false.
   */
  function InputPoint(e, parseGlobal) {
    ClassVehicle.checkAbstract.call(this, InputPoint); // Check Abstract-ness

    if (typeof parseGlobal === 'undefined') parseGlobal = false;

    /**
     * Set to true to get feedback in the form of console.logs.
     *
     * @type {boolean}
     */
    this.debug = false;

    /**
     * A list of the points stripped from the event. Length is often increased when there are 
     * multiple touch values (multiple fingers touching the screen at event creation).
     * 
     * @type {Point[]}
     */
    this.pointList = [];
    /**
     * The current or "first" point in the point list array. 
     * 
     * @type {Point}
     */
    this.primaryPoint = null;

    // Quick Reference Variables
    this.x = undefined;
    this.y = undefined;

    this._parseGlobal = parseGlobal;


    this._parseEventForPoint(e);
  }
  
  /* ----- Public Methods ----- */
  
  /* ----- Protected Methods ----- */
  
  /* ----- Private Methods ----- */
  p._parseEventForPoint = function (e) {
    if (this.debug) console.log("Parsing Event", e);
    if (e.touches) {
      if (this.debug) console.log("Unhandled touch interface -- Coming Soon");
    }
    else {
      if (this.debug) console.log("Mouse Event");
      if (this._parseGlobal) {
        this.primaryPoint = new Point(e.clientX, e.clientY);
      }
      else {
        this.primaryPoint = new Point(e.offsetX, e.offsetY);

        // For convenience, apply the primary point directly to this object
        this.x = this.primaryPoint.x;
        this.y = this.primaryPoint.y;
      }
    }
  };

  // Return the class, ready for a new ...()
  return InputPoint;
})(false);