import fitz
import os

pdf_path = r'C:\work\Cursor\AZKA Archiving system AR-EN 2019-03-04.pdf'
doc = fitz.open(pdf_path)
out_dir = r'C:\work\Cursor\azka-website\public\extracted'
os.makedirs(out_dir, exist_ok=True)

print(f'Pages: {doc.page_count}')
img_count = 0
for page_num in range(min(5, doc.page_count)):
    page = doc[page_num]
    images = page.get_images(full=True)
    print(f'Page {page_num+1}: {len(images)} images')
    for i, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        ext = base_image['ext']
        data = base_image['image']
        w, h = base_image['width'], base_image['height']
        fname = f'page{page_num+1}_img{i+1}_{w}x{h}.{ext}'
        fpath = os.path.join(out_dir, fname)
        with open(fpath, 'wb') as f:
            f.write(data)
        print(f'  Saved: {fname} ({len(data)} bytes)')
        img_count += 1

print(f'Total images extracted: {img_count}')
