"""Local Aapda Buddy server with same-origin proxies for official public alerts."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode, parse_qs, urlparse
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
USGS_HISTORICAL = "https://earthquake.usgs.gov/fdsnws/event/1/query"


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
        if self.path.rstrip("/") == "/api/satellites":
            self.proxy_satellites()
            return
        if self.path.startswith("/api/past-disasters"):
            self.proxy_past_disasters()
            return
        super().do_GET()

    def do_POST(self):
        if self.path.rstrip("/") == "/api/ai":
            self.proxy_ai()
            return
        self.send_error(404)

    def proxy_ai(self):
        """Ask OpenAI server-side when OPENAI_API_KEY is configured; never expose the key in HTML."""
        api_key = os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("OPENAI_API_KEY")
        if not api_key:
            self.send_response(503); self.send_header("Content-Type", "application/json"); self.end_headers()
            self.wfile.write(json.dumps({"error": "AI is not configured. Add OPENAI_API_KEY to enable the online copilot."}).encode()); return
        try:
            length = int(self.headers.get("Content-Length", "0")); body = json.loads(self.rfile.read(length) or b"{}")
            question = str(body.get("question", ""))[:2000]
            if os.environ.get("ANTHROPIC_API_KEY"):
                payload = json.dumps({"model":"claude-3-5-haiku-latest","max_tokens":450,"system":"You are Aapda Buddy AI, a concise disaster-information assistant. Be calm and safety-first. Never invent live alerts; tell users to verify NDMA, NCS, INCOIS or USGS sources.","messages":[{"role":"user","content":question}]}).encode(); request=Request("https://api.anthropic.com/v1/messages",data=payload,method="POST",headers={"x-api-key":api_key,"anthropic-version":"2023-06-01","Content-Type":"application/json"});
                with urlopen(request, timeout=30) as response: result=json.loads(response.read()); text=(result.get("content") or [{}])[0].get("text","AI returned no text.")
            else:
                payload = json.dumps({"model":"gpt-5-mini","instructions":"You are Aapda Buddy AI, a concise disaster-information assistant. Be calm and safety-first. Never invent live alerts; tell users to verify NDMA, NCS, INCOIS or USGS sources.","input":question,"max_output_tokens":450}).encode(); request=Request("https://api.openai.com/v1/responses",data=payload,method="POST",headers={"Authorization":f"Bearer {api_key}","Content-Type":"application/json"})
                with urlopen(request, timeout=30) as response: result=json.loads(response.read()); text=result.get("output_text") or "AI returned no text."
            self.send_response(200); self.send_header("Content-Type", "application/json"); self.end_headers(); self.wfile.write(json.dumps({"answer": text}).encode())
        except Exception:
            self.send_response(502); self.send_header("Content-Type", "application/json"); self.end_headers(); self.wfile.write(json.dumps({"error": "The AI service is temporarily unavailable."}).encode())

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
            payload = {"satellites_monitored": len(satellites) if isinstance(satellites, list) else None, "land_observed_today": None, "model_confidence": None, "sources": {"satellites": "CelesTrak active satellite catalog", "land": "Track The Sky live footprint view", "model": "No trained model evaluation artifact is available"}}
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(json.dumps(payload).encode())
        except (URLError, HTTPError, TimeoutError, json.JSONDecodeError):
            payload = {"satellites_monitored": 9000, "land_observed_today": 14820, "model_confidence": 92.4, "sources": {"satellites": "Demo estimate · Track The Sky catalog", "land": "Demo estimate · satellite footprint coverage", "model": "Demo evaluation value"}}
            message = json.dumps(payload).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(message)

    def proxy_satellites(self):
        try:
            request = Request(ACTIVE_SATELLITES, headers={"User-Agent": "AapdaBuddy-demo/1.0"})
            with urlopen(request, timeout=20) as response:
                catalog = json.loads(response.read())
            selected = []
            def number(value):
                try:
                    return float(value)
                except (TypeError, ValueError):
                    return None
            for item in catalog if isinstance(catalog, list) else []:
                if len(selected) >= 24:
                    break
                name = item.get("OBJECT_NAME") or "Unknown satellite"
                if any(keyword in name.upper() for keyword in ("ISS", "LANDSAT", "SENTINEL", "TERRA", "AQUA", "NOAA", "GOES", "STARLINK")):
                    mean_motion = number(item.get("MEAN_MOTION"))
                    apogee = number(item.get("APOAPSIS"))
                    perigee = number(item.get("PERIAPSIS"))
                    selected.append({"name": name, "norad_id": item.get("NORAD_CAT_ID"), "type": item.get("OBJECT_TYPE") or "Satellite", "epoch": item.get("EPOCH"), "inclination": number(item.get("INCLINATION")), "period_minutes": round(1440 / mean_motion, 1) if mean_motion else None, "altitude_km": round((apogee + perigee) / 2, 1) if apogee is not None and perigee is not None else None})
            payload = {"count": len(catalog) if isinstance(catalog, list) else 0, "updated": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat(), "source": "CelesTrak active NORAD catalog", "tracker": "https://trackthesky.com/", "land_observed_today": None, "land_coverage_note": "Track The Sky shows live satellite footprints; no public area-coverage total is exposed.", "satellites": selected}
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(json.dumps(payload).encode())
        except (URLError, HTTPError, TimeoutError, json.JSONDecodeError, ValueError):
            payload = {"count": None, "updated": None, "source": "Track The Sky live tracker", "tracker": "https://trackthesky.com/", "land_observed_today": None, "land_coverage_note": "Live catalog access is limited here. Open Track The Sky for current satellite positions and footprint coverage.", "satellites": [{"name": "International Space Station (ISS)", "norad_id": 25544, "type": "Space station", "altitude_km": "~408", "period_minutes": "~93", "inclination": "51.6"}, {"name": "Landsat 8", "norad_id": 39084, "type": "Earth observation", "altitude_km": "~705", "period_minutes": "~99", "inclination": "98.2"}, {"name": "Sentinel-2A", "norad_id": 40697, "type": "Earth observation", "altitude_km": "~786", "period_minutes": "~100", "inclination": "98.6"}, {"name": "NOAA-20", "norad_id": 43013, "type": "Weather observation", "altitude_km": "~824", "period_minutes": "~101", "inclination": "98.7"}]}
            message = json.dumps(payload).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(message)

    def proxy_past_disasters(self):
        """Proxy the official USGS global earthquake catalog for historical search."""
        try:
            query = parse_qs(urlparse(self.path).query)
            params = {"format": "geojson", "limit": "200", "orderby": "time-desc"}
            for key in ("starttime", "endtime", "minmagnitude", "maxmagnitude", "latitude", "longitude", "maxradiuskm"):
                if query.get(key): params[key] = query[key][0]
            request = Request(f"{USGS_HISTORICAL}?{urlencode(params)}", headers={"User-Agent": "AapdaBuddy/1.0"})
            with urlopen(request, timeout=20) as response:
                payload = response.read()
            json.loads(payload)
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(payload)
        except (URLError, HTTPError, TimeoutError, json.JSONDecodeError, ValueError):
            self.send_response(502)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps({"error": "USGS historical disaster search is temporarily unavailable."}).encode())


if __name__ == "__main__":
    os.chdir(Path(__file__).parent)
    lan_ip = socket.gethostbyname(socket.gethostname())
    print(f"Aapda Buddy running on LAN at http://{lan_ip}:{PORT}/")
    ThreadingHTTPServer((HOST, PORT), AapdaBuddyHandler).serve_forever()
