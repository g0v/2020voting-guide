import json
from typing import List, Dict, Optional


def transform(sitting_info: List[str]) -> str:
    sittings: Dict[str, Dict[str, List[Dict[str, Optional[str]]]]] = {}
    sitting_pages = [json.loads(page)['jsonList'] for page in sitting_info]

    for partial_sittings in sitting_pages:
        for sitting in partial_sittings:
            term = sitting['term'] + '屆'
            meeting_unit = sitting['meetingUnit']
            if term not in sittings:
                sittings[term] = {}
            if meeting_unit not in sittings[term]:
                sittings[term][meeting_unit] = []
            sittings[term][meeting_unit].append(sitting)

    return json.dumps(sittings, ensure_ascii=False)
