from PIL import Image

img = Image.open(r'C:\work\Cursor\azka-website\public\logo.png').convert('RGBA')
w, h = img.size
print(f"Original size: {w}x{h}")

# Crop the Saudi Arabia map icon (right portion of the image)
# Roughly x: 555 to 794, y: 0 to 200
icon = img.crop((555, 0, w, 205))

# Find the bounding box of non-transparent content and crop tight
bbox = icon.getbbox()
print(f"Bounding box: {bbox}")
if bbox:
    icon = icon.crop(bbox)

# Make it square with padding
size = max(icon.size)
square = Image.new('RGBA', (size, size), (0, 0, 0, 0))
offset_x = (size - icon.width) // 2
offset_y = (size - icon.height) // 2
square.paste(icon, (offset_x, offset_y))

square.save(r'C:\work\Cursor\azka-website\public\icon.png')
print(f"Icon saved: {square.size}")
