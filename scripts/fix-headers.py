#!/usr/bin/env python3
"""
Fix headers and footers in tutorial files
"""

import os
import re

# Standard header HTML
STANDARD_HEADER = '''    <header class="header">
        <nav class="nav">
            <div class="nav-container">
                <a href="../" class="logo">
                    <img src="../assets/logo-simple.png" alt="Claude Code Club" class="logo-img">
                </a>
                <ul class="nav-menu">
                    <li><a href="../#home">首页</a></li>
                    <li><a href="../#tutorials">教程</a></li>
                    <li><a href="../#examples">示例</a></li>
                    <li><a href="../community.html">社区</a></li>
                    <li><a href="../about.html">关于</a></li>
                    <li><a href="../subscription.html">订阅</a></li>
                </ul>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>'''

# Standard footer replacement
STANDARD_FOOTER = '''    <div id="footer-placeholder"></div>

    <script src="../scripts/load-footer.js"></script>
    <script src="../scripts/wechat-share.js"></script>'''

def fix_tutorial_file(filepath):
    """Fix header and footer in a tutorial file"""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Fix header - replace everything from <header> to </header>
    header_pattern = r'<header>.*?</header>'
    content = re.sub(header_pattern, STANDARD_HEADER, content, flags=re.DOTALL)

    # Fix footer - replace everything from <footer> to </html>
    footer_pattern = r'<footer>.*?</html>'
    replacement = STANDARD_FOOTER + '\n</body>\n\n</html>'
    content = re.sub(footer_pattern, replacement, content, flags=re.DOTALL)

    # If no changes were made, check if we need to add missing scripts
    if content == original_content:
        print(f"  No header/footer changes needed")
        return False

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✅ Fixed!")
    return True

def main():
    tutorials_dir = 'tutorials'

    # List of files that need fixing (have nav-links)
    files_to_fix = [
        'agents-md-guide.html',
        'ai-coding-trends-2024.html',
        'claude-35-sonnet-features.html',
        'claude-code-deployment.html',
        'claude-code-eight-honors-eight-shames.html',
        'claude-code-optimization.html',
        'claude-code-performance.html',
        'claude-code-security.html',
        'claude-code-testing.html',
        'claude-code-workflow.html',
        'claude-computer-use.html',
        'claude-mcp-integration.html'
    ]

    fixed_count = 0
    for filename in files_to_fix:
        filepath = os.path.join(tutorials_dir, filename)
        if os.path.exists(filepath):
            if fix_tutorial_file(filepath):
                fixed_count += 1
        else:
            print(f"⚠️  File not found: {filepath}")

    print(f"\n✅ Fixed {fixed_count} files!")

if __name__ == '__main__':
    main()
