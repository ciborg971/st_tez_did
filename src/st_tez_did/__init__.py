from pathlib import Path
from typing import Optional

import streamlit as st
import streamlit.components.v1 as components

# Tell streamlit that there is a component called st_tez_did,
# and that the code to display that component is in the "frontend" folder
frontend_dir = (Path(__file__).parent / "frontend").absolute()
_component_func = components.declare_component(
	"st_tez_did", path=str(frontend_dir)
)

# Create the python function that will be called
def st_tez_did(
    dapp_name: str,
    network: Optional[str] = "mainnet",
    key: Optional[str] = None,
):
    """
    Add a descriptive docstring
    """
    component_value = _component_func(
        dapp_name=dapp_name,
        network=network,
        key=key,
    )

    return component_value


def main():
    st.write("## Connect to your Temple wallet and display some information")
    value = st_tez_did('MyAwesomeDapp', 'mainnet')
    st.write(value)


if __name__ == "__main__":
    main()
