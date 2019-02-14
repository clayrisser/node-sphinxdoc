#!/usr/bin/env python3

from munch import munchify
from pydash import _
from sphinx_markdown_parser.parser import MarkdownParser
import datetime, json, os

config = {}
with open(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'config.json')) as f:
    config = munchify(json.load(f))

author = config.author if 'author' in config else ''

copyright = str(datetime.datetime.now().year) + ', ' + author

name = config.name if 'name' in config else ''

description = config.description if 'description' in config else ''

exclude_patterns = [
    'build/*',
    '_*'
]

extensions = [
    'sphinx_markdown_parser',
    'sphinx.ext.mathjax',
    'sphinx_jekyll_builder',
    'sphinx_js'
]

html_static_path = ['_static']

html_theme = 'sphinx_rtd_theme'

htmlhelp_basename = 'sphinxdoc_coredoc'

js_source_path = config.src if 'src' in config else 'src'

language = None

master_doc = 'index'

latex_documents = [(
    master_doc,
    _.snake_case(name).replace('-', '_') + '.tex',
    name,
    author,
    'manual'
)]

latex_elements = {
    'papersize': 'letterpaper',
    'pointsize': '10pt',
    'preamble': '',
    'figure_align': 'htbp'
}

man_pages = [(
    master_doc,
    _.snake_case(name).replace('-', '_'),
    name,
    [author],
    1
)]

needs_sphinx = '1.0'

primary_domain = 'js'

project = _.snake_case(name).replace('-', '_')

pygments_style = 'sphinx'

release = '0.0.1'

source_parsers = {
    '.md': MarkdownParser
}

source_suffix = ['.rst', '.md']

templates_path = ['_templates']

texinfo_documents = [(
    master_doc,
    _.snake_case(name).replace('-', '_'),
    name,
    author,
    _.snake_case(name).replace('-', '_'),
    description,
    'Miscellaneous'
)]

todo_include_todos = False

version = '0.0.1'

def setup(app):
    app.add_config_value('recommonmark_config', {
        'auto_toc_tree_section': 'Content',
        'enable_auto_doc_ref': True,
        'enable_auto_toc_tree': True,
        'enable_eval_rst': True,
        'enable_inline_math': True,
        'enable_math': True
    }, True)
    app.add_stylesheet('styles/main.css')
    app.add_javascript('scripts/main.js')
