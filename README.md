# quickwx

This project is a little JS hack so that I could see the
upcoming 10 days of weather data at a glance.

The HTML/JS grabs a JSON file from its own server for the data
to display.  The two Python files are what I use to grab the JSON
files from Weather Underground (with a cron job, every few hours.)
You will need an API key to grab the JSON, and provide it to the
Python file when you call it:

```shell
WU_KEY=<your_key_here> python3.6 grabwx.py
```

You can also pass a parameter to specify the destination directory
that the JSON file should be written into:

```shell
WU_KEY=<your_key_here> DEST_DIR=<path_to_dir> python3.6 grabwx.py
```

As you might have noticed from the above examples, the Python files
require Python 3.6 or above, because of the use of `pathlib.Path`.

I have included several example JSON files in the `example-files.zip`
archive, so you don't have to go get an API key just to see some results.
They're also useful reference material if one were to decide to make
some modifications. :)

In the HTML output, some of the displayed items are obvious (icons, etc.)
but some might need a bit of explanation:

* The three colored numbers are the high temperature, low temperature,
  and average dewpoint for the day.  This, along with the hint given
  by the icon, gives you a pretty good idea of how the weather will
  be in general.  But if you want more detail, the bar on the far
  right gives you more detail, in six tracks of data.

* The six tracks are as follows, top down.

  1.  Temperature.  The colors are the same as the numbers in the
      high and low temps on the left, and are fairly obvious: cooler
      colors (blues, greens) for cold temps, and warm colors (yellow,
      orange, red) for the hotter temps.
  2.  Dewpoint.  Again, the color scale is the same as the average
      dewpoint number.  The dewpoint is mostly useful when the
      temperature is above about 70°F or so, since that's when the
      humidity starts to matter as far as human comfort level goes.
      Again, the warmer colors indicate an increasingly uncomfortable
      level.
  3.  Wind direction.  This one is the one that takes some learning
      and practice to read properly.  The colors correspond to the
      HSL hue wheel, where red is at 0°, green at 120°, and blue at
      240°.  Therefore, the colors show which direction the wind is
      *coming from*: red is due north, cyan (halfway between green and
      blue) is due south, purple is due west, and chartreuse (bright
      yellow-green) is due east.  Between these, the colors vary
      accordingly, so for example yellow is approximately northeast,
      magenta is northwest, etc.
  4.  Wind speed.  This is a pretty obvious color scale: various blues for
      ordinary winds, greens for tropical storm force, and yellows/reds
      for hurricane force.
  5.  Probability of precipitation (POP).  (AKA how likely it is to rain.)
      Also a color scale similar to one for wind speed, but topping out
      at 100% with solid red.
  6.  QPF (aka how much will it rain.)  This is a slightly different
      color scale, topping out at >10" per hour.

I'm mostly a Python developer, so please forgive any egregious Javascript
sins you might observe.  The JS does use some ES6 features, so it probably
won't run on older browsers, but since I wrote it pretty much just for
myself, I don't actually care. :p

The CSS also uses modern features, such as the Grid feature that recently
landed.

Enjoy.


