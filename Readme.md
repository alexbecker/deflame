Deflame
=======

### What it is:

Deflame is a Chrome extension intended to improve discourse on WordPress blogs 
by allowing users to share their perception of the argument with others. 

### What it does:

When a supported site is detected, the Deflame icon will appear in the address bar.
Click to get agree/disagree/ignore on each comment, which indicate how you feel about
the *author* of the comment. Click again to remove all "ignored" comments and add
a table of who you (dis)agree with at the top of the page. This comes with a short link
to a version hosted at defla.me so you can show other commenters how you see the conversation.

### Why:

The biggest problem with online debates is that each side gets their impression from the
inevitable chunk of loud asshats or outright trolls on the other side. Now not only can
you inform others of what you consider "your side", you can inform them of what you consider
theirs as well--which you might well have gotten wrong, and now they can tell you.

### Non-Chrome Alternatives:

You can copy and past the post url to defla.me/deflame.php?url=[insert url], 
but the user experience is inferior.

### FAQs:

* **Why is it by author, not comment?** Because people tend to understand discussions
in that way. If you only want to tell people what you believe yourself, just tell them.

* **Why am I getting HTTPS warnings?** Because I haven't bought an HTTPS certificate.
You can still use [the webapp](defla.me/webapp.html).

### Known issues:

Many. The web is a nonstandard nightmare, and recognizing what is and isn't a comment is
probably AI-complete. The extension has a heuristic for guessing that works in most cases,
but it will never be perfect. The placement of buttons is also variable and sometimes sub-optimal, 
because the format of comments is inconsistent. Some sites for which the icon appears are
probably unsupported. This is probably unfixable, but it's due to how Chrome extensions work
rather than the websites themselves.

Currently only HTTP is supported, so sites that use HTTPS can only be used through 
[the webapp](defla.me/webapp.html). This may change once HTTPS certs become free later this year.

A list of known supported/unsupported files is given in supported.md.

### Licensing:

All code and documentation in this repository is licensed under the Apache 2.0 License, located in
License.txt. The images are not mine, and their licenses can be found below.

### Credits:

Icons are courtesy of [www.flatpack.com](http://www.flatpack.com) and available under 
[CC-BY-SA 3.0](http://creativecommons.org/licenses/by/3.0/);
both have been resized by me but are otherwise unaltered.

* handshake.png and handshake_large.png by [Icons8](http://www.icons8.com).

* next.png is by [Freepik](http://www.freepik.com).
