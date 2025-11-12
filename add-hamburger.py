#!/usr/bin/env python3
"""
Add hamburger menu to tutorial pages that are missing it
"""

import re

files_to_fix = [
    'tutorials/advanced-claude-techniques.html',
    'tutorials/claude-3-5-sonnet-features.html',
    'tutorials/claude-basics.html',
    'tutorials/claude-code-best-practices.html',
    'tutorials/claude-code-data-science.html',
    'tutorials/claude-code-debugging.html',
    'tutorials/claude-code-installation.html',
    'tutorials/claude-code-quickstart.html',
    'tutorials/claude-code-rest-api.html',
    'tutorials/claude-project-management.html',
    'tutorials/code-generation.html',
    'tutorials/prompt-engineering.html',
]

hamburger_html = """                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>"""

for file_path in files_to_fix:
    print(f"Processing {file_path}...")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if hamburger already exists
    if 'hamburger' in content:
        print(f"  ✓ {file_path} already has hamburger menu")
        continue

    # Find the pattern: </ul> followed by </div> (closing nav-container)
    # We want to insert the hamburger menu between these two
    pattern = r'(</ul>\s*)(</div>\s*</nav>)'

    if re.search(pattern, content):
        # Insert hamburger menu
        new_content = re.sub(
            pattern,
            r'\1' + hamburger_html + '\n' + r'            \2',
            content
        )

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"  ✓ Added hamburger menu to {file_path}")
    else:
        print(f"  ✗ Could not find insertion point in {file_path}")

print("\n✓ All files processed!")
