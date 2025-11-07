# backend/app/utils/jac_wrapper.py
"""
Robust loader for jaclang across different jaclang versions.
Provides get_jac_import() which returns the jac_import callable or None.
"""

import importlib
from typing import Optional, Callable

def get_jac_import() -> Optional[Callable]:
    """
    Attempts to import jac_import from jaclang in multiple forms.
    Returns the callable, or None if not available.
    """
    names_to_try = [
        ("jaclang", "jac_import"),         # jaclang >=1.0?
        ("jaclang.core", "jac_import"),    # older structure
    ]
    for module_name, attr in names_to_try:
        try:
            module = importlib.import_module(module_name)
            if hasattr(module, attr):
                return getattr(module, attr)
        except Exception:
            # ignore and try next
            continue
    return None
