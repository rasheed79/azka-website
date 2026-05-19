import os
import re

# Files to update
files = [
    r'app\globals.css',
    r'app\[locale]\layout.tsx',
    r'components\layout\Navbar.tsx',
    r'components\layout\Footer.tsx',
    r'components\sections\Hero.tsx',
    r'components\sections\About.tsx',
    r'components\sections\VMV.tsx',
    r'components\sections\Services.tsx',
    r'components\sections\Stats.tsx',
    r'components\sections\Contact.tsx',
    r'components\chatbot\ChatWidget.tsx',
    r'app\[locale]\systems\[slug]\page.tsx',
]

replacements = [
    # Background colors
    ('#0F172A', '#0B1A10'),
    ('#080F1E', '#060F08'),
    ('#1E293B', '#122518'),
    # Tailwind blue → green
    ('bg-blue-600', 'bg-green-700'),
    ('bg-blue-500', 'bg-green-600'),
    ('hover:bg-blue-600', 'hover:bg-green-700'),
    ('hover:bg-blue-500', 'hover:bg-green-600'),
    ('hover:bg-blue-400', 'hover:bg-green-500'),
    ('from-blue-700', 'from-green-800'),
    ('from-blue-600', 'from-green-700'),
    ('from-blue-500', 'from-green-600'),
    ('to-blue-600', 'to-green-700'),
    ('to-blue-500', 'to-green-600'),
    ('via-blue-', 'via-green-'),
    ('bg-blue-900/20', 'bg-green-900/20'),
    ('bg-blue-900/5', 'bg-green-900/5'),
    ('bg-blue-800/10', 'bg-green-900/10'),
    ('bg-blue-600/20', 'bg-green-700/20'),
    ('bg-blue-500/10', 'bg-green-600/10'),
    ('bg-blue-500/20', 'bg-green-600/20'),
    ('border-blue-500/40', 'border-green-500/40'),
    ('border-blue-500/30', 'border-green-500/30'),
    ('border-blue-500/20', 'border-green-500/20'),
    ('border-blue-500', 'border-green-500'),
    ('text-blue-400', 'text-green-400'),
    ('text-blue-300', 'text-green-300'),
    ('text-blue-200', 'text-green-300'),
    ('focus:border-blue-500', 'focus:border-green-500'),
    ('focus:ring-blue-500', 'focus:ring-green-500'),
    ('shadow-blue-500/40', 'shadow-green-600/40'),
    ('shadow-blue-500/30', 'shadow-green-600/30'),
    ('shadow-blue-500/25', 'shadow-green-600/25'),
    ('shadow-blue-500/20', 'shadow-green-600/20'),
    # Ring / outline
    ('ring-blue-500', 'ring-green-500'),
    ('outline-blue', 'outline-green'),
    # Gradient text
    ('from-blue-500', 'from-green-500'),
    # fill
    ('fill-blue-400', 'fill-green-400'),
]

base = r'C:\work\Cursor\azka-website'
changed = 0

for rel_path in files:
    full_path = os.path.join(base, rel_path)
    if not os.path.exists(full_path):
        print(f'SKIP (not found): {rel_path}')
        continue
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != original:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'UPDATED: {rel_path}')
        changed += 1
    else:
        print(f'no change: {rel_path}')

print(f'\nDone. {changed} files updated.')
