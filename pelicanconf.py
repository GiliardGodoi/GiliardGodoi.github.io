from pathlib import Path
AUTHOR = 'Giliard Godoi'
SITENAME = 'Giliard Godoi'
SITEURL = ""
SITETITLE = 'Giliard Godoi'
SITESUBTITLE = 'Uma história sobre aprendizados'

SITEIMAGE = "/images/profile-park.png width=250 height=150"
# GRAVATAR_IMAGE = 'https://gravatar.com/giliardgodoi'
SITELOGO  = '/images/profile-park.png'
GRAVATAR_IMAGE = '/images/profile-park.png'

PATH = "content"

TIMEZONE = 'America/Sao_Paulo'
DEFAULT_LANG = 'pt'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

HIDE_AUTHORS = True

# Blogroll
# LINKS = (
#     ("Pelican", "https://getpelican.com/"),
#     ("Python.org", "https://www.python.org/"),
#     ("Jinja2", "https://palletsprojects.com/p/jinja/"),
#     ("You can modify those links in your config file", "#"),
# )

# Social widget
SOCIAL = (
    ("github", "https://github.com/GiliardGodoi"),
    ("linkedin", "https://www.linkedin.com/in/giliardgodoi/"),
    ('twitter', 'https://x.com/giliardgodoi')
)

GITHUB_URL = 'https://github.com/GiliardGodoi'
TWITTER_URL = 'http://twitter.com/giliardgodoi'

ICONS = (
    ("twitter", "https://twitter.com/giliardgodoi"),
    ("github", "https://github.com/GiliardGodoi"),
    ("linkedin-in", "https://www.linkedin.com/in/giliardgodoi/"),
    ('youtube', 'https://www.youtube.com/user/GiliardGodoi'),
)


DISPLAY_CATEGORIES_ON_MENU = False
DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

# Theme configuration
# THEME = Path('themes', 'abacate')
# THEME = Path('themes', 'genus')
THEME = Path('themes', 'pelican-alchemy', 'alchemy')
THEME_CSS_OVERRIDES = ['theme/css/oldstyle.css']

# THEME = Path('themes', 'pelican-clean-blog')
# THEME = Path('themes', 'pelican-clean-genus')
# THEME = Path('themes', 'pelican-natureza')
# COLOR_SCHEME_CSS = 'monokai.css'


# URLs configuration
STATIC_PATHS = ["images", "pdfs", "extras", "datasets"]

PAGE_PATHS = ['pages']
ARTICLE_PATHS = ['articles']
PAGE_EXCLUDES    = STATIC_PATHS + ARTICLE_PATHS
ARTICLE_EXCLUDES = STATIC_PATHS + PAGE_PATHS

# Fomatação dos arquivos gerados
ARTICLE_URL = "articles/{date:%Y}/{slug}/"
ARTICLE_SAVE_AS = "articles/{date:%Y}/{slug}/index.html"
PAGE_URL = "pages/{slug}/"
PAGE_SAVE_AS = "pages/{slug}/index.html"
CATEGORY_URL = "category/{slug}"
CATEGORY_SAVE_AS = "category/{slug}/index.html"
TAG_URL = "tag/{slug}"
TAG_SAVE_AS = "tag/{slug}/index.html"

COPYRIGHT_YEAR = '2025'

DELETE_OUTPUT_DIRECTORY = False # this is a destructive setting and should be handled with extreme care.
OUTPUT_RETENTION = [".git"]

EXTRA_PATH_METADATA = {
    "extras/android-chrome-192x192.png" : { "path" : "android-chrome-192x192.png"},
    "extras/android-chrome-512x512.png" : { "path" : "android-chrome-512x512.png"},
    "extras/browserconfig.xml" : {"path" : "browserconfig.xml"},
    "extras/apple-touch-icon.png" : { "path" : "apple-touch-icon.png"},
    "extras/favicon-16x16.png" : { "path" : "favicon-16x16.png"},
    "extras/favicon-32x32.png" : { "path" : "favicon-32x32.png"},
    "extras/favicon.ico": {"path": "favicon.ico"},
    "extras/mstile-150x150.png" : {"path" : "mstile-150x150.png"},
    "extras/safari-pinned-tab.svg" : {"path" : "safari-pinned-tab.svg"},
    "extras/site.webmanifest" : {"path" : "site.webmanifest"},
    "extras/README.md" : {"path" : "README.md"}
}

RFG_FAVICONS = True
PYGMENTS_STYLE = 'monokai'
PYGMENTS_RST_OPTIONS = {'linenos': 'table'}

# plugins
MARKUP = ("md", "ipynb")

PLUGIN_PATHS = ['plugins/']
PLUGINS = ['pelican-bootstrapify']

IPYNB_SKIP_CSS = False
IGNORE_FILES = [".ipynb_checkpoints"]

BOOTSTRAP_THEME = "flatly"
BOOTSTRAPIFY = {
    "table": ["table", "table-striped", "table-hover"],
    "img": ["img-fluid"],
    "blockquote": ["blockquote"],
}

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

TYPOGRIFY = True