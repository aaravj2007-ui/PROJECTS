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
RISEQ_EARTHQUAKES = "https://riseq.seismo.gov.in/riseq/earthquake"
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
        """Expose the National Centre for Seismology RISEQ page as structured JSON."""
        try:
            request = Request(RISEQ_EARTHQUAKES, headers={"User-Agent": "AapdaBuddy-demo/1.0"})
            with urlopen(request, timeout=20) as response:
                page = response.read().decode("utf-8", errors="replace")
            events = []
            for match in re.finditer(r"data-json='([^']+)'", page):
                record = json.loads(unescape(match.group(1)))
                event_name = record.get("event_name", "")
                name_match = re.match(r"M:\s*([\d.]+)\s*-\s*(.+)", event_name)
                coordinates = [float(value.strip()) for value in record.get("lat_long", "").split(",")]
                if not name_match or len(coordinates) != 2:
                    continue
                depth_match = re.search(r"D:\s*([\d.]+)", record.get("magnitude_depth", ""))
                events.append({"origin_time": record.get("origin_time", "Unknown"), "latitude": coordinates[0], "longitude": coordinates[1], "depth_km": float(depth_match.group(1)) if depth_match else None, "magnitude": float(name_match.group(1)), "location": name_match.group(2).strip(), "detail": RISEQ_EARTHQUAKES, "source": "National Centre for Seismology RISEQ"})
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(json.dumps(events[:20]).encode())
        except (URLError, HTTPError, TimeoutError, ValueError) as error:
            message = json.dumps({"error": "RISEQ earthquake feed is temporarily unavailable."}).encode()
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
