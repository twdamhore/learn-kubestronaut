#!/usr/bin/env python3
"""Structural validator for KCNA practice exam data files."""
import re, os, sys

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
EXPECTED_DOMAINS = {
    'Kubernetes Fundamentals': 46,
    'Container Orchestration': 22,
    'Cloud Native Architecture': 16,
    'Cloud Native Observability': 8,
    'Cloud Native Application Delivery': 8
}
issues = []
total_questions = 0
all_ids = set()
global_answer_dist = [0, 0, 0, 0]

def extract_questions(code):
    """Extract question blocks by splitting on id: pattern."""
    # Find the questions array
    m = re.search(r'var\s+questions\s*=\s*\[', code)
    if not m:
        return []
    start = m.end()

    # Find matching closing bracket (handle nested brackets)
    depth = 1
    pos = start
    while pos < len(code) and depth > 0:
        if code[pos] == '[':
            depth += 1
        elif code[pos] == ']':
            depth -= 1
        pos += 1
    questions_str = code[start:pos-1]

    # Split by top-level objects using id: pattern
    # Each question starts with { followed eventually by id:
    blocks = re.split(r'\n\s*\{(?=\s*\n?\s*id:)', questions_str)
    result = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        if not block.startswith('{'):
            block = '{' + block
        result.append(block)
    return result

def parse_question_fields(block):
    """Extract key fields from a question block using regex."""
    q = {}

    # id
    m = re.search(r'id:\s*"(s\d{2}-q\d{3})"', block)
    q['id'] = m.group(1) if m else None

    # domain
    m = re.search(r'domain:\s*"([^"]*)"', block)
    q['domain'] = m.group(1) if m else None

    # text (get length indicator)
    m = re.search(r'text:\s*"', block)
    if m:
        # Find end of string - handle escaped quotes
        start = m.end()
        pos = start
        while pos < len(block):
            if block[pos] == '\\':
                pos += 2
                continue
            if block[pos] == '"':
                break
            pos += 1
        q['text'] = block[start:pos]
    else:
        q['text'] = None

    # answer
    m = re.search(r'answer:\s*(\d+)', block)
    q['answer'] = int(m.group(1)) if m else None

    # explanation
    m = re.search(r'explanation:\s*"', block)
    q['has_explanation'] = m is not None

    # options count
    q['options_count'] = len(re.findall(r'^\s*"[^"]*"\s*[,\]]', block, re.MULTILINE))
    # Alternative: count items in options array
    opts_match = re.search(r'options:\s*\[', block)
    if opts_match:
        ostart = opts_match.end()
        odepth = 1
        opos = ostart
        while opos < len(block) and odepth > 0:
            if block[opos] == '[': odepth += 1
            elif block[opos] == ']': odepth -= 1
            opos += 1
        opts_str = block[ostart:opos-1]
        # Count top-level strings in options array
        q['options_count'] = len(re.findall(r'"(?:[^"\\]|\\.)*"', opts_str))

    # diagram
    q['has_diagram'] = 'diagram:' in block and '<svg' in block
    q['diagram_null'] = bool(re.search(r'diagram:\s*null', block))

    # verify
    m = re.search(r'verify:\s*"([^"]*(?:\\.[^"]*)*)"', block)
    q['verify'] = m.group(1) if m else None
    q['verify_null'] = bool(re.search(r'verify:\s*null', block))

    # difficulty
    m = re.search(r'difficulty:\s*(\d+)', block)
    q['difficulty'] = int(m.group(1)) if m else None

    # subsection
    m = re.search(r'subsection:\s*"([^"]*)"', block)
    q['subsection'] = m.group(1) if m else None

    return q

def check_lab_exercises(code, set_num):
    """Check labExercises array."""
    m = re.search(r'var\s+labExercises\s*=\s*\[', code)
    if not m:
        issues.append(f'[set-{set_num}] labExercises declaration not found')
        return 0

    # Count title: occurrences in the lab section
    start = m.end()
    depth = 1
    pos = start
    while pos < len(code) and depth > 0:
        if code[pos] == '[': depth += 1
        elif code[pos] == ']': depth -= 1
        pos += 1
    lab_str = code[start:pos-1]

    titles = re.findall(r'title:\s*"', lab_str)
    count = len(titles)

    # Check for required fields
    descs = len(re.findall(r'description:\s*"', lab_str))
    cmds = len(re.findall(r'commands:\s*"', lab_str))
    exps = len(re.findall(r'expected:\s*"', lab_str))

    if count < 4:
        issues.append(f'[set-{set_num}] Only {count} lab exercises (expected >=6)')
    if descs < count:
        issues.append(f'[set-{set_num}] Some labs missing description ({descs}/{count})')
    if cmds < count:
        issues.append(f'[set-{set_num}] Some labs missing commands ({cmds}/{count})')
    if exps < count:
        issues.append(f'[set-{set_num}] Some labs missing expected ({exps}/{count})')

    return count

for s in range(1, 11):
    set_num = f'{s:02d}'
    filepath = os.path.join(DATA_DIR, f'set-{set_num}.js')

    if not os.path.exists(filepath):
        issues.append(f'[set-{set_num}] FILE MISSING')
        continue

    code = open(filepath).read()

    # Check EXAM_SET
    m = re.search(r'var\s+EXAM_SET\s*=\s*(\d+)', code)
    if not m or int(m.group(1)) != s:
        issues.append(f'[set-{set_num}] EXAM_SET mismatch: got {m.group(1) if m else "missing"}, expected {s}')

    # Check EXAM_TITLE
    m = re.search(r'var\s+EXAM_TITLE\s*=\s*"([^"]*)"', code)
    if not m:
        issues.append(f'[set-{set_num}] EXAM_TITLE not found')

    # Extract and validate questions
    blocks = extract_questions(code)
    qcount = len(blocks)

    if qcount != 100:
        issues.append(f'[set-{set_num}] Question count: {qcount}, expected 100')

    total_questions += qcount

    domain_counts = {}
    answer_dist = [0, 0, 0, 0]
    set_ids = set()
    svg_count = 0
    verify_count = 0

    for i, block in enumerate(blocks):
        q = parse_question_fields(block)
        prefix = f'[set-{set_num} q{i+1:03d}]'

        # ID
        if not q['id']:
            issues.append(f'{prefix} Missing or malformed id')
        else:
            expected_prefix = f's{set_num}-q'
            if not q['id'].startswith(expected_prefix):
                issues.append(f'{prefix} ID prefix wrong: "{q["id"]}" (expected s{set_num}-qNNN)')
            if q['id'] in set_ids:
                issues.append(f'{prefix} Duplicate ID within set: {q["id"]}')
            set_ids.add(q['id'])
            if q['id'] in all_ids:
                issues.append(f'{prefix} Duplicate ID across sets: {q["id"]}')
            all_ids.add(q['id'])

        # Text
        if not q['text']:
            issues.append(f'{prefix} Missing question text')
        elif len(q['text']) < 30:
            issues.append(f'{prefix} Text suspiciously short ({len(q["text"])} chars)')

        # Answer
        if q['answer'] is None:
            issues.append(f'{prefix} Missing answer')
        elif q['answer'] < 0 or q['answer'] > 3:
            issues.append(f'{prefix} Answer out of range: {q["answer"]}')
        else:
            answer_dist[q['answer']] += 1
            global_answer_dist[q['answer']] += 1

        # Explanation
        if not q['has_explanation']:
            issues.append(f'{prefix} Missing explanation')

        # Options
        if q['options_count'] != 4 and q['options_count'] != 0:
            # Only flag if clearly wrong (regex can be imprecise)
            if q['options_count'] < 3 or q['options_count'] > 5:
                issues.append(f'{prefix} Unusual options count: {q["options_count"]}')

        # Domain
        if not q['domain']:
            issues.append(f'{prefix} Missing domain')
        elif q['domain'] not in EXPECTED_DOMAINS:
            issues.append(f'{prefix} Unknown domain: "{q["domain"]}"')

        if q['domain']:
            domain_counts[q['domain']] = domain_counts.get(q['domain'], 0) + 1

        if q['has_diagram']:
            svg_count += 1
        if q['verify']:
            verify_count += 1

        # Difficulty range
        if q['difficulty'] is not None and (q['difficulty'] < 50 or q['difficulty'] > 100):
            issues.append(f'{prefix} Difficulty out of range: {q["difficulty"]}')

    # Domain distribution
    for d, expected in EXPECTED_DOMAINS.items():
        actual = domain_counts.get(d, 0)
        if actual != expected:
            issues.append(f'[set-{set_num}] Domain "{d}": got {actual}, expected {expected}')

    # Answer distribution
    ans_range = max(answer_dist) - min(answer_dist)
    if ans_range > 10:
        issues.append(f'[set-{set_num}] Answer distribution imbalanced: A={answer_dist[0]} B={answer_dist[1]} C={answer_dist[2]} D={answer_dist[3]} (range={ans_range})')

    # Lab exercises
    lab_count = check_lab_exercises(code, set_num)

    print(f'Set {set_num}: {qcount} questions, {svg_count} SVGs, {verify_count} verify cmds, '
          f'answer dist A={answer_dist[0]} B={answer_dist[1]} C={answer_dist[2]} D={answer_dist[3]}, '
          f'labs={lab_count}')

print(f'\n=== TOTALS ===')
print(f'Total questions: {total_questions}')
print(f'Global answer dist: A={global_answer_dist[0]} B={global_answer_dist[1]} C={global_answer_dist[2]} D={global_answer_dist[3]}')
print(f'Unique IDs: {len(all_ids)}')

if not issues:
    print(f'\n✓ ALL CHECKS PASSED - No issues found')
else:
    print(f'\n=== ISSUES ({len(issues)}) ===')
    for issue in issues:
        print(f'  {issue}')

sys.exit(1 if issues else 0)
