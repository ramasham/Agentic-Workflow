"""Serve the site at both / and the GitHub Pages project prefix for tests."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PagesTestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).resolve().parent.parent / '04-website'), **kwargs)

    def translate_path(self, path):
        prefix = '/Agentic-Workflow/'
        if path.startswith(prefix):
            path = '/' + path[len(prefix):]
        return super().translate_path(path)


if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', 8765), PagesTestHandler).serve_forever()
