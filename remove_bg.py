from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for r, g, b, a in data:
        # A simple algorithm to remove black backgrounds while handling anti-aliasing
        # If the pixel is entirely black, it's fully transparent
        # The brightness determines the opacity for dark pixels
        max_val = max(r, g, b)
        if max_val == 0:
            new_data.append((0, 0, 0, 0))
        elif max_val < 100:
            # For anti-aliased edges, we calculate how "colored" the pixel is.
            # To avoid darkening the edge pixels when they are semi-transparent,
            # we scale up the RGB values and set alpha
            alpha = int((max_val / 100.0) * 255)
            # un-premultiply alpha
            factor = 255.0 / alpha if alpha > 0 else 1.0
            new_r = min(255, int(r * factor))
            new_g = min(255, int(g * factor))
            new_b = min(255, int(b * factor))
            new_data.append((new_r, new_g, new_b, alpha))
        else:
            new_data.append((r, g, b, 255))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

process_image(r"d:\Kunal\PROJ\shubhztechwork-service\src\assets\image.png", r"d:\Kunal\PROJ\shubhztechwork-service\src\assets\image.png")
