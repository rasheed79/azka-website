from PIL import Image
import numpy as np

img = Image.open(r'C:\work\Cursor\azka-website\public\logo.png').convert('RGBA')
data = np.array(img)

# Any pixel that is not fully transparent → make it white
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Pixels with some opacity → turn white
has_content = a > 20
data[has_content, 0] = 255  # R
data[has_content, 1] = 255  # G
data[has_content, 2] = 255  # B
# Keep alpha as is

result = Image.fromarray(data)
result.save(r'C:\work\Cursor\azka-website\public\logo-white.png')
print(f"Saved logo-white.png — size: {result.size}")
