// GoSquared
// ---------
// [Documentation](www.gosquared.com/support).
// [Tracker Functions](https://www.gosquared.com/customer/portal/articles/612063-tracker-functions)
// Will automatically [integrate with Olark](https://www.gosquared.com/support/articles/721791-setting-up-olark-live-chat).

var utils = require('../../utils');


module.exports = GoSquared;

function GoSquared () {
  this.settings = {
    siteToken : null
  };
}


// Changes to the GoSquared tracking code:
//
// * Use `siteToken` from settings.
// * No longer need to wait for pageload, removed unnecessary functions.
// * Attach `GoSquared` to `window`.
GoSquared.prototype.initialize = function (settings) {
  settings = utils.resolveSettings(settings, 'siteToken');
  utils.extend(this.settings, settings);

  var GoSquared = window.GoSquared = {};
  GoSquared.acct = this.settings.siteToken;
  GoSquared.q = [];

  window._gstc_lt =+ (new Date());
  var d = document;
  var g = d.createElement('script');
  g.type = 'text/javascript';
  g.async = true;
  var protocol = ('https:' === d.location.protocol) ? 'https:' : 'http:';
  g.src = protocol + '//d1l6p2sc9645hc.cloudfront.net/tracker.js';
  var s = d.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(g, s);
},


GoSquared.prototype.identify = function (userId, traits) {
  // TODO figure out if this will actually work. Seems like GoSquared will
  // never know these values are updated.
  if (userId) window.GoSquared.UserName = userId;
  if (traits) window.GoSquared.Visitor = traits;
};


GoSquared.prototype.track = function (event, properties) {
  // GoSquared sets a `gs_evt_name` property with a value of the event
  // name, so it relies on properties being an object.
  properties || (properties = {});

  window.GoSquared.q.push(['TrackEvent', event, properties]);
};


GoSquared.prototype.pageview = function (url) {
  var args = ['TrackView'];

  if (url) args.push(url);

  window.GoSquared.q.push(args);
};