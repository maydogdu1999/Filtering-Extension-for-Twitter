/**
 * override the XMLHttpRequest.prototype.open function of Twitter.
 * It intercepts the request and modify the response.
 */
var _open = XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(method, URL) {
    var _onreadystatechange = this.onreadystatechange,
        _this = this;

    _this.onreadystatechange = function() {
        // catch only for twitter timeline requests
        if (_this.readyState === 4 && _this.status === 200 && ~URL.indexOf('https://twitter.com/i/api/2/timeline/')) {
            try {

                var data = JSON.parse(_this.responseText); // {"fields": ["a","b"]

                //get the usernames to filter
                Usernames = localStorage.getItem("usernames").split(",");

                if (Usernames[0] !== "") { //Check if the list is empty
                    //go through each tweet in data.globalObjects.tweets, get user id for current tweet.
                    //find the user in data.globalObjects.users that has that user id.
                    //get the screen name for that user, which is the same username (screen name == user name actually)
                    //delete if not in the usernames list to filter.
                    for (const [key, value] of Object.entries(data.globalObjects.tweets)) {
                        var user_id = value.user_id_str;
                        if (data.globalObjects.users.hasOwnProperty(user_id)) {
                            for (var i = 0; i < Usernames.length; i++) {
                                if (data.globalObjects.users[user_id].screen_name === Usernames[i]) {
                                    break;
                                } else if (i === Usernames.length - 1) {
                                    delete data.globalObjects.tweets[key];
                                }
                            }

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