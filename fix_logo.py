from PIL import Image
import numpy as np

img = Image.open(r'C:\work\Cursor\azka-website\public\logo.png').convert('RGBA')
data = np.array(img)

# Replace near-white pixels with transparent
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
white_mask = (r > 230) & (g > 230) & (b > 230)
data[white_mask] = [0, 0, 0, 0]

result = Image.fromarray(data)
result.save(r'C:\work\Cursor\azka-website\public\logo.png')
print(f"Done. Size: {result.size}")
