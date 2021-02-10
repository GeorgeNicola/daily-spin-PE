var pf;
(function (pf) {
    var web;
    (function (web) {
        var rich;
        (function (rich) {
            var actions;
            (function (actions) {
                actions.claimbonus = function (claimid, onsuccess, onerror) {
                    if (typeof (claimid) === "string" && claimid === "error") {
                        fireEvent(onerror);
                    } else {
                        fireEvent(onsuccess);
                    }
                }
                actions.selectitem = function (itemid, onsuccess, onerror) {
                    if (typeof (itemid) === "string" && itemid === "error") {
                        fireEvent(onerror);
                    } else {
                        fireEvent(onsuccess);
                    }
                }
                var fireEvent = function (event, data) {
                    if (event !== undefined) {
                        if (data !== undefined) {
                            event(data);
                        } else {
                            event();
                        }
                    }
                }
            })(actions = rich.actions || (rich.actions = {}));

            var cta;
            (function (cta) {
                cta.initiatecta = function (action) {
                    console.log("initiatecta -> " + JSON.stringify(action));
                }
                cta.isctaenabled = function (actionid) {
                    console.log("isctaenabled -> ActionId: " + actionid);
                    return true;
                }
            })(cta = rich.cta || (rich.cta = {}));

            var tracking;
            (function (tracking) {
                tracking.trackevent = function (eventname, eventparameters) {
                    console.log("trackevent -> EventName: " + eventname.toString() + " EventParameters: " + eventparameters.toString());
                }
            })(tracking = rich.tracking || (rich.tracking = {}));
        })(rich = web.rich || (web.rich = {}));
    })(web = pf.web || (pf.web = {}));
})(pf || (pf = {}));
