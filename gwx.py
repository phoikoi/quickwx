import os, sys
from pathlib import Path

import requests

WU_URL = "http://api.wunderground.com/api/{0}/conditions/hourly10day/forecast10day/q/{1}.json"

def main():
    WUKEY = os.getenv("WUKEY")
    DEST_DIR = Path("~/web")
    
    if len(sys.argv)>1:
        station = sys.argv[1]
    else:
        station = 'KLAX'

    print((Path(DEST_DIR).expanduser() / f"wx{station}.json").resolve())
    if WUKEY:
        data = requests.get(WU_URL.format(WUKEY, station)).content
        (Path(DEST_DIR).expanduser().resolve() / f"wx{station}.json").write_bytes(data)
    else:
        sys.stderr.write("Need WUKEY env var to grab WU json data\n")
        sys.stderr.flush()
        sys.exit(1)

if __name__ == "__main__":
    main()


