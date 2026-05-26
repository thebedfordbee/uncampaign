"""Generate /assets/og/footprint.png — 1200x630 social card for the
Cost of Campaigning page. On-brand: cream bg, moss/sage Georgia type.
Run: python assets/og/_gen_footprint_og.py
"""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
CREAM = (248, 245, 239)
MOSS = (62, 82, 64)
SAGE = (123, 140, 121)
CHARCOAL = (43, 43, 43)
BORDER = (224, 219, 211)
MUTED = (106, 101, 94)

FONTS = r"C:\Windows\Fonts"
def font(name, size):
    for cand in (name, name.lower()):
        p = os.path.join(FONTS, cand)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.truetype(os.path.join(FONTS, "georgia.ttf"), size)

f_eyebrow = font("georgia.ttf", 26)
f_title   = font("georgiab.ttf", 78)
f_num      = font("georgiab.ttf", 84)
f_vs       = font("georgiaz.ttf", 56)   # bold italic
f_lbl      = font("georgia.ttf", 24)
f_sub      = font("georgiai.ttf", 30)   # italic
f_foot     = font("georgia.ttf", 22)

img = Image.new("RGB", (W, H), CREAM)
d = ImageDraw.Draw(img)

# Outer frame accent
d.rectangle([0, 0, W-1, H-1], outline=BORDER, width=1)
d.rectangle([24, 24, W-25, H-25], outline=BORDER, width=1)
# Top moss bar
d.rectangle([24, 24, W-25, 30], fill=MOSS)

def tracked(draw, xy, text, fnt, fill, tracking, anchor_center=True):
    # measure total width with tracking
    widths = [draw.textlength(ch, font=fnt) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = xy[0] - total / 2 if anchor_center else xy[0]
    y = xy[1]
    for ch, w in zip(text, widths):
        draw.text((x, y), ch, font=fnt, fill=fill, anchor="lm")
        x += w + tracking

cx = W // 2

# Eyebrow
tracked(d, (cx, 118), "DON SCOTT PRESENTS", f_eyebrow, SAGE, 8)

# Title
d.text((cx, 200), "The Cost of Campaigning", font=f_title, fill=MOSS, anchor="mm")

# Numbers row
num_y = 330
left_x = 300
right_x = 900
d.text((left_x, num_y), "$118,021", font=f_num, fill=CHARCOAL, anchor="mm")
d.text((right_x, num_y), "$13.12", font=f_num, fill=MOSS, anchor="mm")
d.text((cx, num_y), "vs.", font=f_vs, fill=SAGE, anchor="mm")

# Labels under numbers
d.text((left_x, num_y + 62), "INCUMBENT · 2021", font=f_lbl, fill=MUTED, anchor="mm")
d.text((right_x, num_y + 62), "THE UNCAMPAIGN · 2026", font=f_lbl, fill=MOSS, anchor="mm")

# Divider
d.line([cx - 260, 452, cx + 260, 452], fill=BORDER, width=1)

# Subtitle
d.text((cx, 500), "Dollars and carbon, side by side.", font=f_sub, fill=CHARCOAL, anchor="mm")

# Footer URL
d.text((cx, 562), "donforbedford.com/footprint", font=f_foot, fill=SAGE, anchor="mm")

out = os.path.join(os.path.dirname(__file__), "footprint.png")
img.save(out, "PNG", optimize=True)
print("wrote", out, img.size)
