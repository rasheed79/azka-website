import os

files_replacements = {
    r'components\sections\About.tsx': [
        ('py-24 lg:py-32', 'py-16 lg:py-28'),
    ],
    r'components\sections\Services.tsx': [
        ('py-24 lg:py-32', 'py-16 lg:py-28'),
        ('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4', 
         'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'),
    ],
    r'components\sections\Stats.tsx': [
        ('py-24 lg:py-32', 'py-16 lg:py-28'),
        ('grid grid-cols-2 lg:grid-cols-4 gap-5', 
         'grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5'),
    ],
    r'components\sections\Contact.tsx': [
        ('py-24 lg:py-32', 'py-16 lg:py-28'),
        ('p-8 rounded-2xl', 'p-5 sm:p-8 rounded-2xl'),
    ],
    r'components\sections\VMV.tsx': [
        ('py-24 lg:py-32', 'py-16 lg:py-28'),
        ('mb-16', 'mb-10 sm:mb-16'),
        ('mb-12', 'mb-8 sm:mb-12'),
    ],
    r'components\sections\Hero.tsx': [
        ('text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-7',
         'text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-7 px-2'),
    ],
    r'app\[locale]\systems\[slug]\page.tsx': [
        ('text-4xl lg:text-5xl font-bold text-white mb-4',
         'text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'),
        ('grid md:grid-cols-2 gap-8 mb-14',
         'grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-10 sm:mb-14'),
    ],
}

base = r'C:\work\Cursor\azka-website'
for rel_path, replacements in files_replacements.items():
    full_path = os.path.join(base, rel_path)
    if not os.path.exists(full_path):
        print(f'SKIP: {rel_path}')
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
    else:
        print(f'no change: {rel_path}')

print('Done.')
