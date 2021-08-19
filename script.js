var _open = XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(method, URL) {
    var _onreadystatechange = this.onreadystatechange,
        _this = this;

    _this.onreadystatechange = function() {
        // catch only completed 'api/search/universal' requests
        if (_this.readyState === 4 && _this.status === 200 && ~URL.indexOf('https://twitter.com/i/api/2/timeline/home.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&earned=1&count=20&lca=true&ext=mediaStats%2ChighlightedLabel%2CvoiceInfo')) {
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