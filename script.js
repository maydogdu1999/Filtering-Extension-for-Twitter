/** 
window.addEventListener("message", (event) => {
    // We only accept messages from ourselves
    if (event.data.userNames) {
        var userNames = event.data.userNames;
        console.log("script.js " + userNames);
    }
}, false); */

var _open = XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(method, URL) {
    var _onreadystatechange = this.onreadystatechange,
        _this = this;

    _this.onreadystatechange = function() {
        // catch only completed 'api/search/universal' requests
        if (_this.readyState === 4 && _this.status === 200 && ~URL.indexOf('https://twitter.com/i/api/2/timeline/')) {
            try {
                //////////////////////////////////////
                // THIS IS ACTIONS FOR YOUR REQUEST //
                //             EXAMPLE:             //
                //////////////////////////////////////
                var data = JSON.parse(_this.responseText); // {"fields": ["a","b"]}


                for (const [key, value] of Object.entries(data.globalObjects.tweets)) {
                    var user_id = value.user_id_str;
                    if (data.globalObjects.users.hasOwnProperty(user_id)) {
                        if (data.globalObjects.users[user_id].screen_name !== "aDilipak") {
                            delete data.globalObjects.tweets[key];
                        }
                    }
                }


                // rewrite responseText
                Object.defineProperty(_this, 'responseText', { value: JSON.stringify(data) });
                /////////////// END //////////////////
            } catch (e) {}

            console.log('Caught! :)', method, URL /*, _this.responseText*/ );
        }
        // call original callback
        if (_onreadystatechange) _onreadystatechange.apply(this, arguments);
    };

    // detect any onreadystatechange changing
    Object.defineProperty(this, "onreadystatechange", {
        get: function() {
            return _onreadystatechange;
        },
        set: function(value) {
            _onreadystatechange = value;
        }
    });

    return _open.apply(_this, arguments);
};