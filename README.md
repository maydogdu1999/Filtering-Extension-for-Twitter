# Filtering-Extension-for-Twitter

This is a Google Chrome Extension to filter your tweets in your Twitter timeline by creating custom categories.

You can create a custom category and add usernames to it. When you click "apply", only the usernames in your selected categories will be shown on your timeline.

How It Works: It injects a script into Twitter's DOM, which intercepts the request made by Twitter to receive the tweets and modifies the response body by selecting the tweets from the desired usernames.

Is it fast? Yes, it is pretty fast; it doesn't really slow down the process of tweets getting uploaded.
