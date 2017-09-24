import os, sys
from pathlib import Path

import requests

# Latitude and longitude of Griffith Observatory, Los Angeles
LAT = "34.118"
LON = "-118.3"
WU_URL = "http://api.wunderground.com/api/{0}/hourly10day/forecast10day/q/{1},{2}.json"

def main():
    WUKEY = os.getenv("WUKEY")
    DEST_DIR = os.getenv("DEST_DIR", Path(__file__).parent)
    if WUKEY:
        data = requests.get(WU_URL.format(WUKEY, LAT, LON)).content
        (Path(DEST_DIR).expanduser().resolve() / "wx.json").write_bytes(data)
    else:
        sys.stderr.write("Need WUKEY env var to grab WU json data\n")
        sys.stderr.flush()
        sys.exit(1)

if __name__ == "__main__":
    main()


