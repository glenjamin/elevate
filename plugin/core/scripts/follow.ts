// This code is from Google, so let's not modify it too much, just add gaNewElem and gaElems:
import { CoreEnv } from "../config/core-env";

const currentDate: any = new Date();
(function (i: any, s: any, o: any, g: any, r: any, a?: any, m?: any) {
	i.GoogleAnalyticsObject = r;
	i[r] = i[r] || function () {
		(i[r].q = i[r].q || []).push(arguments);
	}, i[r].l = 1 * currentDate;
	a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m);
})(window, document, "script", "//www.google-analytics.com/analytics.js", "follow");

follow("create", CoreEnv.analyticsTrackingID, "auto");
follow("send", "pageview");
