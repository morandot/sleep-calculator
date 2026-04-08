#!/usr/bin/env python3
# 生成不同尺寸的SVG图标
import os

# 确保icons目录存在
icons_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'icons')
os.makedirs(icons_dir, exist_ok=True)

# 基础SVG图标内容
def base_svg(size):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 512 512">
  <!-- 背景 -->
  <rect width="512" height="512" rx="128" fill="#0ea5e9" />
  
  <!-- 月亮图标 -->
  <path d="M335.79 317.53c-43.18 43.18-113.14 43.18-156.32 0-43.18-43.18-43.18-113.14 0-156.32 8.07-8.07 17.03-14.47 26.59-19.22-2.93 7.37-4.55 15.4-4.55 23.8 0 35.3 28.62 63.92 63.92 63.92 35.3 0 63.92-28.62 63.92-63.92 0-8.4-1.62-16.43-4.55-23.8 9.56 4.75 18.52 11.15 26.59 19.22 43.18 43.18 43.18 113.14 0 156.32z" fill="white" />
  
  <!-- 星星 -->
  <circle cx="150" cy="150" r="15" fill="white" />
  <circle cx="380" cy="180" r="10" fill="white" />
  <circle cx="420" cy="120" r="12" fill="white" />
  <circle cx="100" cy="380" r="12" fill="white" />
  <circle cx="350" cy="400" r="15" fill="white" />
  <circle cx="250" cy="100" r="8" fill="white" />
</svg>'''

# 需要生成的图标尺寸
sizes = [72, 96, 128, 144, 152, 192, 384, 512]

# 生成每个尺寸的图标
for size in sizes:
    icon_path = os.path.join(icons_dir, f'icon-{size}x{size}.svg')
    svg_content = base_svg(size)
    
    with open(icon_path, 'w') as f:
        f.write(svg_content)
    print(f'生成图标: {icon_path}')

print('所有图标生成完成!')