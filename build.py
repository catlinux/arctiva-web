#!/usr/bin/env python3
"""Genera public/ a partir de src/template.html y src/i18n/*.json."""
import html
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "public"
TMP = ROOT / "public.new"
CONFIG = json.loads((SRC / "site.json").read_text(encoding="utf-8"))
BASE = CONFIG["base_url"].rstrip("/")
DEFAULT = CONFIG["default_lang"]
ORDER = CONFIG["languages"]

LIST_KEYS = {"principles", "feat", "install_steps", "snap_lines", "profiles", "center", "roadmap", "reqs", "limits"}
REQUIRED = {
    "lang_name", "title", "description", "tagline", "lead", "cta_soon", "cta_code",
    "nav_label", "langs_label", "nav_about", "nav_features", "nav_install", "nav_roadmap", "nav_reqs",
    "hero_badge", "scroll_hint", "about_h", "about_p", "principles_h", "principles",
    "tag_done", "tag_wip", "tag_planned", "feat_h", "feat", "install_h", "install_p", "install_steps",
    "snap_h", "snap_p", "snap_lines", "profiles_h", "profiles_p", "profiles",
    "center_h", "center_p", "center", "roadmap_h", "roadmap", "roadmap_more",
    "reqs_h", "reqs", "limits_h", "limits", "noiso_h", "noiso_p",
    "legal_independent", "legal_license", "legal_author", "links_h", "link_code", "link_roadmap",
    "link_arch", "link_changes", "link_repo", "link_trademarks", "fingerprint_label",
}
TICKER = ["Arch Linux", "KDE Plasma 6", "Wayland", "Btrfs", "Snapper", "Calamares", "GRUB",
          "Steam", "Flathub", "GPL-3.0-or-later"]
LEGAL = {"en": "TRADEMARKS.md", "es": "TRADEMARKS.es.md"}

e = html.escape


def load(lang):
    data = json.loads((SRC / "i18n" / f"{lang}.json").read_text(encoding="utf-8"))
    missing = REQUIRED - data.keys()
    if missing:
        sys.exit(f"{lang}.json: faltan claves: {', '.join(sorted(missing))}")
    return data


def link(kind, lang):
    """URL de la versión del documento en el idioma, con inglés como respaldo."""
    return CONFIG["links"][kind].get(lang) or CONFIG["links"][kind]["en"]


def trademarks_href(lang):
    return "trademarks.html" if lang in LEGAL else "../en/trademarks.html"


def inline(text, lang):
    text = e(text)
    def repl(m):
        label, url = m.group(1), m.group(2)
        if url == "LICENSE":
            url = link("license", lang)
        elif url in LEGAL.values():
            url = "../" + next(k for k, v in LEGAL.items() if v == url) + "/trademarks.html"
        return f'<a href="{url}">{label}</a>'
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", repl, text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    return re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)


def md_to_html(md, lang):
    out, para, items = [], [], []
    def flush():
        nonlocal para, items
        if para:
            out.append("<p>" + inline(" ".join(para), lang) + "</p>")
            para = []
        if items:
            out.append("<ul class=\"list\">" + "".join(f"<li>{inline(i, lang)}</li>" for i in items) + "</ul>")
            items = []
    for line in md.splitlines():
        if not line.strip():
            flush()
        elif line.startswith("# "):
            flush(); out.append(f"<h1>{inline(line[2:], lang)}</h1>")
        elif line.startswith("## "):
            flush(); out.append(f"<h2>{inline(line[3:], lang)}</h2>")
        elif line.startswith("> "):
            flush(); out.append(f'<p class="note">{inline(line[2:], lang)}</p>')
        elif line.startswith("- "):
            if para:
                flush()
            items.append(line[2:])
        else:
            if items:
                flush()
            para.append(line)
    flush()
    return "\n".join(out)


def legal_page(lang, texts, names):
    body = md_to_html((SRC / "legal" / LEGAL[lang]).read_text(encoding="utf-8"), lang)
    page = (SRC / "page.html").read_text(encoding="utf-8")
    d = {"lang": lang, "asset_prefix": "../", "body": body, "title": "Arctiva",
         "home": "./", "lang_links": ""}
    for k, v in d.items():
        page = page.replace("{{" + k + "}}", v)
    return page


def render(lang, texts, names):
    d = {k: e(v) for k, v in texts.items() if k not in LIST_KEYS}
    d["lang"] = lang
    d["base_url"] = BASE
    d["asset_prefix"] = "../"
    d["canonical"] = f"{BASE}/{lang}/"
    d["code_url"] = e(CONFIG["code_url"])
    d["fingerprint"] = e(CONFIG["repo_key_fingerprint"])
    d["link_roadmap_url"] = e(link("roadmap", lang))
    d["trademarks_url"] = trademarks_href(lang)
    d["links"] = "".join(
        f'<li><a href="{e(u)}">{e(texts[k])}</a></li>'
        for k, u in (
            ("link_code", CONFIG["code_url"]),
            ("link_roadmap", link("roadmap", lang)),
            ("link_arch", link("architecture", lang)),
            ("link_changes", link("changelog", lang)),
            ("link_repo", CONFIG["repo_url"]),
        )
    ) + f'<li><a href="{trademarks_href(lang)}">{e(texts["link_trademarks"])}</a></li>'
    def tag(s):
        return f'<span class="tag {s}">{e(texts["tag_" + s])}</span>'
    def cards(items, num=False):
        return "".join(
            f'<div class="card">' + (f'<span class="num">{i + 1:02d}</span>' if num else "")
            + f'<h3>{e(c["h"])}</h3><p>{e(c["p"])}</p>'
            + (f'<span class="meta">{e(c["m"])}</span>' if "m" in c else "") + "</div>"
            for i, c in enumerate(items)
        )
    d["principles"] = cards(texts["principles"], num=True)
    d["feat"] = "".join(
        f'<div class="card {f["s"]}">{tag(f["s"])}<h3>{e(f["h"])}</h3><p>{e(f["p"])}</p></div>'
        for f in texts["feat"]
    )
    d["install_steps"] = "".join(
        f'<li><span class="chk"></span><span class="n">{i + 1:02d}</span>{e(s)}</li>'
        for i, s in enumerate(texts["install_steps"])
    )
    d["snap_lines"] = "".join(
        f'<p class="l {l["k"]}"><span class="pr">{"$" if l["k"] == "cmd" else "›"}</span>{e(l["t"])}</p>'
        for l in texts["snap_lines"]
    )
    d["profiles"] = cards(texts["profiles"])
    d["center"] = cards(texts["center"])
    d["center_tag"] = tag("wip")
    d["roadmap"] = "".join(
        f'<li class="{r["s"]}"><span class="dot"></span><div class="v">{e(r["v"])}</div>'
        f'<div class="b"><h3>{e(r["n"])}</h3><p>{e(r["t"])}</p>{tag(r["s"])}</div></li>'
        for r in texts["roadmap"]
    )
    d["reqs"] = "".join(f"<li>{e(r)}</li>" for r in texts["reqs"])
    d["limits"] = "".join(f"<li>{e(r)}</li>" for r in texts["limits"])
    d["ticker"] = "".join(f"<span>{e(x)}</span>" for x in TICKER)
    d["script"] = (SRC / "app.js").read_text(encoding="utf-8")
    d["hreflang"] = "\n".join(
        f'<link rel="alternate" hreflang="{l}" href="{BASE}/{l}/">' for l in ORDER
    ) + f'\n<link rel="alternate" hreflang="x-default" href="{BASE}/">'
    d["lang_links"] = " ".join(
        f'<a href="../{l}/" hreflang="{l}" lang="{l}"' + (' aria-current="true"' if l == lang else "")
        + f">{e(names[l])}</a>"
        for l in ORDER
    )
    page = (SRC / "template.html").read_text(encoding="utf-8")
    for k, v in d.items():
        page = page.replace("{{" + k + "}}", v)
    if "{{" in page:
        sys.exit(f"{lang}: quedan marcadores sin sustituir en la plantilla")
    return page


def chooser(names):
    items = "".join(
        f'<li><a class="btn ghost" href="{l}/" hreflang="{l}" lang="{l}">{e(names[l])}</a></li>' for l in ORDER
    )
    hrefs = "\n".join(f'<link rel="alternate" hreflang="{l}" href="{BASE}/{l}/">' for l in ORDER)
    langs = json.dumps(ORDER)
    return f"""<!doctype html>
<html lang="{DEFAULT}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Arctiva</title>
<meta name="color-scheme" content="dark">
<link rel="icon" type="image/svg+xml" href="assets/arctiva-icon.svg">
{hrefs}
<link rel="stylesheet" href="assets/style.css">
<script>
(function () {{
  var ok = {langs}, pref = (navigator.languages || [navigator.language || ""]);
  for (var i = 0; i < pref.length; i++) {{
    var l = String(pref[i]).toLowerCase().split("-")[0];
    if (ok.indexOf(l) > -1) {{ location.replace(l + "/"); return; }}
  }}
  location.replace("{DEFAULT}/");
}})();
</script>
</head>
<body>
<div class="bg" aria-hidden="true"><i class="stars"></i><i class="aurora a1"></i><i class="aurora a2"></i><i class="aurora a3"></i></div>
<main class="chooser">
<img src="assets/arctiva-logo.svg" alt="Arctiva" width="280" height="280">
<ul>{items}</ul>
</main>
</body>
</html>
"""


def main():
    texts = {l: load(l) for l in ORDER}
    names = {l: texts[l]["lang_name"] for l in ORDER}
    if TMP.exists():
        shutil.rmtree(TMP)
    TMP.mkdir()
    shutil.copytree(ROOT / "assets", TMP / "assets")
    for l in ORDER:
        (TMP / l).mkdir()
        (TMP / l / "index.html").write_text(render(l, texts[l], names), encoding="utf-8")
        if l in LEGAL:
            (TMP / l / "trademarks.html").write_text(legal_page(l, texts[l], names), encoding="utf-8")
    (TMP / "index.html").write_text(chooser(names), encoding="utf-8")
    (TMP / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {BASE}/sitemap.xml\n", encoding="utf-8")
    urls = "".join(f"<url><loc>{BASE}/{l}/</loc></url>" for l in ORDER)
    (TMP / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n',
        encoding="utf-8",
    )
    # Intercambio casi atómico: Apache nunca sirve un public/ a medio generar.
    old = ROOT / "public.old"
    if old.exists():
        shutil.rmtree(old)
    if OUT.exists():
        OUT.rename(old)
    TMP.rename(OUT)
    if old.exists():
        shutil.rmtree(old)
    print(f"OK: {len(ORDER)} idiomas en {OUT}")


if __name__ == "__main__":
    main()
