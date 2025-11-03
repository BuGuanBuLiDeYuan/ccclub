#!/usr/bin/env python3
"""
批量更新教程页面，添加订阅链接和footer组件
"""

import os
import re
from pathlib import Path

def update_tutorial_page(filepath):
    """更新单个教程页面"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. 更新导航菜单，添加订阅链接
    nav_pattern = r'(<li><a href="../about\.html">关于</a></li>\s*)</ul>'
    nav_replacement = r'\1<li><a href="../subscription.html">订阅</a></li>\n                </ul>'

    if re.search(nav_pattern, content):
        content = re.sub(nav_pattern, nav_replacement, content)
        print(f"  ✓ 添加了订阅链接")

    # 2. 替换 footer
    footer_pattern = r'<footer class="footer">.*?</footer>'
    footer_replacement = '<div id="footer-placeholder"></div>'

    if re.search(footer_pattern, content, re.DOTALL):
        content = re.sub(footer_pattern, footer_replacement, content, flags=re.DOTALL)
        print(f"  ✓ 替换了 footer 为组件")

    # 3. 添加 load-footer.js 脚本（如果还没有）
    if '../scripts/load-footer.js' not in content:
        # 在 </body> 前添加脚本
        script_pattern = r'(\s*<script src="../scripts/main\.js"></script>)'
        script_replacement = r'\n    <script src="../scripts/load-footer.js"></script>\1'

        if re.search(script_pattern, content):
            content = re.sub(script_pattern, script_replacement, content)
            print(f"  ✓ 添加了 load-footer.js")

    # 只有内容改变时才写入
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """主函数"""
    tutorials_dir = Path('tutorials')

    if not tutorials_dir.exists():
        print("错误: tutorials 目录不存在")
        return

    tutorial_files = list(tutorials_dir.glob('*.html'))

    print(f"找到 {len(tutorial_files)} 个教程文件\n")

    updated_count = 0
    for filepath in sorted(tutorial_files):
        print(f"处理: {filepath.name}")
        if update_tutorial_page(filepath):
            updated_count += 1
            print(f"  ✅ 已更新\n")
        else:
            print(f"  ⏭️  无需更新\n")

    print(f"\n完成! 共更新了 {updated_count}/{len(tutorial_files)} 个文件")

if __name__ == '__main__':
    main()
