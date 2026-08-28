"""Local Aapda Buddy server with same-origin proxies for official public alerts."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import json
import os
import re
import socket
from html import unescape

HOST = "0.0.0.0"
PORT = 4174
NDMA_FEED = "https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails"
USGS_RECENT_EARTHQUAKES = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
INCOIS_EVENTS = "https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json"
ACTIVE_SATELLITES = "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=json"


class AapdaBuddyHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent), **kwargs)

    def do_GET(self):
        if self.path.rstrip("/") == "/api/ndma-alerts":
            self.proxy_ndma_alerts()
            return
        if self.path.rstrip("/") == "/api/ncs-earthquakes":
            self.proxy_ncs_earthquakes()
            return
        if self.path.rstrip("/") == "/api/incois-events":
            self.proxy_incois_events()
            return
        if self.path.rstrip("/") == "/api/dashboard-metrics":
            self.proxy_dashboard_metrics()
            return
        super().do_GET()

    def proxy_ndma_alerts(self):
        try:
            request = Request(NDMA_FEED, headers={"User-Agent": "AapdaBuddy-demo/1.0"})
            with urlopen(request, timeout=15) as response:
                payload = response.read()
            json.loads(payload)  # Reject unexpected non-JSON responses.
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(payload)
        except (URLError, HTTPError, TimeoutError, json.JSONDecodeError) as error:
            message = json.dumps({"error": "NDMA public alert feed is temporarily unavailable."}).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(message)

    def proxy_ncs_earthquakes(self):
        """Expose the public USGS recent-earthquake feed as small, structured JSON."""
        try:
            request = Request(USGS_RECENT_EARTHQUAKES, headers={"User-Agent": "AapdaBuddy-demo/1.0"})
            with urlopen(request, timeout=20) as response:
                feed = json.loads(response.read())
            events = []
            for feature in feed.get("features", []):
                properties = feature.get("properties") or {}
                coordinates = (feature.get("geometry") or {}).get("coordinates") or []
                if properties.get("mag") is None or len(coordinates) < 3:
                    continue
                event_time = __import__("datetime").datetime.fromtimestamp(properties["time"] / 1000, __import__("datetime").timezone.utc).isoformat().replace("+00:00", "Z")
                events.append({"origin_time": event_time, "latitude": coordinates[1], "longitude": coordinates[0], "depth_km": coordinates[2], "magnitude": properties["mag"], "location": properties.get("place") or "Unknown location", "detail": properties.get("url"), "source": "USGS Earthquake Hazards Program"})
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(json.dumps(events[:20]).encode())
        except (URLError, HTTPError, TimeoutError, ValueError) as error:
            message = json.dumps({"error": "USGS public earthquake feed is temporarily unavailable."}).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(message)

    def proxy_incois_events(self):
        try:
            request = Request(INCOIS_EVENTS, headers={"User-Agent": "AapdaBuddy/1.0"})
            with urlopen(request, timeout=20) as response:
                payload = response.read()
            json.loads(payload)
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(payload)
        except (URLError, HTTPError, TimeoutError, json.JSONDecodeError):
            message = json.dumps({"error": "INCOIS tsunami feed is temporarily unavailable."}).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(message)

    def proxy_dashboard_metrics(self):
        try:
            request = Request(ACTIVE_SATELLITES, headers={"User-Agent": "AapdaBuddy-demo/1.0"})
            with urlopen(request, timeout=20) as response:
                satellites = json.loads(response.read())
            payload = {"satellites_monitored": len(satellites) if isinstance(satellites, list) else None, "land_observed_today": None, "model_confidence": None, "sources": {"satellites": "CelesTrak active satellite catalog", "land": "No area-coverage product is configured", "model": "No trained model evaluation artifact is available"}}
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(json.dumps(payload).encode())
        except (URLError, HTTPError, TimeoutError, json.JSONDecodeError):
            message = json.dumps({"error": "Live dashboard metrics are temporarily unavailable."}).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(message)


if __name__ == "__main__":
    os.chdir(Path(__file__).parent)
    lan_ip = socket.gethostbyname(socket.gethostname())
    print(f"Aapda Buddy running on LAN at http://{lan_ip}:{PORT}/")
    ThreadingHTTPServer((HOST, PORT), AapdaBuddyHandler).serve_forever()
